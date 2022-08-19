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
                  p Delete Client
            template(#subtitle) The clients that will be deleted from the system
         Content
            template(#content)
               div(v-if="id > 0" class="form-group row")
                  label(class="col-sm-2 col-form-label") ID
                  div(class="col-sm-2")
                     input(
                        v-model="id"
                        type="text"
                        class="form-control"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") First Name
                  div(class="col-sm-4")
                     input(
                        v-model="first_name"
                        type="text"
                        class="form-control counter"
                        placeholder="Enter first name"
                        disabled
                     )
                  label(class="col-sm-2 col-form-label") Last Name
                  div(class="col-sm-4")
                     input(
                        v-model="last_name"
                        type="text"
                        class="form-control"
                        placeholder="Enter last name"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") Address
                  div(class="col-sm-4")
                     input(
                        v-model="address"
                        type="text"
                        class="form-control"
                        placeholder="Enter address"
                        disabled
                     )
                  label(class="col-sm-2 col-form-label") Cellphone
                  div(class="col-sm-4")
                     input(
                        v-model="cellphone"
                        type="text"
                        class="form-control"
                        placeholder="Enter cellphone"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") Cellphone 2
                  div(class="col-sm-4")
                     input(
                        v-model="cellphone2"
                        type="text"
                        class="form-control"
                        placeholder="Enter cellphone 2"
                        disabled
                     )
                  label(class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(
                        v-model="email"
                        type="text"
                        class="form-control"
                        placeholder="Enter email"
                        disabled
                     )
               div.text-center
                  button( type="submit" class="btn btn-danger text-center mr-2" @click="onDelete") Delete
                  button(type="clear" class="btn btn-info text-center" @click="onClose") Close
</template>

<script lang="ts">
import Vue from "vue";
import mixins from "vue-typed-mixins";
import defaultMixin from "../../plugins/mixins";
import { Props, IPCParams, AxiosResponse } from "../../interfaces/client/client-delete";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default mixins(defaultMixin).extend({
   name: "client-delete-component",
   mixins: [defaultMixin],
   components: {
      Banner,
      Menu,
      Content
   },
   data() {
      return {
         id: -1,
         first_name: "",
         last_name: "",
         address: "",
         cellphone: "",
         cellphone2: "",
         email: "",
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("client-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         if(data.data) {
            vue_this.first_name = data.data.first_name;
            vue_this.last_name = data.data.last_name;
            vue_this.address = data.data.address;
            vue_this.cellphone = data.data.cellphone;
            vue_this.cellphone2 = (data.data.cellphone2) ? data.data.cellphone2 : "";
            vue_this.email = data.data.email;
         }
         vue_this.loaded = true;
      });
   },
   methods: {
      async onDelete() {
         let response:AxiosResponse = await Vue.prototype.$http.delete("client/v3/delete.php", {
            type: "id",
            value: this.id
         });
         if(response) {
            if(response.data.error.is_error) {
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

         const vue_this = this;
         window.api.send("client-module-window-dialog", this.id);
         window.api.receive("client-module-window-dialog-reply", () => {
            window.api.send("client-module-window-close", {
               id: vue_this.id,
               data: null,
               result: "success",
               type: "delete"
            });
         });
      },
      onClose() {
         window.api.send("client-module-window-close", {
            id: this.id,
            data: null,
            result: "closed",
            type: "delete"
         });
      },
   }
});
</script>

<style lang="sass" scoped>
   @import "../../assets/scss/loader.scss"
</style>
