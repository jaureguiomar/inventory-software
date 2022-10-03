<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("user.title") }}</p>
         </template>
         <template #right-content>
            <a class="q-mr-sm text-white cursor-pointer" @click="onUserAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("user.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="User List"
               :rows="user"
               :columns="userColumns"
               :no-data-label="t('user.table.content.details.empty')"
               :no-results-label="t('user.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="id"
               :visible-columns="userVisibleColumns"
               :pagination="userPagination"
               :filter="userFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">User List</h6>
                  <q-input v-model="userFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-select
                     v-model="userVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="userColumns"
                     option-value="name"
                     options-cover
                     style="min-width: 150px"
                  >
                  </q-select>
               </template>

               <template #body-cell-username="props">
                  <q-td :props="props">
                     <div>
                        {{ props.row.username }}
                        <q-badge outline align="middle" color="primary">
                           {{ props.row.role.name }}
                        </q-badge>
                     </div>
                  </q-td>
               </template>

               <template #body-cell-actions="props">
                  <q-td :props="props">
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="See"
                        @click="onUserSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onUserUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onUserDeleteWindowClick(props.row)"
                     >
                     </q-btn>
                  </q-td>
               </template>

               <template #no-data="{ icon, message, filter }">
                  <div class="full-width row flex-center q-gutter-sm">
                     <span>
                        {{ message }}
                     </span>
                     <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon"></q-icon>
                  </div>
               </template>
            </q-table>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue"
import { UsersResponse, WindowResponse, User } from "@/interfaces/user/user";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "user-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const user = ref<User[]>([]);
      const userVisibleColumns = ref<Array<string>>([
         "id", "created", "updated", "username", "email", // "password"
         "first_name", "last_name", "actions"
      ]);
      const userFilter = ref("");
      const userPagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
      });
      const userColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("user.table.field.id"),
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
            label: t("user.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("user.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "username",
            label: t("user.table.field.username"),
            align: "center",
            field: "username",
            sortable: true
         },
         {
            name: "email",
            label: t("user.table.field.email"),
            align: "center",
            field: "email",
            sortable: true
         },
         // {
         //    name: "password",
         //    label: t("user.table.field.password"),
         //    align: "center",
         //    field: "password",
         //    sortable: true
         // },
         {
            name: "first_name",
            label: t("user.table.field.first_name"),
            align: "center",
            field: "first_name",
            sortable: true
         },
         {
            name: "last_name",
            label: t("user.table.field.last_name"),
            align: "center",
            field: "last_name",
            sortable: true
         },
         {
            name: "actions",
            label: t("user.table.field.actions"),
            align: "center",
            sortable: true
         }
      ];

      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
      });
      const getUserLoadedReply = computed(() => {
         return store.getters["getUserLoadedReply"];
      });

      const onRefreshData = () => {
         user.value = [];

         axios.get<UsersResponse>("user/v3/find.php", {
            params: {
               type: "id_branch",
               query: getBranchId.value
            }
         }).then((response) => {
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_users:Array<User> = [];
                  for(let i = 0; i < data.length; i++) {
                     formatted_users.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        username: data[i].username,
                        email: data[i].email,
                        password: data[i].password,
                        first_name: data[i].first_name,
                        last_name: data[i].last_name,
                        id_role: data[i].id_role,
                        role: {
                           id: Number(data[i].role.id),
                           is_active: Number(data[i].role.is_active),
                           created: data[i].role.created,
                           updated: data[i].role.updated,
                           name: data[i].role.name
                        }
                     });
                  }
                  user.value = formatted_users;
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
         });
      };
      const onUserAddWindowClick = () => {
         window.api.send("user-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("user.window.add.title"),
               description: t("user.window.add.subtitle")
            },
            data: null
         });
      };
      const onUserSeeWindowClick = (item:User) => {
         window.api.send("user-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               username: item.username,
               email: item.email,
               password: item.password,
               first_name: item.first_name,
               last_name: item.last_name,
               id_role: item.id_role,
               role: { ...item.role }
            }
         });
      };
      const onUserUpdateWindowClick = (item:User) => {
         window.api.send("user-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("user.window.update.title"),
               description: t("user.window.update.subtitle")
            },
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               username: item.username,
               email: item.email,
               password: item.password,
               first_name: item.first_name,
               last_name: item.last_name,
               id_role: item.id_role,
               role: { ...item.role }
            }
         });
      };
      const onUserDeleteWindowClick = (item:User) => {
         window.api.send("user-module-window", {
            id: item.id,
            type: "delete",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               username: item.username,
               email: item.email,
               password: item.password,
               first_name: item.first_name,
               last_name: item.last_name,
               id_role: item.id_role,
               role: { ...item.role }
            }
         });
      };

      onRefreshData();
      if(!getUserLoadedReply.value) {
         window.api.receive("main-window-user-module-reply", (data:WindowResponse) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     user.value.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < user.value.length; i++) {
                     const curr_user = user.value[i];
                     if(curr_user.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0) {
                     if(data.data) {
                        user.value[finded_index].id = data.data.id;
                        user.value[finded_index].is_active = data.data.is_active;
                        user.value[finded_index].created = data.data.created;
                        user.value[finded_index].updated = data.data.updated;
                        user.value[finded_index].username = data.data.username;
                        user.value[finded_index].email = data.data.email;
                        user.value[finded_index].password = data.data.password;
                        user.value[finded_index].first_name = data.data.first_name;
                        user.value[finded_index].last_name = data.data.last_name;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < user.value.length; i++) {
                     const curr_user = user.value[i];
                     if(curr_user.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0)
                     user.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_USER_LOADED_REPLY", true);
      }

      return {
         t,
         user,
         userVisibleColumns,
         userColumns,
         userFilter,
         userPagination,
         onRefreshData,
         onUserAddWindowClick,
         onUserSeeWindowClick,
         onUserUpdateWindowClick,
         onUserDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
