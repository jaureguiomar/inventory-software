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
               <div class="row q-mb-md">
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
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { validateField, getFormattedDateString } from "@/plugins/mixins";
import { IPCParamsContent, Page, UserField, UserResponse, User } from "@/interfaces/user/user";
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
         last_name: ""
      });
      const field = reactive<UserField>({
         username: {
            text: "",
            max_text: 70,
            error: {
               is_error: false,
               message: ""
            }
         },
         email: {
            text: "",
            max_text: 70,
            error: {
               is_error: false,
               message: ""
            }
         },
         password: {
            text: "",
            max_text: 70,
            error: {
               is_error: false,
               message: ""
            }
         },
         first_name: {
            text: "",
            max_text: 70,
            error: {
               is_error: false,
               message: ""
            }
         },
         last_name: {
            text: "",
            max_text: 70,
            error: {
               is_error: false,
               message: ""
            }
         }
      });
      const loaded = ref(false);

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

            field.username.text = data.data.username;
            field.email.text = data.data.email;
            field.password.text = data.data.password;
            field.first_name.text = data.data.first_name;
            field.last_name.text = data.data.last_name;
         }
         loaded.value = true;
      });

      const onAddUpdate = async() => {
         field.username.text = field.username.text.trim();
         field.email.text = field.email.text.trim();
         field.password.text = field.password.text.trim();
         field.first_name.text = field.first_name.text.trim();
         field.last_name.text = field.last_name.text.trim();

         let username:string = field.username.text;
         let email:string = field.email.text;
         let password:string = field.password.text;
         let first_name:string = field.first_name.text;
         let last_name:string = field.last_name.text;
         let error_username:boolean = false;
         let error_email:boolean = false;
         let error_password:boolean = false;
         let error_first_name:boolean = false;
         let error_last_name:boolean = false;

         error_username = validateUsername(username);
         error_email = validateEmail(email);
         error_password = validatePassword(password);
         error_first_name = validateFirstName(first_name);
         error_last_name = validateLastName(last_name);
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
            last_name: ""
         };

         if(page.id <= 0) {
            let response = await axios.put<UserResponse>("user/v3/create.php", {
               username: field.username.text,
               email: field.email.text,
               password: field.password.text,
               first_name: field.first_name.text,
               last_name: field.last_name.text
            });
            if(response) {
               if(!response.data.error.is_error) {
                  const data:User = response.data.data.data;
                  formatted_data = {
                     id: Number(data.id),
                     is_active: Number(data.is_active),
                     created: data.created,
                     updated: data.updated,
                     username: data.username,
                     email: data.email,
                     password: data.password,
                     first_name: data.first_name,
                     last_name: data.last_name
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
         } else {
            let response = await axios.post<UserResponse>("user/v3/update.php", {
               id: page.id,
               username: field.username.text,
               email: field.email.text,
               password: field.password.text,
               first_name: field.first_name.text,
               last_name: field.last_name.text
            });
            if(response) {
               if(!response.data.error.is_error) {
                  const data:User = response.data.data.data;
                  formatted_data = {
                     id: Number(data.id),
                     is_active: Number(data.is_active),
                     created: data.created,
                     updated: data.updated,
                     username: data.username,
                     email: data.email,
                     password: data.password,
                     first_name: data.first_name,
                     last_name: data.last_name
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

      return {
         t,
         page,
         field,
         loaded,
         user,
         onAddUpdate,
         onClear,
         onClose,
         onUsernameBlur,
         onEmailBlur,
         onPasswordBlur,
         onFirstNameBlur,
         onLastNameBlur,
         onUsernameKeyup,
         onEmailKeyup,
         onPasswordKeyup,
         onFirstNameKeyup,
         onLastNameKeyup
      }
   }
});
</script>

<style lang="sass" scoped></style>
