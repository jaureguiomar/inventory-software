<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("supplier.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ t("supplier.window.see.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="supplier.id > 0"
                        v-model="supplier.id"
                        :label="t('supplier.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="supplier.created"
                        :label="t('supplier.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="supplier.updated"
                        :label="t('supplier.window.field.updated') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="supplier.name"
                        :label="t('supplier.window.field.name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="supplier.branch.name"
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
                     :label="t('supplier.window.button.close')"
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
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
import { key } from "@/plugins/store";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { Supplier, IPCParams } from "@/types/supplier";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "supplier-see-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const store = useStore(key);
      const { t } = useI18n();
      const supplier = reactive<Supplier>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         id_user: -1,
         id_pos: -1,
         id_branch: -1,
         user: {
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
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            role: null,
            user: null,
            pos: null,
            branch: null
         },
         pos: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            machine_id: "",
            mac_address: "",
            id_branch: -1,
            branch: null
         },
         branch: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            telephone: "",
            address: ""
         }
      });
      const loaded = ref(false);
      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getSessionUserId = computed(() => {
         return store.getters["getSessionUserId"];
      });

      window.api.receive("supplier-module-window-reply", (data:IPCParams) => {
         supplier.id = data.id;
         if(data.data) {
            supplier.id = data.data.id;
            supplier.is_active = data.data.is_active;
            supplier.created = getFormattedDateString(data.data.created);
            supplier.updated = getFormattedDateString(data.data.updated);
            supplier.name = data.data.name;
            supplier.id_user = data.data.id_user;
            supplier.id_pos = data.data.id_pos;
            supplier.id_branch = data.data.id_branch;
            supplier.user = data.data.user;
            supplier.pos = data.data.pos;
            supplier.branch = data.data.branch;

            create_activity_log({
               name: "The user has access to supplier see report",
               extra_data: JSON.stringify(supplier),
               id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
               id_access: ACTIVITY_LOG_OPERATION.SUPPLIER_REPORT_SEE,
               id_user: getSessionUserId.value,
               server: getServer.value,
               access_token: getAuthToken.value.access_token
            });
         }
         loaded.value = true;
      });

      const onClose = () => {
         window.api.send("supplier-module-window-close", {
            id: supplier.id,
            data: null,
            result: "closed",
            type: "see"
         });
      }

      return {
         t,
         supplier,
         loaded,
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
