<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("user_role.title") }}</p>
         </template>
         <template #right-content>
            <a class="q-mr-sm text-white cursor-pointer" @click="onUserRoleAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("user_role.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="User Roles List"
               :rows="userRole"
               :columns="userRoleColumns"
               :no-data-label="t('user_role.table.content.details.empty')"
               :no-results-label="t('user_role.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="id"
               :visible-columns="userRoleVisibleColumns"
               :pagination="userRolePagination"
               :filter="userRoleFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">User Roles List</h6>
                  <q-input v-model="userRoleFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-select
                     v-model="userRoleVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="userRoleColumns"
                     option-value="name"
                     options-cover
                     style="min-width: 150px"
                  >
                  </q-select>
               </template>

               <template #body-cell-actions="props">
                  <q-td :props="props">
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="See"
                        @click="onUserRoleSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onUserRoleUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onUserRoleDeleteWindowClick(props.row)"
                     >
                     </q-btn>
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
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins/general";
import { format_branch, format_pos, format_user } from "@/plugins/mixins/format";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { UserRolesResponse, WindowResponse, UserRole } from "@/types/user-role";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "user-role-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const userRole = ref<UserRole[]>([]);
      const userRoleVisibleColumns = ref<Array<string>>([ "id", "created", "updated", "name", "actions" ]);
      const userRoleFilter = ref("");
      const userRolePagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
      });
      const userRoleColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("user_role.table.field.id"),
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
            label: t("user_role.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("user_role.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "name",
            label: t("user_role.table.field.name"),
            align: "center",
            field: "name",
            sortable: true
         },
         {
            name: "actions",
            label: t("user_role.table.field.actions"),
            align: "center",
            sortable: true
         }
      ];
      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getSessionUserId = computed(() => {
         return store.getters["getSessionUserId"];
      });
      const getUserRoleLoadedReply = computed(() => {
         return store.getters["getUserRoleLoadedReply"];
      });

      onMounted(() => {
         create_activity_log({
            name: "The user has access to user role report",
            extra_data: "",
            id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
            id_access: ACTIVITY_LOG_OPERATION.USER_ROLE_REPORT,
            id_user: getSessionUserId.value,
            server: getServer.value,
            access_token: getAuthToken.value.access_token
         });
         onRefreshData();
         if(!getUserRoleLoadedReply.value) {
            window.api.receive("main-window-user-role-module-reply", (data:WindowResponse) => {
               if(data.result === "success") {
                  if(data.type === "add") {
                     if(data.data)
                        userRole.value.push(data.data);
                  } else if(data.type === "update") {
                     let finded_index = -1;
                     for(let i = 0; i < userRole.value.length; i++) {
                        const curr_user_role = userRole.value[i];
                        if(curr_user_role.id == data.id) {
                           finded_index = i;
                           break;
                        }
                     }
                     if(finded_index >= 0) {
                        if(data.data) {
                           userRole.value[finded_index].id = data.data.id;
                           userRole.value[finded_index].is_active = data.data.is_active;
                           userRole.value[finded_index].created = data.data.created;
                           userRole.value[finded_index].updated = data.data.updated;
                           userRole.value[finded_index].name = data.data.name;
                           userRole.value[finded_index].atributes_1 = data.data.atributes_1;
                           userRole.value[finded_index].atributes_2 = data.data.atributes_2;
                           userRole.value[finded_index].atributes_3 = data.data.atributes_3;
                           userRole.value[finded_index].atributes_4 = data.data.atributes_4;
                           userRole.value[finded_index].id_user = data.data.id_user;
                           userRole.value[finded_index].id_pos = data.data.id_pos;
                           userRole.value[finded_index].id_branch = data.data.id_branch;
                           userRole.value[finded_index].user = data.data.user;
                           userRole.value[finded_index].pos = data.data.pos;
                           userRole.value[finded_index].branch = data.data.branch;
                        }
                     }
                  } else if(data.type === "delete") {
                     let finded_index = -1;
                     for(let i = 0; i < userRole.value.length; i++) {
                        const curr_user_role = userRole.value[i];
                        if(curr_user_role.id == data.id) {
                           finded_index = i;
                           break;
                        }
                     }
                     if(finded_index >= 0)
                        userRole.value.splice(finded_index, 1);
                  }
               }
            });
            store.commit("SET_USER_ROLE_LOADED_REPLY", true);
         }
      });

      const onRefreshData = () => {
         userRole.value = [];

         axios.get<UserRolesResponse>(`${ getServer.value }/user_role/v3/select-all.php`,
            {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_categories:Array<UserRole> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_categories.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        name: data[i].name,
                        atributes_1: Number(data[i].atributes_1),
                        atributes_2: Number(data[i].atributes_2),
                        atributes_3: Number(data[i].atributes_3),
                        atributes_4: Number(data[i].atributes_4),
                        id_user: Number(data[i].id_branch),
                        id_pos: Number(data[i].id_branch),
                        id_branch: Number(data[i].id_branch),
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch,
                     });
                  }
                  userRole.value = formatted_categories;
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
      const onUserRoleAddWindowClick = () => {
         window.api.send("user-role-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("user_role.window.add.title"),
               description: t("user_role.window.add.subtitle")
            },
            data: null
         });
      };
      const onUserRoleSeeWindowClick = (item:UserRole) => {
         window.api.send("user-role-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               atributes_1: item.atributes_1,
               atributes_2: item.atributes_2,
               atributes_3: item.atributes_3,
               atributes_4: item.atributes_4,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      const onUserRoleUpdateWindowClick = (item:UserRole) => {
         window.api.send("user-role-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("user_role.window.update.title"),
               description: t("user_role.window.update.subtitle")
            },
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               atributes_1: item.atributes_1,
               atributes_2: item.atributes_2,
               atributes_3: item.atributes_3,
               atributes_4: item.atributes_4,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      const onUserRoleDeleteWindowClick = (item:UserRole) => {
         window.api.send("user-role-module-window", {
            id: item.id,
            type: "delete",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               atributes_1: item.atributes_1,
               atributes_2: item.atributes_2,
               atributes_3: item.atributes_3,
               atributes_4: item.atributes_4,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };

      return {
         t,
         userRole,
         userRoleVisibleColumns,
         userRoleColumns,
         userRoleFilter,
         userRolePagination,
         onRefreshData,
         onUserRoleAddWindowClick,
         onUserRoleSeeWindowClick,
         onUserRoleUpdateWindowClick,
         onUserRoleDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
