<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("client.title") }}</p>
         </template>
         <template #right-content>
            <a v-if="permissionClientSee" class="q-mr-sm text-white cursor-pointer" @click="onClientAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("client.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="Client List"
               :rows="client"
               :columns="clientColumns"
               :no-data-label="t('client.table.content.details.empty')"
               :no-results-label="t('client.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="id"
               :visible-columns="clientVisibleColumns"
               :pagination="clientPagination"
               :filter="clientFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">Client List</h6>
                  <q-input v-model="clientFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-select
                     v-model="clientVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="clientColumns"
                     option-value="name"
                     options-cover
                     style="min-width: 150px"
                  >
                  </q-select>
               </template>

               <template #body-cell-actions="props">
                  <q-td :props="props">
                     <q-btn
                        v-if="permissionClientAdd"
                        class="q-mr-sm"
                        color="primary"
                        label="See"
                        @click="onClientSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        v-if="permissionClientUpdate"
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onClientUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        v-if="permissionClientDelete"
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onClientDeleteWindowClick(props.row)"
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
import { format_user, format_pos, format_branch } from "@/plugins/mixins/format";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { validate_permission, get_permission_by_id } from "@/plugins/mixins/permission";
import { ClientsResponse, WindowResponse, Client } from "@/types/client";
import { Branch } from "@/types/branch";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "client-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const client = ref<Client[]>([]);
      const clientVisibleColumns = ref<Array<string>>([
         "id", "created", "updated", "first_name", "last_name",
         "address", "cellphone", "cellphone2", "email", "actions"
      ]);
      const clientFilter = ref("");
      const clientPagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
         // rowsNumber: xx if getting data from a server
      });
      const clientColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("client.table.field.id"),
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
            label: t("client.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("client.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "first_name",
            label: t("client.table.field.first_name"),
            align: "center",
            field: "first_name",
            sortable: true
         },
         {
            name: "last_name",
            label: t("client.table.field.last_name"),
            align: "center",
            field: "last_name",
            sortable: true
         },
         {
            name: "address",
            label: t("client.table.field.address"),
            align: "center",
            field: "address",
            sortable: true
         },
         {
            name: "cellphone",
            label: t("client.table.field.cellphone"),
            align: "center",
            field: "cellphone",
            sortable: true
         },
         {
            name: "cellphone2",
            label: t("client.table.field.cellphone2"),
            align: "center",
            field: "cellphone2",
            sortable: true,
            format: (cellphone2:String) => {
               return (cellphone2) ? cellphone2 : "N/A";
            }
         },
         {
            name: "email",
            label: t("client.table.field.email"),
            align: "center",
            field: "email",
            sortable: true
         },
         {
            name: "actions",
            label: t("client.table.field.actions"),
            align: "center",
            sortable: true
         }
      ];
      const permissionClientSee = ref(false);
      const permissionClientAdd = ref(false);
      const permissionClientUpdate = ref(false);
      const permissionClientDelete = ref(false);
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
      const getClientLoadedReply = computed(() => {
         return store.getters["getClientLoadedReply"];
      });

      onMounted(() => {
         const permission1 = get_permission_by_id(11, getSessionPermission.value);
         const permission2 = get_permission_by_id(12, getSessionPermission.value);
         const permission3 = get_permission_by_id(13, getSessionPermission.value);
         const permission4 = get_permission_by_id(14, getSessionPermission.value);
         permissionClientSee.value = validate_permission(getSessionUserRole.value.atributes_1, permission1.attr_value);
         permissionClientAdd.value = validate_permission(getSessionUserRole.value.atributes_1, permission2.attr_value);
         permissionClientUpdate.value = validate_permission(getSessionUserRole.value.atributes_1, permission3.attr_value);
         permissionClientDelete.value = validate_permission(getSessionUserRole.value.atributes_1, permission4.attr_value);

         create_activity_log({
            name: "The user has access to category report",
            extra_data: "",
            id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
            id_access: ACTIVITY_LOG_OPERATION.CLIENT_REPORT,
            id_user: getSessionUserId.value,
            server: getServer.value,
            access_token: getAuthToken.value.access_token
         });
         onRefreshData();
         if(!getClientLoadedReply.value) {
            window.api.receive("main-window-client-module-reply", (data:WindowResponse) => {
               if(data.result === "success") {
                  if(data.type === "add") {
                     if(data.data)
                        client.value.push(data.data);
                  } else if(data.type === "update") {
                     let finded_index = -1;
                     for(let i = 0; i < client.value.length; i++) {
                        const curr_client = client.value[i];
                        if(curr_client.id == data.id) {
                           finded_index = i;
                           break;
                        }
                     }
                     if(finded_index >= 0) {
                        if(data.data) {
                           client.value[finded_index].id = data.data.id;
                           client.value[finded_index].is_active = data.data.is_active;
                           client.value[finded_index].created = data.data.created;
                           client.value[finded_index].updated = data.data.updated;
                           client.value[finded_index].first_name = data.data.first_name;
                           client.value[finded_index].last_name = data.data.last_name;
                           client.value[finded_index].address = data.data.address;
                           client.value[finded_index].cellphone = data.data.cellphone;
                           client.value[finded_index].cellphone2 = data.data.cellphone2;
                           client.value[finded_index].email = data.data.email;
                           client.value[finded_index].id_user = data.data.id_user;
                           client.value[finded_index].id_pos = data.data.id_pos;
                           client.value[finded_index].id_branch = data.data.id_branch;
                           client.value[finded_index].user = data.data.user;
                           client.value[finded_index].pos = data.data.pos;
                           client.value[finded_index].branch = data.data.branch;
                        }
                     }
                  } else if(data.type === "delete") {
                     let finded_index = -1;
                     for(let i = 0; i < client.value.length; i++) {
                        const curr_client = client.value[i];
                        if(curr_client.id == data.id) {
                           finded_index = i;
                           break;
                        }
                     }
                     if(finded_index >= 0)
                        client.value.splice(finded_index, 1);
                  }
               }
            });
            store.commit("SET_CLIENT_LOADED_REPLY", true);
         }
      });

      const onRefreshData = () => {
         client.value = [];

         axios.get<ClientsResponse>(`${ getServer.value }/client`,
            {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_clients:Array<Client> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_clients.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        first_name: data[i].first_name,
                        last_name: data[i].last_name,
                        address: data[i].address,
                        cellphone: data[i].cellphone,
                        cellphone2: data[i].cellphone2,
                        email: data[i].email,
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
                  }
                  client.value = formatted_clients;
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
      const onClientAddWindowClick = () => {
         window.api.send("client-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("client.window.add.title"),
               description: t("client.window.add.subtitle")
            },
            data: null
         });
      };
      const onClientSeeWindowClick = (item:Client) => {
         window.api.send("client-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               first_name: item.first_name,
               last_name: item.last_name,
               address: item.address,
               cellphone: item.cellphone,
               cellphone2: item.cellphone2,
               email: item.email,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      const onClientUpdateWindowClick = (item:Client) => {
         window.api.send("client-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("client.window.update.title"),
               description: t("client.window.update.subtitle")
            },
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               first_name: item.first_name,
               last_name: item.last_name,
               address: item.address,
               cellphone: item.cellphone,
               cellphone2: item.cellphone2,
               email: item.email,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      const onClientDeleteWindowClick = (item:Client) => {
         window.api.send("client-module-window", {
            id: item.id,
            type: "delete",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               first_name: item.first_name,
               last_name: item.last_name,
               address: item.address,
               cellphone: item.cellphone,
               cellphone2: item.cellphone2,
               email: item.email,
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
         client,
         clientVisibleColumns,
         clientColumns,
         clientFilter,
         clientPagination,
         permissionClientSee,
         permissionClientAdd,
         permissionClientUpdate,
         permissionClientDelete,
         onRefreshData,
         onClientAddWindowClick,
         onClientSeeWindowClick,
         onClientUpdateWindowClick,
         onClientDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
