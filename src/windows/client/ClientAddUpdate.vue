<template>
   <transition-group name="list" tag="div">
      <div v-if="!loaded" key="loader" class="spinner-loader">
         <div class="spinner-loader-container">
            <div class="spinner-ripple-loader">
               <div class="spinner-ripple-loader-container">
                  <div></div>
                  <div></div>
               </div>
            </div>
         </div>
      </div>

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p>{{ content.title }}</p>
            </template>
            <template #subtitle>{{ content.description }}</template>
         </Menu>
         <Content>
            <template #content>
               <div v-if="id &gt; 0" class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.id") }}:</label>
                  <div class="col-sm-2">
                     <input v-model="id" class="form-control" type="text" disabled="disabled" />
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.first_name") }}:</label>
                  <div class="col-sm-4">
                     <input id="first-name" v-model="data.first_name.text" v-focus="v-focus" class="form-control counter" type="text" placeholder="Enter first name" :class="{ 'is-invalid': data.first_name.error.is_error }" @blur="onFirstNameBlur" @keyup="onFirstNameKeyup" />
                     <div v-if="data.first_name.error.is_error" class="invalid-feedback text-left">{{ data.first_name.error.message }}</div>
                     <BadgeCounter :value="data.first_name.text" :maxText="data.first_name.max_text" :isError="data.first_name.error.is_error"></BadgeCounter>
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.last_name") }}:</label>
                  <div class="col-sm-4">
                     <input id="last-name" v-model="data.last_name.text" class="form-control" type="text" placeholder="Enter last name" :class="{ 'is-invalid': data.last_name.error.is_error }" @blur="onLastNameBlur" @keyup="onLastNameKeyup" />
                     <div v-if="data.last_name.error.is_error" class="invalid-feedback text-left">{{ data.last_name.error.message }}</div>
                     <BadgeCounter :value="data.last_name.text" :maxText="data.last_name.max_text" :isError="data.last_name.error.is_error"></BadgeCounter>
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.address") }}:</label>
                  <div class="col-sm-4">
                     <input id="address" v-model="data.address.text" class="form-control" type="text" placeholder="Enter address" :class="{ 'is-invalid': data.address.error.is_error }" @blur="onAddressBlur" @keyup="onAddressKeyup" />
                     <div v-if="data.address.error.is_error" class="invalid-feedback text-left">{{ data.address.error.message }}</div>
                     <BadgeCounter :value="data.address.text" :maxText="data.address.max_text" :isError="data.address.error.is_error"></BadgeCounter>
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.cellphone") }}:</label>
                  <div class="col-sm-4">
                     <input id="cellphone" v-model="data.cellphone.text" class="form-control" type="text" placeholder="Enter cellphone" :class="{ 'is-invalid': data.cellphone.error.is_error }" @blur="onCellphoneBlur" @keyup="onCellphoneKeyup" />
                     <div v-if="data.cellphone.error.is_error" class="invalid-feedback text-left">{{ data.cellphone.error.message }}</div>
                     <BadgeCounter :value="data.cellphone.text" :maxText="data.cellphone.max_text" :isError="data.cellphone.error.is_error"></BadgeCounter>
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.cellphone2") }}:</label>
                  <div class="col-sm-4">
                     <input id="cellphone2" v-model="data.cellphone2.text" class="form-control" type="text" placeholder="Enter cellphone 2" :class="{ 'is-invalid': data.cellphone2.error.is_error }" />
                     <div v-if="data.cellphone2.error.is_error" class="invalid-feedback text-left">{{ data.cellphone2.error.message }}</div>
                     <BadgeCounter :value="data.cellphone2.text" :maxText="data.cellphone2.max_text" :isError="data.cellphone2.error.is_error"></BadgeCounter>
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.email") }}:</label>
                  <div class="col-sm-4">
                     <input id="email" v-model="data.email.text" class="form-control" type="text" placeholder="Enter email" :class="{ 'is-invalid': data.email.error.is_error }" @blur="onEmailBlur" @keyup="onEmailKeyup" />
                     <div v-if="data.email.error.is_error" class="invalid-feedback text-left">{{ data.email.error.message }}</div>
                     <BadgeCounter :value="data.email.text" :maxText="data.email.max_text" :isError="data.email.error.is_error"></BadgeCounter>
                  </div>
               </div>
               <div class="text-center">
                  <button
                     id="add-update-button"
                     class="btn btn-primary text-center mr-2"
                     type="submit"
                     @click="onAddUpdate"
                  >
                     {{ (id <= 0) ? $t("client.window.add.button.add") : $t("client.window.update.button.update") }}
                  </button>
                  <button
                     class="btn btn-danger text-center mr-2"
                     type="clear"
                     @click="onClear"
                  >
                     {{ $t("client.window.button.clear") }}
                  </button>
                  <button
                     class="btn btn-info text-center"
                     type="clear"
                     @click="onClose"
                  >
                     {{ $t("client.window.button.close") }}
                  </button>
               </div>
            </template>
         </Content>
      </div>
   </transition-group>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import mixins from "vue-typed-mixins";
