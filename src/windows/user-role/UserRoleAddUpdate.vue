<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ page.content.title }}</p>
            </template>
            <template #subtitle>{{ page.content.description }}</template>
         </Menu>

         <Content>
            <template #content>
               <div v-if="page.id > 0" class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-model="page.id"
                        :label="t('user_role.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div v-if="page.id > 0" class="row">
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
                        v-model="field.name.text"
                        :label="t('user_role.window.field.name') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.name.error.is_error"
                        :error-message="field.name.error.message"
                        @blur="onNameBlur"
                        @keyup="onNameKeyup"
                     >
                     </q-input>
                  </div>
                  <div v-if="page.id > 0" class="col-md-6 col-12">
                     <q-input
                        v-model="userRole.branch.name"
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
                              :title="user_role_permissions_formatted.description.PERMISSION_1"
                              :label="user_role_permissions_formatted.name.PERMISSION_1"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_2"
                              :title="user_role_permissions_formatted.description.PERMISSION_2"
                              :label="user_role_permissions_formatted.name.PERMISSION_2"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_3"
                              :title="user_role_permissions_formatted.description.PERMISSION_3"
                              :label="user_role_permissions_formatted.name.PERMISSION_3"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_4"
                              :title="user_role_permissions_formatted.description.PERMISSION_4"
                              :label="user_role_permissions_formatted.name.PERMISSION_4"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_5"
                              :title="user_role_permissions_formatted.description.PERMISSION_5"
                              :label="user_role_permissions_formatted.name.PERMISSION_5"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_6"
                              :title="user_role_permissions_formatted.description.PERMISSION_6"
                              :label="user_role_permissions_formatted.name.PERMISSION_6"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_7"
                              :title="user_role_permissions_formatted.description.PERMISSION_7"
                              :label="user_role_permissions_formatted.name.PERMISSION_7"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_8"
                              :title="user_role_permissions_formatted.description.PERMISSION_8"
                              :label="user_role_permissions_formatted.name.PERMISSION_8"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_9"
                              :title="user_role_permissions_formatted.description.PERMISSION_9"
                              :label="user_role_permissions_formatted.name.PERMISSION_9"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_10"
                              :title="user_role_permissions_formatted.description.PERMISSION_10"
                              :label="user_role_permissions_formatted.name.PERMISSION_10"
                           >
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
                              :title="user_role_permissions_formatted.description.PERMISSION_11"
                              :label="user_role_permissions_formatted.name.PERMISSION_11"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_12"
                              :title="user_role_permissions_formatted.description.PERMISSION_12"
                              :label="user_role_permissions_formatted.name.PERMISSION_12"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_13"
                              :title="user_role_permissions_formatted.description.PERMISSION_13"
                              :label="user_role_permissions_formatted.name.PERMISSION_13"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_14"
                              :title="user_role_permissions_formatted.description.PERMISSION_14"
                              :label="user_role_permissions_formatted.name.PERMISSION_14"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_15"
                              :title="user_role_permissions_formatted.description.PERMISSION_15"
                              :label="user_role_permissions_formatted.name.PERMISSION_15"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_16"
                              :title="user_role_permissions_formatted.description.PERMISSION_16"
                              :label="user_role_permissions_formatted.name.PERMISSION_16"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_17"
                              :title="user_role_permissions_formatted.description.PERMISSION_17"
                              :label="user_role_permissions_formatted.name.PERMISSION_17"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_18"
                              :title="user_role_permissions_formatted.description.PERMISSION_18"
                              :label="user_role_permissions_formatted.name.PERMISSION_18"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_19"
                              :title="user_role_permissions_formatted.description.PERMISSION_19"
                              :label="user_role_permissions_formatted.name.PERMISSION_19"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_20"
                              :title="user_role_permissions_formatted.description.PERMISSION_20"
                              :label="user_role_permissions_formatted.name.PERMISSION_20"
                           >
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
                              :title="user_role_permissions_formatted.description.PERMISSION_21"
                              :label="user_role_permissions_formatted.name.PERMISSION_21"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_22"
                              :title="user_role_permissions_formatted.description.PERMISSION_22"
                              :label="user_role_permissions_formatted.name.PERMISSION_22"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_23"
                              :title="user_role_permissions_formatted.description.PERMISSION_23"
                              :label="user_role_permissions_formatted.name.PERMISSION_23"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_24"
                              :title="user_role_permissions_formatted.description.PERMISSION_24"
                              :label="user_role_permissions_formatted.name.PERMISSION_24"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_25"
                              :title="user_role_permissions_formatted.description.PERMISSION_25"
                              :label="user_role_permissions_formatted.name.PERMISSION_25"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_26"
                              :title="user_role_permissions_formatted.description.PERMISSION_26"
                              :label="user_role_permissions_formatted.name.PERMISSION_26"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_27"
                              :title="user_role_permissions_formatted.description.PERMISSION_27"
                              :label="user_role_permissions_formatted.name.PERMISSION_27"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_28"
                              :title="user_role_permissions_formatted.description.PERMISSION_28"
                              :label="user_role_permissions_formatted.name.PERMISSION_28"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_29"
                              :title="user_role_permissions_formatted.description.PERMISSION_29"
                              :label="user_role_permissions_formatted.name.PERMISSION_29"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_30"
                              :title="user_role_permissions_formatted.description.PERMISSION_30"
                              :label="user_role_permissions_formatted.name.PERMISSION_30"
                           >
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
                              :title="user_role_permissions_formatted.description.PERMISSION_31"
                              :label="user_role_permissions_formatted.name.PERMISSION_31"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_32"
                              :title="user_role_permissions_formatted.description.PERMISSION_32"
                              :label="user_role_permissions_formatted.name.PERMISSION_32"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_33"
                              :title="user_role_permissions_formatted.description.PERMISSION_33"
                              :label="user_role_permissions_formatted.name.PERMISSION_33"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_34"
                              :title="user_role_permissions_formatted.description.PERMISSION_34"
                              :label="user_role_permissions_formatted.name.PERMISSION_34"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_35"
                              :title="user_role_permissions_formatted.description.PERMISSION_35"
                              :label="user_role_permissions_formatted.name.PERMISSION_35"
                           >
                           </q-checkbox>
                           <q-checkbox
                              v-model="user_role_permissions_formatted.access.PERMISSION_36"
                              :title="user_role_permissions_formatted.description.PERMISSION_36"
                              :label="user_role_permissions_formatted.name.PERMISSION_36"
                           >
                           </q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     class="q-mr-sm"
                     color="primary"
                     :label="(page.id <= 0) ? t('user_role.window.add.button.add') : t('user_role.window.update.button.update')"
                     @click="onAddUpdate"
                  >
                  </q-btn>
                  <q-btn
                     class="q-mr-sm"
                     color="info"
                     :label="t('user_role.window.button.clear')"
                     @click="onClear"
                  >
                  </q-btn>
                  <q-btn
                     color="negative"
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
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { validateField, getFormattedDateString } from "@/plugins/mixins/general";
import { format_branch, format_pos, format_user } from "@/plugins/mixins/format";
import { format_user_permissions } from "@/plugins/mixins/permission";
import { IPCParamsContent, Page, UserRoleField, UserRole, UserRoleResponse } from "@/interfaces/user-role/user-role";
import { UserRolePermission, UserRolePermissionsResponse } from "@/interfaces/user-role-permission/user-role-permission";
import { User } from "@/interfaces/user/user";
import { Pos } from "@/interfaces/pos/pos";
import { Branch } from "@/interfaces/branch/branch";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "user-role-add-update-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const page = reactive<Page>({
         id: -1,
         type: "",
         content: {
            title: "",
            description: ""
         }
      });
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
      const field = reactive<UserRoleField>({
         name: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         }
      });
      const user_role_permission = ref<UserRolePermission[]>([]);
      const user_role_permissions_formatted = reactive({
         name: {},
         description: {},
         attr: {},
         int: {},
         access: {}
      });
      const loaded = ref(false);

      window.api.receive("user-role-module-window-reply", (data:IPCParamsContent) => {
         page.id = data.id;
         page.type = data.type;
         page.content = data.content;
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

            field.name.text = data.data.name;
         }

         axios.get<UserRolePermissionsResponse>(`${ getServer.value }/user_role_permission/v3/select-all.php`)
         .then((response) => {
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
                  const user_permissions = { "atributes_1": (userRole.atributes_1) ? userRole.atributes_1 : 0 };
                  const result_permissions = format_user_permissions(user_role_permission.value, user_permissions);
                  const names_user_permissions = result_permissions["names"];
                  const descriptions_user_permissions = result_permissions["descriptions"];
                  const attrs_user_permissions = result_permissions["attrs"];
                  const ints_user_permissions = result_permissions["ints"];
                  const access_user_permissions = result_permissions["access"];

                  user_role_permissions_formatted.name = names_user_permissions;
                  user_role_permissions_formatted.description = descriptions_user_permissions;
                  user_role_permissions_formatted.attr = attrs_user_permissions;
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

         loaded.value = true;
      });

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
      });
      const getPosId = computed(() => {
         return store.getters["getPosId"];
      });
      const getSessionUserId = computed(() => {
         return store.getters["getSessionUserId"];
      });

      const onAddUpdate = async() => {
         field.name.text = field.name.text.trim();

         let name:string = field.name.text;
         let error_name:boolean = false;

         error_name = validateName(name);
         if(error_name)
            return;

         ///////////////////////
         // Add / Update Data //
         let formatted_data:UserRole = {
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
         };

         const access_keys = Object.keys(user_role_permissions_formatted.access);
         let total_atributes_1 = 0;
         for(let i = 0; i < access_keys.length; i++) {
            const curr_key = access_keys[i];
            // const curr_name = user_role_permissions_formatted.name[curr_key];
            // const curr_description = user_role_permissions_formatted.description[curr_key];
            // const curr_attr = user_role_permissions_formatted.attr[curr_key];
            const curr_int = user_role_permissions_formatted.int[curr_key];
            const curr_access = user_role_permissions_formatted.access[curr_key];
            if(curr_access)
               total_atributes_1 += curr_int;
         }

         console.log("total_atributes_1", total_atributes_1);

         if(page.id <= 0) {
            try {
               let response = await axios.put<UserRoleResponse>(`${ getServer.value }/user_role/v3/create.php`, {
                  name: field.name.text,
                  atributes_1: total_atributes_1,
                  atributes_2: 0,
                  atributes_3: 0,
                  atributes_4: 0,
                  id_user: getSessionUserId.value,
                  id_pos: getPosId.value,
                  id_branch: getBranchId.value
               });
               if(response) {
                  if(!response.data.error.is_error) {
                     const data:UserRole = response.data.data.data;
                     const formatted_user:User|null = format_user(data.user);
                     const formatted_pos:Pos|null = format_pos(data.pos);
                     const formatted_branch:Branch|null = format_branch(data.branch);

                     formatted_data = {
                        id: Number(data.id),
                        is_active: Number(data.is_active),
                        created: data.created,
                        updated: data.updated,
                        name: data.name,
                        atributes_1: Number(data.atributes_1),
                        atributes_2: Number(data.atributes_2),
                        atributes_3: Number(data.atributes_3),
                        atributes_4: Number(data.atributes_4),
                        id_user: Number(data.id_user),
                        id_pos: Number(data.id_pos),
                        id_branch: Number(data.id_branch),
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     };
                  } else {
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
         } else {
            try {
               let response = await axios.post<UserRoleResponse>(`${ getServer.value }/user_role/v3/update.php`, {
                  id: page.id,
                  name: field.name.text,
                  atributes_1: total_atributes_1,
                  atributes_2: 0,
                  atributes_3: 0,
                  atributes_4: 0,
                  id_user: getSessionUserId.value,
                  id_pos: getPosId.value,
                  id_branch: getBranchId.value
               });
               if(response) {
                  if(!response.data.error.is_error) {
                     const data:UserRole = response.data.data.data;
                     const formatted_user:User|null = format_user(data.user);
                     const formatted_pos:Pos|null = format_pos(data.pos);
                     const formatted_branch:Branch|null = format_branch(data.branch);

                     formatted_data = {
                        id: Number(data.id),
                        is_active: Number(data.is_active),
                        created: data.created,
                        updated: data.updated,
                        name: data.name,
                        atributes_1: Number(data.atributes_1),
                        atributes_2: Number(data.atributes_2),
                        atributes_3: Number(data.atributes_3),
                        atributes_4: Number(data.atributes_4),
                        id_user: Number(data.id_user),
                        id_pos: Number(data.id_pos),
                        id_branch: Number(data.id_branch),
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     };
                  } else {
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
         }

         let message = "";
         if(page.type === "add")
            message = "The user role has been added properly";
         else if(page.type === "update")
            message = "The user role has been updated properly";
         window.api.send("user-role-module-window-dialog", {
            type: page.type,
            message: message
         });
         window.api.receive("user-role-module-window-dialog-reply", () => {
            window.api.send("user-role-module-window-close", {
               id: page.id,
               data: formatted_data,
               result: "success",
               type: page.type
            });
         });
      };
      const onClear = () => {
         clearForm();
      };
      const onClose = () => {
         window.api.send("user-role-module-window-close", {
            id: page.id,
            data: null,
            result: "closed",
            type: page.type
         });
      };
      const clearForm = () => {
         field.name.text = "";
         field.name.error.is_error = false;
         field.name.error.message = "";
      };
      /////////////////
      // Blur Events //
      const onNameBlur = () => {
         let value = field.name.text;
         validateName(value);
      };
      /////////////////////
      // Keypress Events //
      const onNameKeyup = () => {
         let value = field.name.text;
         validateName(value);
      };
      ////////////////
      // Validators //
      const validateName = (name:string) => {
         let result = validateField(name, () => {
            if(field.name.text.length <= field.name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.name.error.is_error = result.error;
         field.name.error.message = result.message;
         return result.error;
      };

      return {
         t,
         page,
         field,
         loaded,
         userRole,
         user_role_permissions_formatted,
         onAddUpdate,
         onClear,
         onClose,
         onNameBlur,
         onNameKeyup
      }
   }
});
</script>

<style lang="sass" scoped></style>
