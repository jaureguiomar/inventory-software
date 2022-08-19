<template lang="pug">
   transition-group(name="list" tag="div")
      div(v-if="!loaded" key="loader" class="spinner-loader")
         div(class="spinner-loader-container")
            div(class="spinner-ripple-loader")
               div(class="spinner-ripple-loader-container")
                  div
                  div

      div.main-container(v-if="loaded" key="content")
         div.banner
            div.logo Inventory
            div.text System
         div.menu
            div.title {{ content.title }}
            div.subtitle {{ content.description }}
         div.content
            div.border-top
            div.content-container
               div(v-if="id > 0" class="form-group row")
                  label(class="col-sm-2 col-form-label") ID
                  div(class="col-sm-2")
                     input(v-model="id" type="text" class="form-control" disabled)
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") First Name
                  div(class="col-sm-4")
                     input(
                        v-model="data.first_name.text"
                        v-focus
                        id="first-name"
                        type="text"
                        class="form-control counter"
                        placeholder="Enter first name"
                        @blur="onFirstNameBlur"
                        @keyup="onFirstNameKeyup"
                        :class="{ 'is-invalid': data.first_name.error.is_error }"
                     )
                     span(
                        class="badge text-counter"
                        :class="{ 'badge-primary': data.first_name.text.length <= data.first_name.max_text, 'badge-danger': data.first_name.text.length > data.first_name.max_text, 'error': data.first_name.error.is_error }"
                     ) {{ data.first_name.text.length }}/{{ data.first_name.max_text }}
                     div(v-if="data.first_name.error.is_error" class="invalid-feedback text-left") {{ data.first_name.error.message }}

                  label(class="col-sm-2 col-form-label") Last Name
                  div(class="col-sm-4")
                     input(
                        v-model="data.last_name.text"
                        id="last-name"
                        type="text"
                        class="form-control"
                        placeholder="Enter last name"
                        @blur="onLastNameBlur"
                        @keyup="onLastNameKeyup"
                        :class="{ 'is-invalid': data.last_name.error.is_error }"
                     )
                     span(
                        class="badge text-counter"
                        :class="{ 'badge-primary': data.last_name.text.length <= data.last_name.max_text, 'badge-danger': data.last_name.text.length > data.last_name.max_text, 'error': data.last_name.error.is_error }"
                     ) {{ data.last_name.text.length }}/{{ data.last_name.max_text }}
                     div(v-if="data.last_name.error.is_error" class="invalid-feedback text-left") {{ data.last_name.error.message }}

               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") Address
                  div(class="col-sm-4")
                     input(
                        v-model="data.address.text"
                        id="address"
                        type="text"
                        class="form-control"
                        placeholder="Enter address"
                        @blur="onAddressBlur"
                        @keyup="onAddressKeyup"
                        :class="{ 'is-invalid': data.address.error.is_error }"
                     )
                     span(
                        class="badge text-counter"
                        :class="{ 'badge-primary': data.address.text.length <= data.address.max_text, 'badge-danger': data.address.text.length > data.address.max_text, 'error': data.address.error.is_error }"
                     ) {{ data.address.text.length }}/{{ data.address.max_text }}
                     div(v-if="data.address.error.is_error" class="invalid-feedback text-left") {{ data.address.error.message }}

                  label(class="col-sm-2 col-form-label") Cellphone
                  div(class="col-sm-4")
                     input(
                        v-model="data.cellphone.text"
                        id="cellphone"
                        type="text"
                        class="form-control"
                        placeholder="Enter cellphone"
                        @blur="onCellphoneBlur"
                        @keyup="onCellphoneKeyup"
                        :class="{ 'is-invalid': data.cellphone.error.is_error }"
                     )
                     span(
                        class="badge text-counter"
                        :class="{ 'badge-primary': data.cellphone.text.length <= data.cellphone.max_text, 'badge-danger': data.cellphone.text.length > data.cellphone.max_text, 'error': data.cellphone.error.is_error }"
                     ) {{ data.cellphone.text.length }}/{{ data.cellphone.max_text }}
                     div(v-if="data.cellphone.error.is_error" class="invalid-feedback text-left") {{ data.cellphone.error.message }}

               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") Cellphone 2
                  div(class="col-sm-4")
                     input(
                        v-model="data.cellphone2.text"
                        id="cellphone2"
                        type="text"
                        class="form-control"
                        placeholder="Enter cellphone 2"
                        :class="{ 'is-invalid': data.cellphone2.error.is_error }"
                     )
                     span(
                        class="badge text-counter"
                        :class="{ 'badge-primary': data.cellphone2.text.length <= data.cellphone2.max_text, 'badge-danger': data.cellphone2.text.length > data.cellphone2.max_text, 'error': data.cellphone2.error.is_error }"
                     ) {{ data.cellphone2.text.length }}/{{ data.cellphone2.max_text }}
                     div(v-if="data.cellphone2.error.is_error" class="invalid-feedback text-left") {{ data.cellphone2.error.message }}

                  label(class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(
                        v-model="data.email.text"
                        id="email"
                        type="text"
                        class="form-control"
                        placeholder="Enter email"
                        @blur="onEmailBlur"
                        @keyup="onEmailKeyup"
                        :class="{ 'is-invalid': data.email.error.is_error }"
                     )
                     span(
                        class="badge text-counter"
                        :class="{ 'badge-primary': data.email.text.length <= data.email.max_text, 'badge-danger': data.email.text.length > data.email.max_text, 'error': data.email.error.is_error }"
                     ) {{ data.email.text.length }}/{{ data.email.max_text }}
                     div(v-if="data.email.error.is_error" class="invalid-feedback text-left") {{ data.email.error.message }}

               div.text-center
                  button(id="add-update-button" type="submit" class="btn btn-primary text-center mr-2" @click="onAddUpdate") {{ (id <= 0) ? "Add" : "Update" }}
                  button(type="clear" class="btn btn-danger text-center mr-2" @click="onClear") Clear
                  button(type="clear" class="btn btn-info text-center" @click="onClose") Close
</template>

<script lang="ts">
import Vue from "vue";
import mixins from "vue-typed-mixins";
import defaultMixin from "../plugins/mixins";
import { Props, IPCParams, AxiosResponse, Client } from "../interfaces/client/client-add-update";

export default mixins(defaultMixin).extend({
   name: "client-add-update-component",
   mixins: [defaultMixin],
   data() {
      return {
         id: -1,
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
      window.api.receive("client-add-update-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
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
                  // vue_this.$fire({
                  //    title: "Error",
                  //    text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
                  //    type: "error"
                  // });
                  // return;
               }
            } else {
               // vue_this.$fire({
               //    title: "Error",
               //    text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
               //    type: "error"
               // });
               // return;
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
                  // vue_this.$fire({
                  //    title: "Error",
                  //    text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
                  //    type: "error"
                  // });
                  // return;
               }
            } else {
               // vue_this.$fire({
               //    title: "Error",
               //    text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
               //    type: "error"
               // });
               // return;
            }
         }

         const vue_this = this;
         window.api.send("client-add-update-window-dialog", this.id);
         window.api.receive("client-add-update-window-dialog-reply", () => {
            let type = "create";
            if(vue_this.id > 0)
               type = "update";

            window.api.send("client-add-update-window-close", {
               id: vue_this.id,
               data: data,
               result: "success",
               type: type
            });
         });
      },
      onClear() {
         this.clearForm();
      },
      onClose() {
         let type = "create";
         if(this.id > 0)
            type = "update";

         window.api.send("client-add-update-window-close", {
            id: this.id,
            data: null,
            result: "closed",
            type: type
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
      validateCellphone2(cellphone2:string) {
         let error = false;
         error = this.validateField(cellphone2, "cellphone2", "data", () => {
            if(this.data.cellphone2.text.length <= this.data.cellphone2.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
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
   @import "../assets/scss/loader.scss"

   .list-enter-active, .list-leave-active
      transition: all 0.3s ease
   .list-enter-from, .list-leave-to
      opacity: 0

   .main-container
      width: 100%
      height: 100vh
      display: block
      padding: 16px
      background: #5cdb94
      .banner
         width: 100%
         height: auto
         display: block
         background: #05386b
         color: #edf5e1
         padding: 40px
         border-radius: 10px
         display: flex
         flex-direction: row
         align-items: center
         font-size: 26px
         font-weight: bold
         margin-bottom: 10px
         transition: 0.3s
         &:hover
            box-shadow: 5px 5px #379683
         .logo
            background: #5cdb94
            color: #edf5e1
            padding: 20px
            border-radius: 10px
            margin-right: 20px
            transition: 0.3s
            &:hover
               cursor: pointer
               background: #05386b
      .menu
         width: 100%
         height: auto
         display: block
         background: #edf5e1
         border-radius: 10px
         padding: 20px 40px
         margin-bottom: 10px
         transition: 0.3s
         &:hover
            box-shadow: 5px 5px #379683
         .title
            font-size: 26px
            font-weight: bold
            color: #edf5e1
            border-radius: 4px
            transition: 0.3s
            background: linear-gradient(to left, #5cdb94 50%, #05386b 50%) right
            background-size: 200%
            transition: .5s ease-out
            &:hover
               background-position: left
         .subtitle
            font-size: 19px
            color: #05386b
      .content
         width: 100%
         height: auto
         display: block
         background: #edf5e1
         border-radius: 10px
         transition: 0.3s
         &:hover
            box-shadow: 5px 5px #379683
         label
            color: #05386b
            font-weight: bold
         .border-top
            background: #05386b
            height: 20px
            border-start-start-radius: 10px
            border-start-end-radius: 10px
         .content-container
            padding: 40px 36px
</style>
