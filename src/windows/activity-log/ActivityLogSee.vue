<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("activity_log.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ t("activity_log.window.see.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="activityLog.id > 0"
                        v-model="activityLog.id"
                        :label="t('activity_log.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="activityLog.created"
                        :label="t('activity_log.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="activityLog.updated"
                        :label="t('activity_log.window.field.updated') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="activityLog.name"
                        :label="t('activity_log.window.field.name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     color="primary"
                     :label="t('activity_log.window.button.close')"
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
import { ActivityLog, IPCParams } from "@/types/activity-log";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "activity-log-see-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const activityLog = reactive<ActivityLog>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         extra_data: "",
         id_operation: -1,
         id_access: -1,
         id_user: -1,
         operation: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: ""
         },
         access: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: ""
         },
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
         }
      });
      const loaded = ref(false);

      window.api.receive("activity-log-module-window-reply", (data:IPCParams) => {
         activityLog.id = data.id;
         if(data.data) {
            activityLog.id = data.data.id;
            activityLog.is_active = data.data.is_active;
            activityLog.created = getFormattedDateString(data.data.created);
            activityLog.updated = getFormattedDateString(data.data.updated);
            activityLog.name = data.data.name;
            activityLog.extra_data = data.data.extra_data;
            activityLog.id_operation = data.data.id_operation;
            activityLog.id_access = data.data.id_access;
            activityLog.id_user = data.data.id_user;
            activityLog.operation = data.data.operation;
            activityLog.access = data.data.access;
            activityLog.user = data.data.user;
         }
         loaded.value = true;
      });

      const onClose = () => {
         window.api.send("activity-log-module-window-close", {
            id: activityLog.id,
            data: null,
            result: "closed",
            type: "see"
         });
      }

      return {
         t,
         activityLog,
         loaded,
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
