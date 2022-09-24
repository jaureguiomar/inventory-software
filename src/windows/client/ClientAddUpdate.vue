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
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="page.id > 0"
                        v-model="page.id"
                        :label="t('client.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.first_name.text"
                        class="counter"
                        :label="t('client.window.field.first_name') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.first_name.error.is_error"
                        :error-message="field.first_name.error.message"
                        @blur="onFirstNameBlur"
                        @keyup="onFirstNameKeyup"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.last_name.text"
                        :label="t('client.window.field.last_name') + ':'"
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
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.address.text"
                        :label="t('client.window.field.address') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.address.error.is_error"
                        :error-message="field.address.error.message"
                        @blur="onAddressBlur"
                        @keyup="onAddressKeyup"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.cellphone.text"
                        :label="t('client.window.field.cellphone') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.cellphone.error.is_error"
                        :error-message="field.cellphone.error.message"
                        @blur="onCellphoneBlur"
                        @keyup="onCellphoneKeyup"
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.cellphone2.text"
                        :label="t('client.window.field.cellphone2') + ':'"
                        type="text"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.email.text"
                        :label="t('client.window.field.email') + ':'"
                        type="text"
                        hint="Valid Email format"
                        bottom-slots
                        :error="field.email.error.is_error"
                        :error-message="field.email.error.message"
                        @blur="onEmailBlur"
                        @keyup="onEmailKeyup"
                     >
                     </q-input>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     class="q-mr-sm"
                     color="primary"
                     :label="(page.id <= 0) ? t('client.window.add.button.add') : t('client.window.update.button.update')"
                     @click="onAddUpdate"
                  >
                  </q-btn>
                  <q-btn
                     class="q-mr-sm"
                     color="info"
                     :label="t('client.window.button.clear')"
                     @click="onClear"
                  >
                  </q-btn>
                  <q-btn
                     color="negative"
                     :label="t('client.window.button.close')"
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
import { IPCParams, Page, ClientField, ClientResponse, Client } from "@/interfaces/client/client-add-update";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import { validateField, enterKeyNavigation } from "@/plugins/mixins";
import axios from "@/plugins/axios";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "client-add-update-component",
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
      const field = reactive<ClientField>({
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
         },
         address: {
            text: "",
            max_text: 160,
            error: {
               is_error: false,
               message: ""
            }
         },
         cellphone: {
            text: "",
            max_text: 20,
            error: {
               is_error: false,
               message: ""
            }
         },
         cellphone2: {
            text: "",
            max_text: 20,
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
         }
      });
      const loaded = ref(false);

      window.api.receive("client-module-window-reply", (data:IPCParams) => {
         page.id = data.id;
         page.type = data.type;
         page.content = data.content;
         if(data.data) {
            field.first_name.text = data.data.first_name;
            field.last_name.text = data.data.last_name;
            field.address.text = data.data.address;
            field.cellphone.text = data.data.cellphone;
            field.cellphone2.text = (data.data.cellphone2) ? data.data.cellphone2 : "";
            field.email.text = data.data.email;
         }
         loaded.value = true;
      });

      const onAddUpdate = async() => {
         field.first_name.text = field.first_name.text.trim();
         field.last_name.text = field.last_name.text.trim();
         field.address.text = field.address.text.trim();
         field.cellphone.text = field.cellphone.text.trim();
         field.cellphone2.text = field.cellphone2.text.trim();
         field.email.text = field.email.text.trim();

         let first_name = field.first_name.text;
         let last_name = field.last_name.text;
         let address = field.address.text;
         let cellphone = field.cellphone.text;
         // let cellphone2 = field.cellphone2.text;
         let email = field.email.text;
         let error_first_name = false;
         let error_last_name = false;
         let error_address = false;
         let error_cellphone = false;
         // let error_cellphone2 = false;
         let error_email = false;

         error_first_name = validateFirstName(first_name);
         error_last_name = validateLastName(last_name);
         error_address = validateAddress(address);
         error_cellphone = validateCellphone(cellphone);
         // error_cellphone2 = validateCellphone2(cellphone2);
         error_email = validateEmail(email);

         if(error_first_name || error_last_name || error_address || error_cellphone || error_email)
            return;

         let data:Client|null = null;
         if(page.id <= 0) {
            let response = await axios.put<ClientResponse>("client/v3/create.php", {
               first_name: field.first_name.text,
               last_name: field.last_name.text,
               address: field.address.text,
               cellphone: field.cellphone.text,
               cellphone2: field.cellphone2.text,
               email: field.email.text
            });
            if(response) {
               if(!response.data.error.is_error) {
                  data = response.data.data;
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
            let response = await axios.post<ClientResponse>("client/v3/update.php", {
               id: page.id,
               first_name: field.first_name.text,
               last_name: field.last_name.text,
               address: field.address.text,
               cellphone: field.cellphone.text,
               cellphone2: field.cellphone2.text,
               email: field.email.text
            });
            if(response) {
               if(!response.data.error.is_error) {
                  data = response.data.data;
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
            message = "The client has been added properly";
         else if(page.type === "update")
            message = "The client has been updated properly";
         window.api.send("client-module-window-dialog", {
            type: page.type,
            message: message
         });
         window.api.receive("client-module-window-dialog-reply", () => {
            window.api.send("client-module-window-close", {
               id: page.id,
               data: data,
               result: "success",
               type: page.type
            });
         });
      };
      const onClear = () => {
         clearForm();
      };
      const onClose = () => {
         window.api.send("client-module-window-close", {
            id: page.id,
            data: null,
            result: "closed",
            type: page.type
         });
      };
      const clearForm = () => {
         field.first_name.text = "";
         field.first_name.error.is_error = false;
         field.first_name.error.message = "";

         field.last_name.text = "";
         field.last_name.error.is_error = false;
         field.last_name.error.message = "";

         field.address.text = "";
         field.address.error.is_error = false;
         field.address.error.message = "";

         field.cellphone.text = "";
         field.cellphone.error.is_error = false;
         field.cellphone.error.message = "";

         field.cellphone2.text = "";
         field.cellphone2.error.is_error = false;
         field.cellphone2.error.message = "";

         field.email.text = "";
         field.email.error.is_error = false;
         field.email.error.message = "";
      };
      /////////////////
      // Blur Events //
      const onFirstNameBlur = () => {
         let value = field.first_name.text;
         validateFirstName(value);
      };
      const onLastNameBlur = () => {
         let value = field.last_name.text;
         validateLastName(value);
      };
      const onAddressBlur = () => {
         let value = field.address.text;
         validateAddress(value);
      };
      const onCellphoneBlur = () => {
         let value = field.cellphone.text;
         validateCellphone(value);
      };
      // const onCellphone2Blur = () => {
      //    let value = field.cellphone2.text;
      //    validateCellphone2(value);
      // };
      const onEmailBlur = () => {
         let value = field.email.text;
         validateEmail(value);
      };
      /////////////////////
      // Keypress Events //
      const onFirstNameKeyup = (e:KeyboardEvent) => {
         let value = field.first_name.text;
         validateFirstName(value);
         enterKeyNavigation(e, "last-name", "");
      };
      const onLastNameKeyup = (e:KeyboardEvent) => {
         let value = field.last_name.text;
         validateLastName(value);
         enterKeyNavigation(e, "address", "first-name");
      };
      const onAddressKeyup = (e:KeyboardEvent) => {
         let value = field.address.text;
         validateAddress(value);
         enterKeyNavigation(e, "cellphone", "last-name");
      };
      const onCellphoneKeyup = (e:KeyboardEvent) => {
         let value = field.cellphone.text;
         validateCellphone(value);
         enterKeyNavigation(e, "cellphone2", "address");
      };
      // const onCellphone2Keyup = (e:KeyboardEvent) => {
      //    let value = field.cellphone2.text;
      //    validateCellphone2(value);
      //    enterKeyNavigation(e, "email", "cellphone");
      // };
      const onEmailKeyup = (e:KeyboardEvent) => {
         let value = field.email.text;
         validateEmail(value);
         enterKeyNavigation(e, "add-update-button", "cellphone2");
      };
      ////////////////
      // Validators //
      const validateFirstName = (firstName:string) => {
         let result = validateField(firstName, () => {
            if(field.first_name.text.length <= field.first_name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.first_name.error.is_error = result.error;
         field.first_name.error.message = result.message;
         return result.error;
      };
      const validateLastName = (lastName:string) => {
         let result = validateField(lastName, () => {
            if(field.last_name.text.length <= field.last_name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.last_name.error.is_error = result.error;
         field.last_name.error.message = result.message;
         return result.error;
      };
      const validateAddress = (address:string) => {
         let result = validateField(address, () => {
            if(field.address.text.length <= field.address.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.address.error.is_error = result.error;
         field.address.error.message = result.message;
         return result.error;
      };
      const validateCellphone = (cellphone:string)  =>{
         let result = validateField(cellphone, () => {
            if(field.cellphone.text.length <= field.cellphone.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.cellphone.error.is_error = result.error;
         field.cellphone.error.message = result.message;
         return result.error;
      };
      // const validateCellphone2 = (cellphone2:string) => {
      //    let result = validateField(cellphone2, () => {
      //       if(field.cellphone2.text.length <= field.cellphone2.max_text)
      //          return null;
      //       return "This field has exceeded the length limit";
      //    });
      //    field.cellphone2.error.is_error = result.error;
      //    field.cellphone2.error.message = result.message;
      //    return result.error;
      // };
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

      return {
         t,
         page,
         field,
         loaded,
         onAddUpdate,
         onClear,
         onClose,
         onFirstNameBlur,
         onLastNameBlur,
         onAddressBlur,
         onCellphoneBlur,
         // onCellphone2Blur,
         onEmailBlur,
         onFirstNameKeyup,
         onLastNameKeyup,
         onAddressKeyup,
         onCellphoneKeyup,
         // onCellphone2Keyup,
         onEmailKeyup,
      }
   }
});
</script>

<style lang="sass" scoped></style>
