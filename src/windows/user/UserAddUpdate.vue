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
                        :label="t('user.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div v-if="page.id > 0" class="row">
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
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.username.text"
                        :label="t('user.window.field.username') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.username.error.is_error"
                        :error-message="field.username.error.message"
                        @blur="onUsernameBlur"
                        @keyup="onUsernameKeyup"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.email.text"
                        :label="t('user.window.field.email') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.email.error.is_error"
                        :error-message="field.email.error.message"
                        @blur="onEmailBlur"
                        @keyup="onEmailKeyup"
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.password.text"
                        :label="t('user.window.field.password') + ':'"
                        type="password"
                        bottom-slots
                        :error="field.password.error.is_error"
                        :error-message="field.password.error.message"
                        @blur="onPasswordBlur"
                        @keyup="onPasswordKeyup"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.first_name.text"
                        :label="t('user.window.field.first_name') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.first_name.error.is_error"
                        :error-message="field.first_name.error.message"
                        @blur="onFirstNameBlur"
                        @keyup="onFirstNameKeyup"
                     >
                     </q-input>
                  </div>
               </div>
               <div
                  class="row"
                  :class="[ (page.id <= 0) ? 'q-mb-md' : '' ]"
               >
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.last_name.text"
                        :label="t('user.window.field.last_name') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.last_name.error.is_error"
                        :error-message="field.last_name.error.message"
                        @blur="onLastNameBlur"
                        @keyup="onLastNameKeyup"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-select
                        v-model="field.id_role.text"
                        use-input
                        input-debounce="0"
                        label="Role"
                        :options="roleOptions"
                        behavior="menu"
                        :error="field.id_role.error.is_error"
                        :error-message="field.id_role.error.message"
                        @filter="roleFilter"
                        @blur="onIdRoleBlur"
                        @keyup="onIdRoleKeyup"
                     >
                        <template #no-option>
                           <q-item>
                              <q-item-section class="text-grey">
                              No results
                              </q-item-section>
                           </q-item>
                        </template>
                     </q-select>
                  </div>
               </div>
               <div
                  v-if="page.id > 0"
                  class="row"
                  :class="[ (page.id > 0) ? 'q-mb-md' : '' ]"
               >
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
                     class="q-mr-sm"
                     color="primary"
                     :label="(page.id <= 0) ? t('user.window.add.button.add') : t('user.window.update.button.update')"
                     @click="onAddUpdate"
                  >
                  </q-btn>
                  <q-btn
                     class="q-mr-sm"
                     color="info"
                     :label="t('user.window.button.clear')"
                     @click="onClear"
                  >
                  </q-btn>
                  <q-btn
                     color="negative"
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
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { validateField, getFormattedDateString, formatEmail, findValueBy } from "@/plugins/mixins/general";
import { format_branch, format_pos, format_user, format_user_role } from "@/plugins/mixins/format";
import { IPCParamsContent, Page, UserField, UserResponse, User } from "@/types/user";
import { UserRole, UserRoleOneResponse, UserRolesResponse } from "@/types/user-role";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "user-add-update-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const role = ref<UserRole[]>([]);
      const roleOptions = ref<Array<string>>([]);
      const roleFilteredOptions = ref<Array<string>>([]);
      const page = reactive<Page>({
         id: -1,
         type: "",
         content: {
            title: "",
            description: ""
         }
      });
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
         id_user: -1,
         id_pos: -1,
         id_branch: -1,
         role: {
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
            user: null,
            pos: null,
            branch: null
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
      const field = reactive<UserField>({
         username: {
            text: "",
            max_text: 50,
            error: {
               is_error: false,
               message: ""
            }
         },
         email: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         },
         password: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         },
         first_name: {
            text: "",
            max_text: 50,
            error: {
               is_error: false,
               message: ""
            }
         },
         last_name: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         },
         id_role: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         }
      });
      const loaded = ref(false);

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
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

      window.api.receive("user-module-window-reply", (data:IPCParamsContent) => {
         page.id = data.id;
         page.type = data.type;
         page.content = data.content;
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
            user.id_user = data.data.id_user;
            user.id_pos = data.data.id_pos;
            user.id_branch = data.data.id_branch;
            user.role = data.data.role;
            user.user = data.data.user;
            user.pos = data.data.pos;
            user.branch = data.data.branch;

            field.username.text = data.data.username;
            field.email.text = data.data.email;
            field.password.text = data.data.password;
            field.first_name.text = data.data.first_name;
            field.last_name.text = data.data.last_name;
            if(data.data.role)
               field.id_role.text = data.data.role.name;
         }
         loaded.value = true;
      });
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
               let formatted_roles:Array<UserRole> = [];

               for(let i = 0; i < data.length; i++) {
                  const formatted_user:User|null = format_user(data[i].user);
                  const formatted_pos:Pos|null = format_pos(data[i].pos);
                  const formatted_branch:Branch|null = format_branch(data[i].branch);

                  formatted_roles.push({
                     id: Number(data[i].id),
                     is_active: Number(data[i].is_active),
                     created: data[i].created,
                     updated: data[i].updated,
                     name: data[i].name,
                     atributes_1: Number(data[i].atributes_1),
                     atributes_2: Number(data[i].atributes_2),
                     atributes_3: Number(data[i].atributes_3),
                     atributes_4: Number(data[i].atributes_4),
                     id_user: Number(data[i].id_user),
                     id_pos: Number(data[i].id_pos),
                     id_branch: Number(data[i].id_branch),
                     user: formatted_user,
                     pos: formatted_pos,
                     branch: formatted_branch
                  });

                  roleOptions.value.push(data[i].name);
                  roleFilteredOptions.value.push(data[i].name);
               }
               role.value = formatted_roles;
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

      const onAddUpdate = async() => {
         field.username.text = field.username.text.trim();
         field.email.text = field.email.text.trim();
         field.password.text = field.password.text.trim();
         field.first_name.text = field.first_name.text.trim();
         field.last_name.text = field.last_name.text.trim();
         field.id_role.text = field.id_role.text.trim();

         let username:string = field.username.text;
         let email:string = field.email.text;
         let password:string = field.password.text;
         let first_name:string = field.first_name.text;
         let last_name:string = field.last_name.text;
         let role_name:string = field.id_role.text;
         let id_role:number = -1;
         let error_username:boolean = false;
         let error_email:boolean = false;
         let error_password:boolean = false;
         let error_first_name:boolean = false;
         let error_last_name:boolean = false;
         let error_id_role:boolean = false;

         error_username = validateUsername(username);
         error_email = validateEmail(email);
         error_password = validatePassword(password);
         error_first_name = validateFirstName(first_name);
         error_last_name = validateLastName(last_name);

         // Validate role
         const finded_index = findValueBy(role.value, role_name, "name");
         if(finded_index < 0)
            error_id_role = true;
         if(error_id_role)
            error_id_role = validateIdRole(role_name);
         else
            id_role = role.value[finded_index].id;

         if(error_username || error_email || error_password || error_first_name || error_last_name)
            return;

         ///////////////////////
         // Add / Update Data //
         let formatted_data:User = {
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
            role: {
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
               user: null,
               pos: null,
               branch: null
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

         if(page.id <= 0) {
            try {
               let response = await axios.put<UserResponse>(`${ getServer.value }/user/v3/create.php`,
                  {
                     username: field.username.text,
                     email: field.email.text,
                     password: field.password.text,
                     first_name: field.first_name.text,
                     last_name: field.last_name.text,
                     id_role: id_role,
                     id_user: getSessionUserId.value,
                     id_pos: getPosId.value,
                     id_branch: getBranchId.value
                  },
                  {
                     headers: {
                        "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                     }
                  }
               );
               if(response) {
                  if(!response.data.error.is_error) {
                     const data:User = response.data.data.data;
                     const formatted_role:UserRole|null = format_user_role(data.role);
                     const formatted_user:User|null = format_user(data.user);
                     const formatted_pos:Pos|null = format_pos(data.pos);
                     const formatted_branch:Branch|null = format_branch(data.branch);

                     formatted_data = {
                        id: Number(data.id),
                        is_active: Number(data.is_active),
                        created: data.created,
                        updated: data.updated,
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        id_role: Number(data.id_role),
                        id_user: Number(data.id_user),
                        id_pos: Number(data.id_pos),
                        id_branch: Number(data.id_branch),
                        role: formatted_role,
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
               let response = await axios.post<UserResponse>(`${ getServer.value }/user/v3/update.php`,
                  {
                     id: page.id,
                     username: field.username.text,
                     email: field.email.text,
                     password: field.password.text,
                     first_name: field.first_name.text,
                     last_name: field.last_name.text,
                     id_role: id_role,
                     id_user: getSessionUserId.value,
                     id_pos: getPosId.value,
                     id_branch: getBranchId.value
                  },
                  {
                     headers: {
                        "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                     }
                  }
               );
               if(response) {
                  if(!response.data.error.is_error) {
                     const data:User = response.data.data.data;
                     const formatted_role:UserRole|null = format_user_role(data.role);
                     const formatted_user:User|null = format_user(data.user);
                     const formatted_pos:Pos|null = format_pos(data.pos);
                     const formatted_branch:Branch|null = format_branch(data.branch);

                     formatted_data = {
                        id: Number(data.id),
                        is_active: Number(data.is_active),
                        created: data.created,
                        updated: data.updated,
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        id_role: Number(data.id_role),
                        id_user: Number(data.id_user),
                        id_pos: Number(data.id_pos),
                        id_branch: Number(data.id_branch),
                        role: formatted_role,
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

         // Get role
         try {
            let response = await axios.get<UserRoleOneResponse>(`${ getServer.value }/user_role/v3/select-one.php?id=${ formatted_data.id_role }`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(!response.data.error.is_error) {
                  const data:UserRole = response.data.data;
                  // const formatted_user:User|null = format_user(data.user);
                  // const formatted_pos:Pos|null = format_pos(data.pos);
                  // const formatted_branch:Branch|null = format_branch(data.branch);

                  formatted_data.role = {
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
                     user: null,
                     pos: null,
                     branch: null
                     // user: formatted_user,
                     // pos: formatted_pos,
                     // branch: formatted_branch
                  }
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

         let message = "";
         if(page.type === "add")
            message = "The user has been added properly";
         else if(page.type === "update")
            message = "The user has been updated properly";
         window.api.send("user-module-window-dialog", {
            type: page.type,
            message: message
         });
         window.api.receive("user-module-window-dialog-reply", () => {
            window.api.send("user-module-window-close", {
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
         window.api.send("user-module-window-close", {
            id: page.id,
            data: null,
            result: "closed",
            type: page.type
         });
      };
      const clearForm = () => {
         field.username.text = "";
         field.username.error.is_error = false;
         field.username.error.message = "";

         field.email.text = "";
         field.email.error.is_error = false;
         field.email.error.message = "";

         field.password.text = "";
         field.password.error.is_error = false;
         field.password.error.message = "";

         field.first_name.text = "";
         field.first_name.error.is_error = false;
         field.first_name.error.message = "";

         field.last_name.text = "";
         field.last_name.error.is_error = false;
         field.last_name.error.message = "";
      };
      const roleFilter = (value:string, update:Function) => {
         if(value === "") {
            update(() => {
               roleOptions.value = roleFilteredOptions.value;
            });
            return;
         }
         update(() => {
            const needle = value.toLowerCase();
            roleOptions.value = roleFilteredOptions.value.filter(tmp_value => tmp_value.toLowerCase().indexOf(needle) > -1);
         });
      };
      /////////////////
      // Blur Events //
      const onUsernameBlur = () => {
         let value = field.username.text;
         validateUsername(value);
      };
      const onEmailBlur = () => {
         let value = field.email.text;
         validateEmail(value);
      };
      const onPasswordBlur = () => {
         let value = field.password.text;
         validatePassword(value);
      };
      const onFirstNameBlur = () => {
         let value = field.first_name.text;
         validateFirstName(value);
      };
      const onLastNameBlur = () => {
         let value = field.last_name.text;
         validateLastName(value);
      };
      const onIdRoleBlur = () => {
         let value = field.id_role.text;
         validateIdRole(value);
      };
      /////////////////////
      // Keypress Events //
      const onUsernameKeyup = () => {
         let value = field.username.text;
         validateUsername(value);
      };
      const onEmailKeyup = () => {
         let value = field.email.text;
         validateEmail(value);
      };
      const onPasswordKeyup = () => {
         let value = field.password.text;
         validatePassword(value);
      };
      const onFirstNameKeyup = () => {
         let value = field.first_name.text;
         validateFirstName(value);
      };
      const onLastNameKeyup = () => {
         let value = field.last_name.text;
         validateLastName(value);
      };
      const onIdRoleKeyup = () => {
         let value = field.id_role.text;
         validateIdRole(value);
      };
      ////////////////
      // Validators //
      const validateUsername = (username:string) => {
         let result = validateField(username, () => {
            if(field.username.text.length <= field.username.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.username.error.is_error = result.error;
         field.username.error.message = result.message;
         return result.error;
      };
      const validateEmail = (email:string) => {
         let result = validateField(email, () => {
            if(field.email.text.length <= field.email.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         if(!result.error) {
            result = validateField(email, () => {
               if(formatEmail(field.email.text))
                  return null;
               return "You must enter a valid emmail format";
            });
         }

         field.email.error.is_error = result.error;
         field.email.error.message = result.message;
         return result.error;
      };
      const validatePassword = (password:string) => {
         let result = validateField(password, () => {
            if(field.password.text.length <= field.password.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.password.error.is_error = result.error;
         field.password.error.message = result.message;
         return result.error;
      };
      const validateFirstName = (first_name:string) => {
         let result = validateField(first_name, () => {
            if(field.first_name.text.length <= field.first_name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.first_name.error.is_error = result.error;
         field.first_name.error.message = result.message;
         return result.error;
      };
      const validateLastName = (last_name:string) => {
         let result = validateField(last_name, () => {
            if(field.last_name.text.length <= field.last_name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.last_name.error.is_error = result.error;
         field.last_name.error.message = result.message;
         return result.error;
      };
      const validateIdRole = (id_role:string) => {
         let result = validateField(id_role);
         field.id_role.error.is_error = result.error;
         field.id_role.error.message = result.message;
         return result.error;
      };

      return {
         t,
         page,
         field,
         loaded,
         user,
         roleOptions,
         roleFilter,
         onAddUpdate,
         onClear,
         onClose,
         onUsernameBlur,
         onEmailBlur,
         onPasswordBlur,
         onFirstNameBlur,
         onIdRoleBlur,
         onLastNameBlur,
         onUsernameKeyup,
         onEmailKeyup,
         onPasswordKeyup,
         onFirstNameKeyup,
         onLastNameKeyup,
         onIdRoleKeyup
      }
   }
});
</script>

<style lang="sass" scoped></style>
