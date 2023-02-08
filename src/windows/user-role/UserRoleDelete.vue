<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("user_role.window.delete.title") }}</p>
            </template>
            <template #subtitle>{{ t("user_role.window.delete.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="userRole.id > 0"
                        v-model="userRole.id"
                        :label="t('user_role.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="userRole.created"
                        :label="t('user_role.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="userRole.updated"
                        :label="t('user_role.window.field.updated') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-xl">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="userRole.name"
                        :label="t('user_role.window.field.name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        :model-value="userRole.branch?.name"
                        label="Created in:"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md text-center">
                  <div class="col-12">
                     <h6 class="q-ma-none">Role Permissions</h6>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                     <q-card class="q-ma-md" bordered>
                        <q-card-section>
                           <div class="text-h6">Permissions 1</div>
                        </q-card-section>

                        <q-separator inset></q-separator>

                        <q-card-section>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_1"
                              :label="user_role_permissions_formatted.name.PERMISSION_1"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_1 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_2"
                              :label="user_role_permissions_formatted.name.PERMISSION_2"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_2 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_3"
                              :label="user_role_permissions_formatted.name.PERMISSION_3"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_3 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_4"
                              :label="user_role_permissions_formatted.name.PERMISSION_4"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_4 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_5"
                              :label="user_role_permissions_formatted.name.PERMISSION_5"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_5 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_6"
                              :label="user_role_permissions_formatted.name.PERMISSION_6"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_6 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_7"
                              :label="user_role_permissions_formatted.name.PERMISSION_7"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_7 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_8"
                              :label="user_role_permissions_formatted.name.PERMISSION_8"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_8 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_9"
                              :label="user_role_permissions_formatted.name.PERMISSION_9"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_9 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_10"
                              :label="user_role_permissions_formatted.name.PERMISSION_10"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_10 }}
                              </q-tooltip>
                           </q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                     <q-card class="q-ma-md" bordered>
                        <q-card-section>
                           <div class="text-h6">Permissions 2</div>
                        </q-card-section>

                        <q-separator inset></q-separator>

                        <q-card-section>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_11"
                              :label="user_role_permissions_formatted.name.PERMISSION_11"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_11 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_12"
                              :label="user_role_permissions_formatted.name.PERMISSION_12"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_12 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_13"
                              :label="user_role_permissions_formatted.name.PERMISSION_13"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_13 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_14"
                              :label="user_role_permissions_formatted.name.PERMISSION_14"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_14 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_15"
                              :label="user_role_permissions_formatted.name.PERMISSION_15"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_15 }}
                                 </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_16"
                              :label="user_role_permissions_formatted.name.PERMISSION_16"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_16 }}
                                 </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_17"
                              :label="user_role_permissions_formatted.name.PERMISSION_17"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_17 }}
                                 </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_18"
                              :label="user_role_permissions_formatted.name.PERMISSION_18"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_18 }}
                                 </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_19"
                              :label="user_role_permissions_formatted.name.PERMISSION_19"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_19 }}
                                 </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_20"
                              :label="user_role_permissions_formatted.name.PERMISSION_20"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_20 }}
                                 </q-tooltip>
                           </q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                     <q-card class="q-ma-md" bordered>
                        <q-card-section>
                           <div class="text-h6">Permissions 3</div>
                        </q-card-section>

                        <q-separator inset></q-separator>

                        <q-card-section>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_21"
                              :label="user_role_permissions_formatted.name.PERMISSION_21"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_21 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_22"
                              :label="user_role_permissions_formatted.name.PERMISSION_22"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_22 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_23"
                              :label="user_role_permissions_formatted.name.PERMISSION_23"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_23 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_24"
                              :label="user_role_permissions_formatted.name.PERMISSION_24"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_24 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_25"
                              :label="user_role_permissions_formatted.name.PERMISSION_25"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_25 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_26"
                              :label="user_role_permissions_formatted.name.PERMISSION_26"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_26 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_27"
                              :label="user_role_permissions_formatted.name.PERMISSION_27"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_27 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_28"
                              :label="user_role_permissions_formatted.name.PERMISSION_28"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_28 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_29"
                              :label="user_role_permissions_formatted.name.PERMISSION_29"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_29 }}
                              </q-tooltip>
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_30"
                              :label="user_role_permissions_formatted.name.PERMISSION_30"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_30 }}
                              </q-tooltip>
                           </q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                     <q-card class="q-ma-md" bordered>
                        <q-card-section>
                           <div class="text-h6">Permissions 4</div>
                        </q-card-section>

                        <q-separator inset></q-separator>

                        <q-card-section>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_31"
                              :label="user_role_permissions_formatted.name.PERMISSION_31"
                              disable
                           >
                              <q-tooltip>
                                 {{ user_role_permissions_formatted.description.PERMISSION_31 }}
                              </q-tooltip>
                           </q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     class="q-mr-sm"
                     color="negative"
                     :label="t('user_role.window.delete.button.delete')"
                     @click="onDelete"
                  >
                  </q-btn>
                  <q-btn
                     color="primary"
                     :label="t('user_role.window.button.close')"
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
import { defineComponent, ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { format_user_permissions } from "@/plugins/mixins/permission";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { UserRole, UserRoleResponse, IPCParams } from "@/types/user-role";
import { UserRolePermission, UserRolePermissionsResponse } from "@/types/user-role-permission";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "user-role-delete-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const userRole = reactive<UserRole>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         atributes_1: 0,
         atributes_2: 0,
         atributes_3: 0,
         atributes_4: 0,
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
      const user_role_permission = ref<UserRolePermission[]>([]);
      const user_role_permissions_formatted = reactive({
         name: {},
         description: {},
         attr_values: {},
         attr_levels: {},
         int: {},
         access: {}
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

      window.api.receive("user-role-module-window-reply", (data:IPCParams) => {
         userRole.id = data.id;
         if(data.data) {
            userRole.id = data.data.id;
            userRole.is_active = data.data.is_active;
            userRole.created = getFormattedDateString(data.data.created);
            userRole.updated = getFormattedDateString(data.data.updated);
            userRole.name = data.data.name;
            userRole.atributes_1 = data.data.atributes_1;
            userRole.atributes_2 = data.data.atributes_2;
            userRole.atributes_3 = data.data.atributes_3;
            userRole.atributes_4 = data.data.atributes_4;
            userRole.id_user = data.data.id_user;
            userRole.id_pos = data.data.id_pos;
            userRole.id_branch = data.data.id_branch;
            userRole.user = data.data.user;
            userRole.pos = data.data.pos;
            userRole.branch = data.data.branch;

            create_activity_log({
               name: "The user has access to user role delete report",
               extra_data: JSON.stringify(userRole),
               id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
               id_access: ACTIVITY_LOG_OPERATION.USER_ROLE_REPORT_DELETE,
               id_user: getSessionUserId.value,
               server: getServer.value,
               access_token: getAuthToken.value.access_token
            });

            axios.get<UserRolePermissionsResponse>(`${ getServer.value }/user_role_permission/v3/select-all.php`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            ).then((response) => {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data.data;
                     let formatted_user_role_permissions:Array<UserRolePermission> = [];
                     for(let i = 0; i < data.length; i++) {
                        formatted_user_role_permissions.push({
                           id: Number(data[i].id),
                           is_active: Number(data[i].is_active),
                           created: data[i].created,
                           updated: data[i].updated,
                           name: data[i].name,
                           shortname: data[i].shortname,
                           description: data[i].description,
                           attr_value: data[i].attr_value,
                           attr_level: Number(data[i].attr_level)
                        });
                     }
                     user_role_permission.value = formatted_user_role_permissions;

                     // Format Permissions
                     const user_permissions = {
                        atributes_1: userRole.atributes_1,
                        atributes_2: userRole.atributes_2,
                        atributes_3: userRole.atributes_3,
                        atributes_4: userRole.atributes_4
                     };
                     const result_permissions = format_user_permissions(user_role_permission.value, user_permissions);
                     const names_user_permissions = result_permissions["names"];
                     const descriptions_user_permissions = result_permissions["descriptions"];
                     const attr_values_user_permissions = result_permissions["attr_values"];
                     const attr_levels_user_permissions = result_permissions["attr_levels"];
                     const ints_user_permissions = result_permissions["ints"];
                     const access_user_permissions = result_permissions["access"];

                     user_role_permissions_formatted.name = names_user_permissions;
                     user_role_permissions_formatted.description = descriptions_user_permissions;
                     user_role_permissions_formatted.attr_values = attr_values_user_permissions;
                     user_role_permissions_formatted.attr_levels = attr_levels_user_permissions;
                     user_role_permissions_formatted.int = ints_user_permissions;
                     user_role_permissions_formatted.access = access_user_permissions;
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
         }
         loaded.value = true;
      });

      const onDelete = async() => {
         try {
            let response = await axios.delete<UserRoleResponse>(`${ getServer.value }/user_role/v3/delete.php`,
               {
                  params: {
                     field: "id",
                     data: userRole.id
                  },
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.error.is_error) {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
                  return;
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
               return;
            }
         } catch (error) {
            Swal.fire({
               title: "Error",
               text: t("global.default_error"),
               icon: "error"
            });
            return;
         }

         create_activity_log({
            name: "The user has deleted a user role item",
            extra_data: JSON.stringify(userRole),
            id_operation: ACTIVITY_LOG_ACCESS.DELETE,
            id_access: ACTIVITY_LOG_OPERATION.USER_ROLE_REPORT_DELETE,
            id_user: getSessionUserId.value,
            server: getServer.value,
            access_token: getAuthToken.value.access_token
         });

         window.api.send("user-role-module-window-dialog", {
            type: "delete",
            message: "The user role has been deleted properly"
         });
         window.api.receive("user-role-module-window-dialog-reply", () => {
            window.api.send("user-role-module-window-close", {
               id: userRole.id,
               data: null,
               result: "success",
               type: "delete"
            });
         });
      };

      const onClose = () => {
         window.api.send("user-role-module-window-close", {
            id: userRole.id,
            data: null,
            result: "closed",
            type: "delete"
         });
      };

      return {
         t,
         userRole,
         user_role_permissions_formatted,
         loaded,
         onDelete,
         onClose
      }
   }
});
</script>

<style lang="sass" scoped></style>
