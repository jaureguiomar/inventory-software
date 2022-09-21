<template>
   <transition-group name="list" tag="div">
      <div class="spinner-loader" v-if="!loaded" key="loader">
         <div class="spinner-loader-container">
            <div class="spinner-ripple-loader">
               <div class="spinner-ripple-loader-container">
                  <div></div>
                  <div></div>
               </div>
            </div>
         </div>
      </div>

      <div class="main-container" v-if="loaded" key="content">
         <Banner />
         <Menu>
            <template #left-content>
               <p>{{ $t("client.window.delete.title") }}</p>
            </template>
            <template #subtitle>{{ $t("client.window.delete.subtitle") }}</template>
         </Menu>
         <Content>
            <template #content>
               <div class="form-group row" v-if="id &gt; 0">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.id") }}:</label>
                  <div class="col-sm-2">
                     <input class="form-control" v-model="id" type="text" disabled="disabled"/>
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.first_name") }}:</label>
                  <div class="col-sm-4">
                     <input class="form-control counter" v-model="first_name" type="text" placeholder="Enter first name" disabled="disabled"/>
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.last_name") }}:</label>
                  <div class="col-sm-4">
                     <input class="form-control" v-model="last_name" type="text" placeholder="Enter last name" disabled="disabled"/>
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.address") }}:</label>
                  <div class="col-sm-4">
                     <input class="form-control" v-model="address" type="text" placeholder="Enter address" disabled="disabled"/>
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.cellphone") }}:</label>
                  <div class="col-sm-4">
                     <input class="form-control" v-model="cellphone" type="text" placeholder="Enter cellphone" disabled="disabled"/>
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.cellphone2") }}:</label>
                  <div class="col-sm-4">
                     <input class="form-control" v-model="cellphone2" type="text" placeholder="Enter cellphone 2" disabled="disabled"/>
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.email") }}:</label>
                  <div class="col-sm-4">
                     <input class="form-control" v-model="email" type="text" placeholder="Enter email" disabled="disabled"/>
                  </div>
               </div>
               <div class="text-center">
                  <button
                     class="btn btn-danger text-center mr-2"
                     type="submit"
                     @click="onDelete"
                  >
                     {{ $t("client.window.delete.button.delete") }}
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
import { Props, IPCParams } from "../../interfaces/client/client-delete";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default defineComponent({
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
         let response = await Vue.prototype.$http.delete("client/v3/delete.php", {
            params: {
               field: "id",
               data: this.id
            },
         });
         if(response) {
            if(response.data.error.is_error) {
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

         const vue_this = this;
         window.api.send("client-module-window-dialog", {
            type: "delete",
            message: "The client has been deleted properly"
         });
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
