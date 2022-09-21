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
               <p>{{ $t("supplier.window.delete.title") }}</p>
            </template>
            <template #subtitle>{{ $t("supplier.window.delete.subtitle") }}</template>
         </Menu>
         <Content>
            <template #content>
               <div class="form-group row" v-if="id &gt; 0">
                  <label class="col-sm-2 col-form-label">{{ $t("supplier.window.field.id") }}:</label>
                  <div class="col-sm-2">
                     <input class="form-control" v-model="id" type="text" disabled="disabled"/>
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("supplier.window.field.name") }}:</label>
                  <div class="col-sm-4">
                     <input class="form-control counter" v-model="name" type="text" placeholder="Enter first name" disabled="disabled"/>
                  </div>
               </div>
               <div class="text-center">
                  <button
                     class="btn btn-danger text-center mr-2"
                     type="submit"
                     @click="onDelete"
                  >
                     {{ $t("supplier.window.delete.button.delete") }}
                  </button>
                  <button
                     class="btn btn-info text-center"
                     type="clear"
                     @click="onClose"
                  >
                     {{ $t("supplier.window.button.close") }}
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
import { Props, IPCParams } from "../../interfaces/supplier/supplier-delete";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default defineComponent({
   name: "supplier-delete-component",
   mixins: [defaultMixin],
   components: {
      Banner,
      Menu,
      Content
   },
   data() {
      return {
         id: -1,
         name: "",
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("supplier-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         if(data.data) {
            vue_this.name = data.data.name;
         }
         vue_this.loaded = true;
      });
   },
   methods: {
      async onDelete() {
         let response = await Vue.prototype.$http.delete("supplier/v3/delete.php", {
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
         window.api.send("supplier-module-window-dialog", {
            type: "delete",
            message: "The supplier has been deleted properly"
         });
         window.api.receive("supplier-module-window-dialog-reply", () => {
            window.api.send("supplier-module-window-close", {
               id: vue_this.id,
               data: null,
               result: "success",
               type: "delete"
            });
         });
      },
      onClose() {
         window.api.send("supplier-module-window-close", {
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
