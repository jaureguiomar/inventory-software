<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("cash_cutoff.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ t("cash_cutoff.window.see.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="cashCutoff.id > 0"
                        v-model="cashCutoff.id"
                        :label="t('cash_cutoff.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.created"
                        :label="t('cash_cutoff.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.updated"
                        :label="t('cash_cutoff.window.field.updated') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.amount_open"
                        :label="t('cash_cutoff.window.field.amount_open') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.amount_sale"
                        :label="t('cash_cutoff.window.field.amount_sale') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.amount_supplier"
                        :label="t('cash_cutoff.window.field.amount_supplier') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.amount_close"
                        :label="t('cash_cutoff.window.field.amount_close') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.date_close"
                        :label="t('cash_cutoff.window.field.date_close') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="idTypeParsed"
                        :label="t('cash_cutoff.window.field.id_type') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.user_open.username"
                        :label="t('cash_cutoff.window.field.user_open.username') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.user_close.username"
                        :label="t('cash_cutoff.window.field.user_close.username') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="cashCutoff.branch.name"
                        :label="t('cash_cutoff.window.field.branch.name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     color="primary"
                     :label="t('cash_cutoff.window.button.close')"
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
import { key } from "@/plugins/store";
import { useI18n } from "vue-i18n/index";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { CashCutoff, IPCParams } from "@/types/cash-cutoff";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "cash-cutoff-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const store = useStore(key);
      const { t } = useI18n();
      const cashCutoff = reactive<CashCutoff>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         amount_open: "",
         amount_sale: "",
         amount_supplier: "",
         amount_close: "",
         date_close: "",
         id_type: -1,
         id_user_open: -1,
         id_user_close: -1,
         id_pos: -1,
         id_branch: -1,
         user_open: {
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
         user_close: {
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
      const idTypeParsed = ref<string>("");
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

      window.api.receive("cash-cutoff-module-window-reply", (data:IPCParams) => {
         cashCutoff.id = data.id;
         if(data.data) {
            cashCutoff.id = data.data.id;
            cashCutoff.is_active = data.data.is_active;
            cashCutoff.created = getFormattedDateString(data.data.created);
            cashCutoff.updated = getFormattedDateString(data.data.updated);
            cashCutoff.amount_open = "$" + data.data.amount_open;
            cashCutoff.amount_sale = "$" + data.data.amount_sale;
            cashCutoff.amount_supplier = "$" + data.data.amount_supplier;
            cashCutoff.amount_close = "$" + data.data.amount_close;
            cashCutoff.date_close = getFormattedDateString(data.data.date_close, 0, 0, true);
            cashCutoff.id_type = data.data.id_type;
            cashCutoff.id_user_open = data.data.id_user_open;
            cashCutoff.id_user_close = data.data.id_user_close;
            cashCutoff.id_pos = data.data.id_pos;
            cashCutoff.id_branch = data.data.id_branch;
            cashCutoff.user_open = data.data.user_open;
            cashCutoff.user_close = data.data.user_close;
            cashCutoff.pos = data.data.pos;
            cashCutoff.branch = data.data.branch;

            idTypeParsed.value = (data.data.id_type === 1) ? "Opened" : "Closed";

            create_activity_log({
               name: "The user has access to cash cutoff see report",
               extra_data: JSON.stringify(cashCutoff),
               id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
               id_access: ACTIVITY_LOG_OPERATION.CASH_CUTOFF_REPORT_SEE,
               id_user: getSessionUserId.value,
               server: getServer.value,
               access_token: getAuthToken.value.access_token
            });
         }
         loaded.value = true;
      });

      const onClose = () => {
         window.api.send("cash-cutoff-module-window-close", {
            id: cashCutoff.id,
            data: null,
            result: "closed",
            type: "see"
         });
      }

      return {
         t,
         cashCutoff,
         idTypeParsed,
         loaded,
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
