<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("activity_log.title") }}</p>
         </template>
         <template #right-content>
            <a class="q-mr-sm text-white cursor-pointer" @click="onActivityLogAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("activity_log.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="Activity Log List"
               :rows="activityLog"
               :columns="activityLogColumns"
               :no-data-label="t('activity_log.table.content.details.empty')"
               :no-results-label="t('activity_log.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="id"
               :visible-columns="activityLogVisibleColumns"
               :pagination="activityLogPagination"
               :filter="activityLogFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">Activity Log List</h6>
                  <q-input v-model="activityLogFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-select
                     v-model="activityLogVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="activityLogColumns"
                     option-value="name"
                     options-cover
                     style="min-width: 150px"
                  >
                  </q-select>
               </template>

               <template #body-cell-actions="props">
                  <q-td :props="props">
                     <q-btn
                        v-if="permissionActivityLogSee"
                        class="q-mr-sm"
                        color="primary"
                        label="See"
                        @click="onActivityLogSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <!-- <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onActivityLogUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onActivityLogDeleteWindowClick(props.row)"
                     >
                     </q-btn> -->
                  </q-td>
               </template>

               <template #no-data="{ icon, message }">
                  <div class="full-width row flex-center q-gutter-sm">
                     <span>
                        {{ message }}
                     </span>
                     <q-icon size="2em" :name="icon"></q-icon>
                  </div>
               </template>
            </q-table>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted } from "vue"
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { format_activity_log } from "@/plugins/mixins/format";
import { fd_data_activity_log } from "@/plugins/mixins/format-display-data";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins/general";
import { validate_permission, get_permission_by_id } from "@/plugins/mixins/permission";
import { ActivityLogsResponse, WindowResponse, ActivityLog } from "@/types/activity-log";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "activity-log-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const activityLog = ref<ActivityLog[]>([]);
      const activityLogVisibleColumns = ref<Array<string>>([ "id", "created", "updated", "name", "actions" ]);
      const activityLogFilter = ref("");
      const activityLogPagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
      });
      const activityLogColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("activity_log.table.field.id"),
            align: "center",
            field: "id",
            sortable: true,
            sort: (id:string) => {
               return parseInt(id);
            },
            format: (id:string) => {
               return "#" + id;
            }
         },
         {
            name: "created",
            label: t("activity_log.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("activity_log.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "name",
            label: t("activity_log.table.field.name"),
            align: "center",
            field: "name",
            sortable: true
         },
         {
            name: "actions",
            label: t("activity_log.table.field.actions"),
            align: "center",
            sortable: true
         }
      ];
      const permissionActivityLogSee = ref(false);
      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getSessionUserId = computed(() => {
         return store.getters["getSessionUserId"];
      });
      const getSessionUserRole = computed(() => {
         return store.getters["getSessionUserRole"];
      });
      const getSessionPermission = computed(() => {
         return store.getters["getSessionPermission"];
      });
      const getActivityLogLoadedReply = computed(() => {
         return store.getters["getActivityLogLoadedReply"];
      });

      onMounted(() => {
         const permission1 = get_permission_by_id(42, getSessionPermission.value);
         permissionActivityLogSee.value = validate_permission(getSessionUserRole.value.atributes_1, permission1.attr_value);

         create_activity_log({
            name: "The user has access to cash cutoff report",
            extra_data: "",
            id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
            id_access: ACTIVITY_LOG_OPERATION.CASH_CUTOFF,
            id_user: getSessionUserId.value,
            server: getServer.value,
            access_token: getAuthToken.value.access_token
         });
         onRefreshData();
         if(!getActivityLogLoadedReply.value) {
            window.api.receive("main-window-activity-log-module-reply", (data:WindowResponse) => {
               if(data.result === "success") {
                  if(data.type === "add") {
                     if(data.data)
                        activityLog.value.push(data.data);
                  } else if(data.type === "update") {
                     let finded_index = -1;
                     for(let i = 0; i < activityLog.value.length; i++) {
                        const curr_activity_log = activityLog.value[i];
                        if(curr_activity_log.id == data.id) {
                           finded_index = i;
                           break;
                        }
                     }
                     if(finded_index >= 0) {
                        if(data.data) {
                           activityLog.value[finded_index].id = data.data.id;
                           activityLog.value[finded_index].is_active = data.data.is_active;
                           activityLog.value[finded_index].created = data.data.created;
                           activityLog.value[finded_index].updated = data.data.updated;
                           activityLog.value[finded_index].name = data.data.name;
                           activityLog.value[finded_index].extra_data = data.data.extra_data;
                           activityLog.value[finded_index].id_operation = data.data.id_operation;
                           activityLog.value[finded_index].id_access = data.data.id_access;
                           activityLog.value[finded_index].id_user = data.data.id_user;
                           activityLog.value[finded_index].operation = data.data.operation;
                           activityLog.value[finded_index].access = data.data.access;
                           activityLog.value[finded_index].user = data.data.user;
                        }
                     }
                  } else if(data.type === "delete") {
                     let finded_index = -1;
                     for(let i = 0; i < activityLog.value.length; i++) {
                        const curr_activity_log = activityLog.value[i];
                        if(curr_activity_log.id == data.id) {
                           finded_index = i;
                           break;
                        }
                     }
                     if(finded_index >= 0)
                        activityLog.value.splice(finded_index, 1);
                  }
               }
            });
            store.commit("SET_ACTIVITY_LOG_LOADED_REPLY", true);
         }
      });

      const onRefreshData = () => {
         activityLog.value = [];
         axios.get<ActivityLogsResponse>(`${ getServer.value }/activity-log`,
            {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<ActivityLog> = [];
                  for(let i = 0; i < data.length; i++) {
                     const activity_log = format_activity_log(data[i], fd_data_activity_log);
                     if(activity_log)
                        formatted_data.push(activity_log);
                  }
                  activityLog.value = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         }).catch(() => {
            Swal.fire({
               title: "Error",
               text: t("global.default_error"),
               icon: "error"
            });
         });
      };
      const onActivityLogAddWindowClick = () => {
         window.api.send("activity-log-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("activity_log.window.add.title"),
               description: t("activity_log.window.add.subtitle")
            },
            data: null
         });
      };
      const onActivityLogSeeWindowClick = (item:ActivityLog) => {
         window.api.send("activity-log-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               extra_data: item.extra_data,
               id_operation: item.id_operation,
               id_access: item.id_access,
               id_user: item.id_user,
               operation: { ...item.operation },
               access: { ...item.access },
               user: { ...item.user }
            }
         });
      };
      // const onActivityLogUpdateWindowClick = (item:ActivityLog) => {
      //    window.api.send("activity-log-module-window", {
      //       id: item.id,
      //       type: "update",
      //       content: {
      //          title: t("activity_log.window.update.title"),
      //          description: t("activity_log.window.update.subtitle")
      //       },
      //       data: {
      //          id: item.id,
      //          is_active: item.is_active,
      //          created: item.created,
      //          updated: item.updated,
      //          name: item.name,
      //          extra_data: item.extra_data,
      //          id_operation: item.id_operation,
      //          id_access: item.id_access,
      //          id_user: item.id_user,
      //          operation: { ...item.operation },
      //          access: { ...item.access },
      //          user: { ...item.user }
      //       }
      //    });
      // };
      // const onActivityLogDeleteWindowClick = (item:ActivityLog) => {
      //    window.api.send("activity-log-module-window", {
      //       id: item.id,
      //       type: "delete",
      //       data: {
      //          id: item.id,
      //          is_active: item.is_active,
      //          created: item.created,
      //          updated: item.updated,
      //          name: item.name,
      //          extra_data: item.extra_data,
      //          id_operation: item.id_operation,
      //          id_access: item.id_access,
      //          id_user: item.id_user,
      //          operation: { ...item.operation },
      //          access: { ...item.access },
      //          user: { ...item.user }
      //       }
      //    });
      // };

      return {
         t,
         activityLog,
         activityLogVisibleColumns,
         activityLogColumns,
         activityLogFilter,
         activityLogPagination,
         permissionActivityLogSee,
         onRefreshData,
         onActivityLogAddWindowClick,
         onActivityLogSeeWindowClick,
         // onActivityLogUpdateWindowClick,
         // onActivityLogDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