import defaultMixin from "../../plugins/mixins";
import { Props, IPCParams, AxiosResponse, Client } from "../../interfaces/client/client-add-update";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";
import BadgeCounter from "../../views/components/BadgeCounter.vue";

export default defineComponent({
   name: "client-add-update-component",
   components: {
      Banner,
      Menu,
      Content,
      BadgeCounter
   },
   mixins: [defaultMixin],
   data() {
      return {
         id: -1,
         type: "",
         content: {
            title: "",
            description: ""
         },
         data: {
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
         },
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("client-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         vue_this.type = data.type;
         vue_this.content = data.content;
         if(data.data) {
            vue_this.data.first_name.text = data.data.first_name;
            vue_this.data.last_name.text = data.data.last_name;
            vue_this.data.address.text = data.data.address;
            vue_this.data.cellphone.text = data.data.cellphone;
            vue_this.data.cellphone2.text = (data.data.cellphone2) ? data.data.cellphone2 : "";
            vue_this.data.email.text = data.data.email;
         }
         vue_this.loaded = true;
      });
   },
   methods: {
      async onAddUpdate() {
         this.data.first_name.text = this.data.first_name.text.trim();
         this.data.last_name.text = this.data.last_name.text.trim();
         this.data.address.text = this.data.address.text.trim();
         this.data.cellphone.text = this.data.cellphone.text.trim();
         this.data.cellphone2.text = this.data.cellphone2.text.trim();
         this.data.email.text = this.data.email.text.trim();

         let first_name = this.data.first_name.text;
         let last_name = this.data.last_name.text;
         let address = this.data.address.text;
         let cellphone = this.data.cellphone.text;
         // let cellphone2 = this.data.cellphone2.text;
         let email = this.data.email.text;
         let error_first_name = false;
         let error_last_name = false;
         let error_address = false;
         let error_cellphone = false;
         // let error_cellphone2 = false;
         let error_email = false;

         error_first_name = this.validateFirstName(first_name);
         error_last_name = this.validateLastName(last_name);
         error_address = this.validateAddress(address);
         error_cellphone = this.validateCellphone(cellphone);
         // error_cellphone2 = this.validateCellphone2(cellphone2);
         error_email = this.validateEmail(email);

         if(error_first_name || error_last_name || error_address || error_cellphone || error_email)
            return;

         let data:Client|null = null;
         if(this.id <= 0) {
            let response:AxiosResponse = await Vue.prototype.$http.put("client/v3/create.php", {
               first_name: this.data.first_name.text,
               last_name: this.data.last_name.text,
               address: this.data.address.text,
               cellphone: this.data.cellphone.text,
               cellphone2: this.data.cellphone2.text,
               email: this.data.email.text
            });
            if(response) {
               if(!response.data.error.is_error) {
                  data = response.data.data.data;
               } else {
                  this.$fire({
                     title: "Error",
                     text: this.$t("global.default_error") as string,
                     type: "error"
                  });
                  return;
               }
            } else {
               this.$fire({
                  title: "Error",
                  text: this.$t("global.default_error") as string,
                  type: "error"
               });
               return;
            }
         } else {
            let response:AxiosResponse = await Vue.prototype.$http.post("client/v3/update.php", {
               id: this.id,
               first_name: this.data.first_name.text,
               last_name: this.data.last_name.text,
               address: this.data.address.text,
               cellphone: this.data.cellphone.text,
               cellphone2: this.data.cellphone2.text,
               email: this.data.email.text
            });
            if(response) {
               if(!response.data.error.is_error) {
                  data = response.data.data.data;
               } else {
                  this.$fire({
                     title: "Error",
                     text: this.$t("global.default_error") as string,
                     type: "error"
                  });
                  return;
               }
            } else {
               this.$fire({
                  title: "Error",
                  text: this.$t("global.default_error") as string,
                  type: "error"
               });
               return;
            }
         }

         const vue_this = this;
         let message = "";
         if(this.type === "add")
            message = "The client has been added properly";
         else if(this.type === "update")
            message = "The client has been updated properly";

         window.api.send("client-module-window-dialog", {
            type: this.type,
            message: message
         });
         window.api.receive("client-module-window-dialog-reply", () => {
            window.api.send("client-module-window-close", {
               id: vue_this.id,
               data: data,
               result: "success",
               type: vue_this.type
            });
         });
      },
      onClear() {
         this.clearForm();
      },
      onClose() {
         const vue_this = this;
         window.api.send("client-module-window-close", {
            id: this.id,
            data: null,
            result: "closed",
            type: vue_this.type
         });
      },
      clearForm() {
         this.data.first_name.text = "";
         this.data.first_name.error.is_error = false;
         this.data.first_name.error.message = "";

         this.data.last_name.text = "";
         this.data.last_name.error.is_error = false;
         this.data.last_name.error.message = "";

         this.data.address.text = "";
         this.data.address.error.is_error = false;
         this.data.address.error.message = "";

         this.data.cellphone.text = "";
         this.data.cellphone.error.is_error = false;
         this.data.cellphone.error.message = "";

         this.data.cellphone2.text = "";
         this.data.cellphone2.error.is_error = false;
         this.data.cellphone2.error.message = "";

         this.data.email.text = "";
         this.data.email.error.is_error = false;
         this.data.email.error.message = "";
      },
      /////////////////
      // Blur Events //
      onFirstNameBlur() {
         let value = this.data.first_name.text;
         this.validateFirstName(value);
      },
      onLastNameBlur() {
         let value = this.data.last_name.text;
         this.validateLastName(value);
      },
      onAddressBlur() {
         let value = this.data.address.text;
         this.validateAddress(value);
      },
      onCellphoneBlur() {
         let value = this.data.cellphone.text;
         this.validateCellphone(value);
      },
      // onCellphone2Blur() {
      //    let value = this.data.cellphone2.text;
      //    this.validateCellphone2(value);
      // },
      onEmailBlur() {
         let value = this.data.email.text;
         this.validateEmail(value);
      },
      /////////////////////
      // Keypress Events //
      onFirstNameKeyup(e) {
         let value = this.data.first_name.text;
         this.validateFirstName(value);
         this.enterKeyNavigation(e, "last-name", "");
      },
      onLastNameKeyup(e) {
         let value = this.data.last_name.text;
         this.validateLastName(value);
         this.enterKeyNavigation(e, "address", "first-name");
      },
      onAddressKeyup(e) {
         let value = this.data.address.text;
         this.validateAddress(value);
         this.enterKeyNavigation(e, "cellphone", "last-name");
      },
      onCellphoneKeyup(e) {
         let value = this.data.cellphone.text;
         this.validateCellphone(value);
         this.enterKeyNavigation(e, "cellphone2", "address");
      },
      // onCellphone2Keyup(e) {
      //    let value = this.data.cellphone2.text;
      //    this.validateCellphone2(value);
      //    this.enterKeyNavigation(e, "email", "cellphone");
      // },
      onEmailKeyup(e) {
         let value = this.data.email.text;
         this.validateEmail(value);
         this.enterKeyNavigation(e, "add-update-button", "cellphone2");
      },
      ////////////////
      // Validators //
      validateFirstName(firstName:string) {
         let error = false;
         error = this.validateField(firstName, "first_name", "data", () => {
            if(this.data.first_name.text.length <= this.data.first_name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      validateLastName(lastName:string) {
         let error = false;
         error = this.validateField(lastName, "last_name", "data", () => {
            if(this.data.last_name.text.length <= this.data.last_name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      validateAddress(address:string) {
         let error = false;
         error = this.validateField(address, "address", "data", () => {
            if(this.data.address.text.length <= this.data.address.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      validateCellphone(cellphone:string) {
         let error = false;
         error = this.validateField(cellphone, "cellphone", "data", () => {
            if(this.data.cellphone.text.length <= this.data.cellphone.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      // validateCellphone2(cellphone2:string) {
      //    let error = false;
      //    error = this.validateField(cellphone2, "cellphone2", "data", () => {
      //       if(this.data.cellphone2.text.length <= this.data.cellphone2.max_text)
      //          return null;
      //       return "This field has exceeded the length limit";
      //    });
      //    return error;
      // },
      validateEmail(email:string) {
         let error = false;
         error = this.validateField(email, "email", "data", () => {
            if(this.data.email.text.length <= this.data.email.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      ///////////////
      // Functions //
      enterKeyNavigation(e, inputAfter:string, inputBefore:string) {
         if(e.keyCode === 13) {
            if(e.shiftKey) {
               if(inputBefore) {
                  const input = document.getElementById(inputBefore) as any;
                  input.focus();
               }
            } else {
               const input = document.getElementById(inputAfter) as any;
               input.focus();
            }
         }
      }
   }
});
</script>

<style lang="sass" scoped>
   @import "../../assets/scss/loader.scss"
</style>
