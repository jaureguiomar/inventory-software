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
               <div class="row q-mb-md">
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
import { IPCParamsContent, Page, UserRoleField, UserRoleResponse, UserRole } from "@/interfaces/user-role/user-role";
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
            userRole.id_user = data.data.id_user;
            userRole.id_pos = data.data.id_pos;
            userRole.id_branch = data.data.id_branch;
            userRole.user = data.data.user;
            userRole.pos = data.data.pos;
            userRole.branch = data.data.branch;

            field.name.text = data.data.name;
         }
         loaded.value = true;
      });

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
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

         if(page.id <= 0) {
            try {
               let response = await axios.put<UserRoleResponse>(`${ getServer.value }/user_role/v3/create.php`, {
                  name: field.name.text,
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
