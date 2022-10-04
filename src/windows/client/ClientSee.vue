<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("client.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ t("client.window.see.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="client.id > 0"
                        v-model="client.id"
                        :label="t('client.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="client.created"
                        :label="t('client.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="client.updated"
                        :label="t('client.window.field.updated') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="client.first_name"
                        :label="t('client.window.field.first_name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="client.last_name"
                        :label="t('client.window.field.last_name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="client.address"
                        :label="t('client.window.field.address') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="client.cellphone"
                        :label="t('client.window.field.cellphone') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="client.cellphone2"
                        :label="t('client.window.field.cellphone2') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="client.email"
                        :label="t('client.window.field.email') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     color="primary"
                     :label="t('client.window.button.close')"
                     @click="onClose"
                  >
                  </q-btn>
               </div>
            </template>
         </Content>
      </div>
   </transition-group>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n/index";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { Client, IPCParams } from "@/interfaces/client/client";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "client-see-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const client = reactive<Client>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         first_name: "",
         last_name: "",
         address: "",
         cellphone: "",
         cellphone2: "",
         email: ""
      });
      const loaded = ref(false);

      window.api.receive("client-module-window-reply", (data:IPCParams) => {
         client.id = data.id;
         if(data.data) {
            client.id = data.data.id;
            client.is_active = data.data.is_active;
            client.created = getFormattedDateString(data.data.created);
            client.updated = getFormattedDateString(data.data.updated);
            client.first_name = data.data.first_name;
            client.last_name = data.data.last_name;
            client.address = data.data.address;
            client.cellphone = data.data.cellphone;
            client.cellphone2 = (data.data.cellphone2) ? data.data.cellphone2 : "";
            client.email = data.data.email;
         }
         loaded.value = true;
      });

      const onClose = () => {
         window.api.send("client-module-window-close", {
            id: client.id,
            data: null,
            result: "closed",
            type: "see"
         });
      }

      return {
         t,
         client,
         loaded,
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
