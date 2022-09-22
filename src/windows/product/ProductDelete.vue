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
               <p>{{ $t("product.window.delete.title") }}</p>
            </template>
            <template #subtitle>{{ $t("product.window.delete.subtitle") }}</template>
         </Menu>
         <Content>
            <template #content>
               <div v-if="id &gt; 0" class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.id") }}:</label>
                  <div class="col-sm-2">
                     <input v-model="id" class="form-control" type="text" disabled="disabled" />
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.code") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="code" class="form-control counter" type="text" placeholder="Enter code" disabled="disabled" />
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.name") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="name" class="form-control" type="text" placeholder="Enter name" disabled="disabled" />
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.description") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="description" class="form-control" type="text" placeholder="Enter description" disabled="disabled" />
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.buy_price") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="buy_price" class="form-control" type="text" placeholder="Enter buy price" disabled="disabled" />
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.sale_price") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="sale_price" class="form-control" type="text" placeholder="Enter sale price" disabled="disabled" />
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.quantity") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="quantity" class="form-control" type="text" placeholder="Enter quantity" disabled="disabled" />
                  </div>
               </div>
               <div class="text-center">
                  <button
                     class="btn btn-danger text-center mr-2"
                     type="submit"
                     @click="onDelete"
                  >
                     {{ $t("product.window.delete.button.delete") }}
                  </button>
                  <button
                     class="btn btn-info text-center"
                     type="clear"
                     @click="onClose"
                  >
                     {{ $t("product.window.button.close") }}
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
import { Props, IPCParams } from "../../interfaces/product/product-delete";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default defineComponent({
   name: "product-delete-component",
   components: {
      Banner,
      Menu,
      Content
   },
   mixins: [defaultMixin],
   data() {
      return {
         id: -1,
         code: "",
         name: "",
         description: "",
         buy_price: "",
         sale_price: "",
         quantity: "",
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("product-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         if(data.data) {
            vue_this.code = data.data.code;
            vue_this.name = data.data.name;
            vue_this.description = data.data.description;
            vue_this.buy_price = data.data.buy_price;
            vue_this.sale_price = data.data.sale_price;
            vue_this.quantity = data.data.quantity.toString();
         }
         vue_this.loaded = true;
      });
   },
   methods: {
      async onDelete() {
         let response = await Vue.prototype.$http.delete("product/v3/delete.php", {
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
         window.api.send("product-module-window-dialog", {
            type: "delete",
            message: "The product has been deleted properly"
         });
         window.api.receive("product-module-window-dialog-reply", () => {
            window.api.send("product-module-window-close", {
               id: vue_this.id,
               data: null,
               result: "success",
               type: "delete"
            });
         });
      },
      onClose() {
         window.api.send("product-module-window-close", {
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
