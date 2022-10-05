<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("user.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ t("user.window.see.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="user.id > 0"
                        v-model="user.id"
                        :label="t('user.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="user.created"
                        :label="t('user.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="user.updated"
                        :label="t('user.window.field.updated') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="user.username"
                        :label="t('user.window.field.username') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="user.email"
                        :label="t('user.window.field.email') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="user.password"
                        :label="t('user.window.field.password') + ':'"
                        type="password"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="user.first_name"
                        :label="t('user.window.field.first_name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="user.last_name"
                        :label="t('user.window.field.last_name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="user.role.name"
                        :label="t('user.window.field.role_name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="user.branch.name"
                        label="Created in:"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     color="primary"
                     :label="t('user.window.button.close')"
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
import { User, IPCParams } from "@/interfaces/user/user";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "user-see-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const user = reactive<User>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         username: "",
         email: "",
         password: "",
         first_name: "",
         last_name: "",
         id_role: -1,
         id_branch: -1,
         role: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            id_branch: -1,
            branch: {
               id: -1,
               is_active: -1,
               created: "",
               updated: "",
               name: "",
               telephone: "",
               address: "",
               machine_id: "",
               mac_address: ""
            }
         },
         branch: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            telephone: "",
            address: "",
            machine_id: "",
            mac_address: ""
         }
      });
      const loaded = ref(false);

      window.api.receive("user-module-window-reply", (data:IPCParams) => {
         console.log("data", data);
         user.id = data.id;
         if(data.data) {
            user.id = data.data.id;
            user.is_active = data.data.is_active;
            user.created = getFormattedDateString(data.data.created);
            user.updated = getFormattedDateString(data.data.updated);
            user.username = data.data.username;
            user.email = data.data.email;
            user.password = data.data.password;
            user.first_name = data.data.first_name;
            user.last_name = data.data.last_name;
            user.id_role = data.data.id_role;
            user.id_branch = data.data.id_branch;
            user.role = data.data.role;
            user.branch = data.data.branch;
         }
         loaded.value = true;
      });

      const onClose = () => {
         window.api.send("user-module-window-close", {
            id: user.id,
            data: null,
            result: "closed",
            type: "see"
         });
      }

      return {
         t,
         user,
         loaded,
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
