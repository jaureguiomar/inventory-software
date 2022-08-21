<template lang="pug">
   transition-group(name="list" tag="div")
      div(v-if="!loaded" key="loader" class="spinner-loader")
         div(class="spinner-loader-container")
            div(class="spinner-ripple-loader")
               div(class="spinner-ripple-loader-container")
                  div
                  div

      div.main-container(v-if="loaded" key="content")
         Banner
         Menu
            template(#left-content)
               p {{ content.title }}
            template(#subtitle) {{ content.description }}
         Content
            template(#content)
               div(v-if="id > 0" class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("supplier.window.field.id") }}:
                  div(class="col-sm-2")
                     input(v-model="id" type="text" class="form-control" disabled)
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("supplier.window.field.name") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="data.name.text"
                        v-focus
                        id="name"
                        type="text"
                        class="form-control counter"
                        placeholder="Enter name"
                        @blur="onNameBlur"
                        @keyup="onNameKeyup"
                        :class="{ 'is-invalid': data.name.error.is_error }"
                     )
                     span(
                        class="badge text-counter"
                        :class="{ 'badge-primary': data.name.text.length <= data.name.max_text, 'badge-danger': data.name.text.length > data.name.max_text, 'error': data.name.error.is_error }"
                     ) {{ data.name.text.length }}/{{ data.name.max_text }}
                     div(v-if="data.name.error.is_error" class="invalid-feedback text-left") {{ data.name.error.message }}

               //-    label(class="col-sm-2 col-form-label") {{ $t("supplier.window.field.last_name") }}:
               //-    div(class="col-sm-4")
               //-       input(
               //-          v-model="data.last_name.text"
               //-          id="last-name"
               //-          type="text"
               //-          class="form-control"
               //-          placeholder="Enter last name"
               //-          @blur="onLastNameBlur"
               //-          @keyup="onLastNameKeyup"
               //-          :class="{ 'is-invalid': data.last_name.error.is_error }"
               //-       )
               //-       span(
               //-          class="badge text-counter"
               //-          :class="{ 'badge-primary': data.last_name.text.length <= data.last_name.max_text, 'badge-danger': data.last_name.text.length > data.last_name.max_text, 'error': data.last_name.error.is_error }"
               //-       ) {{ data.last_name.text.length }}/{{ data.last_name.max_text }}
               //-       div(v-if="data.last_name.error.is_error" class="invalid-feedback text-left") {{ data.last_name.error.message }}

               //- div(class="form-group row")
               //-    label(class="col-sm-2 col-form-label") {{ $t("supplier.window.field.address") }}:
               //-    div(class="col-sm-4")
               //-       input(
               //-          v-model="data.address.text"
               //-          id="address"
               //-          type="text"
               //-          class="form-control"
               //-          placeholder="Enter address"
               //-          @blur="onAddressBlur"
               //-          @keyup="onAddressKeyup"
               //-          :class="{ 'is-invalid': data.address.error.is_error }"
               //-       )
               //-       span(
               //-          class="badge text-counter"
               //-          :class="{ 'badge-primary': data.address.text.length <= data.address.max_text, 'badge-danger': data.address.text.length > data.address.max_text, 'error': data.address.error.is_error }"
               //-       ) {{ data.address.text.length }}/{{ data.address.max_text }}
               //-       div(v-if="data.address.error.is_error" class="invalid-feedback text-left") {{ data.address.error.message }}

               //-    label(class="col-sm-2 col-form-label") {{ $t("supplier.window.field.cellphone") }}:
               //-    div(class="col-sm-4")
               //-       input(
               //-          v-model="data.cellphone.text"
               //-          id="cellphone"
               //-          type="text"
               //-          class="form-control"
               //-          placeholder="Enter cellphone"
               //-          @blur="onCellphoneBlur"
               //-          @keyup="onCellphoneKeyup"
               //-          :class="{ 'is-invalid': data.cellphone.error.is_error }"
               //-       )
               //-       span(
               //-          class="badge text-counter"
               //-          :class="{ 'badge-primary': data.cellphone.text.length <= data.cellphone.max_text, 'badge-danger': data.cellphone.text.length > data.cellphone.max_text, 'error': data.cellphone.error.is_error }"
               //-       ) {{ data.cellphone.text.length }}/{{ data.cellphone.max_text }}
               //-       div(v-if="data.cellphone.error.is_error" class="invalid-feedback text-left") {{ data.cellphone.error.message }}

               //- div(class="form-group row")
               //-    label(class="col-sm-2 col-form-label") {{ $t("supplier.window.field.cellphone2") }}:
               //-    div(class="col-sm-4")
               //-       input(
               //-          v-model="data.cellphone2.text"
               //-          id="cellphone2"
               //-          type="text"
               //-          class="form-control"
               //-          placeholder="Enter cellphone 2"
               //-          :class="{ 'is-invalid': data.cellphone2.error.is_error }"
               //-       )
               //-       span(
               //-          class="badge text-counter"
               //-          :class="{ 'badge-primary': data.cellphone2.text.length <= data.cellphone2.max_text, 'badge-danger': data.cellphone2.text.length > data.cellphone2.max_text, 'error': data.cellphone2.error.is_error }"
               //-       ) {{ data.cellphone2.text.length }}/{{ data.cellphone2.max_text }}
               //-       div(v-if="data.cellphone2.error.is_error" class="invalid-feedback text-left") {{ data.cellphone2.error.message }}

               //-    label(class="col-sm-2 col-form-label") {{ $t("supplier.window.field.email") }}:
               //-    div(class="col-sm-4")
               //-       input(
               //-          v-model="data.email.text"
               //-          id="email"
               //-          type="text"
               //-          class="form-control"
               //-          placeholder="Enter email"
               //-          @blur="onEmailBlur"
               //-          @keyup="onEmailKeyup"
               //-          :class="{ 'is-invalid': data.email.error.is_error }"
               //-       )
               //-       span(
               //-          class="badge text-counter"
               //-          :class="{ 'badge-primary': data.email.text.length <= data.email.max_text, 'badge-danger': data.email.text.length > data.email.max_text, 'error': data.email.error.is_error }"
               //-       ) {{ data.email.text.length }}/{{ data.email.max_text }}
               //-       div(v-if="data.email.error.is_error" class="invalid-feedback text-left") {{ data.email.error.message }}

               div.text-center
                  button(id="add-update-button" type="submit" class="btn btn-primary text-center mr-2" @click="onAddUpdate") {{ (id <= 0) ? $t("supplier.window.add.button.add") : $t("supplier.window.update.button.update") }}
                  button(type="clear" class="btn btn-danger text-center mr-2" @click="onClear") {{ $t("supplier.window.button.clear") }}
                  button(type="clear" class="btn btn-info text-center" @click="onClose") {{ $t("supplier.window.button.close") }}
</template>

<script lang="ts">
import Vue from "vue";
import mixins from "vue-typed-mixins";
import defaultMixin from "../../plugins/mixins";
import { Props, IPCParams, AxiosResponse, Supplier } from "../../interfaces/supplier/supplier-add-update";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default mixins(defaultMixin).extend({
   name: "supplier-add-update-component",
   mixins: [defaultMixin],
   components: {
      Banner,
      Menu,
      Content
   },
   data() {
      return {
         id: -1,
         type: "",
         content: {
            title: "",
            description: ""
         },
         data: {
            name: {
               text: "",
               max_text: 70,
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
      window.api.receive("supplier-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         vue_this.type = data.type;
         vue_this.content = data.content;
         if(data.data)
            vue_this.data.name.text = data.data.name;
         vue_this.loaded = true;
      });
   },
   methods: {
      async onAddUpdate() {
         this.data.name.text = this.data.name.text.trim();
         let name = this.data.name.text;
         let error_name = false;

         error_name = this.validateName(name);
         if(error_name)
            return;

         let data:Supplier|null = null;
         if(this.id <= 0) {
            let response:AxiosResponse = await Vue.prototype.$http.put("supplier/v3/create.php", {
               name: this.data.name.text
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
            let response:AxiosResponse = await Vue.prototype.$http.post("supplier/v3/update.php", {
               id: this.id,
               name: this.data.name.text,
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
            message = "The supplier has been added properly";
         else if(this.type === "update")
            message = "The supplier has been updated properly";

         window.api.send("supplier-module-window-dialog", {
            type: this.type,
            message: message
         });
         window.api.receive("supplier-module-window-dialog-reply", () => {
            window.api.send("supplier-module-window-close", {
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
         window.api.send("supplier-module-window-close", {
            id: this.id,
            data: null,
            result: "closed",
            type: vue_this.type
         });
      },
      clearForm() {
         this.data.name.text = "";
         this.data.name.error.is_error = false;
         this.data.name.error.message = "";
      },
      /////////////////
      // Blur Events //
      onNameBlur() {
         let value = this.data.name.text;
         this.validateName(value);
      },
      /////////////////////
      // Keypress Events //
      onNameKeyup(e) {
         let value = this.data.name.text;
         this.validateName(value);
         this.enterKeyNavigation(e, "add-update-button", "");
      },
      ////////////////
      // Validators //
      validateName(name:string) {
         let error = false;
         error = this.validateField(name, "name", "data", () => {
            if(this.data.name.text.length <= this.data.name.max_text)
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
