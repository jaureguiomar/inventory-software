<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("product.window.delete.title") }}</p>
            </template>
            <template #subtitle>{{ t("product.window.delete.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="product.id > 0"
                        v-model="product.id"
                        :label="t('product.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="product.created"
                        :label="t('product.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="product.updated"
                        :label="t('product.window.field.updated') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="product.code"
                        :label="t('product.window.field.code') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="product.name"
                        :label="t('product.window.field.name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="product.description"
                        :label="t('product.window.field.description') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="product.buy_price"
                        :label="t('product.window.field.buy_price') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="product.sale_price"
                        :label="t('product.window.field.sale_price') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="product.quantity"
                        :label="t('product.window.field.quantity') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="product.category.name"
                        :label="t('product.window.field.category_name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     class="q-mr-sm"
                     color="negative"
                     :label="t('product.window.delete.button.delete')"
                     @click="onDelete"
                  >
                  </q-btn>
                  <q-btn
                     color="primary"
                     :label="t('product.window.button.close')"
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
import { defineComponent, ref, reactive } from "vue";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { getFormattedDateString } from "@/plugins/mixins";
import { Product, ProductResponse, IPCParams } from "@/interfaces/product/product";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "product-delete-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const product = reactive<Product>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         code: "",
         name: "",
         description: "",
         buy_price: "",
         sale_price: "",
         quantity: 0,
         category: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
         },
         category_id: -1,
      });
      const loaded = ref(false);

      window.api.receive("product-module-window-reply", (data:IPCParams) => {
         product.id = data.id;
         if(data.data) {
            product.id = data.data.id;
            product.is_active = data.data.is_active;
            product.created = getFormattedDateString(data.data.created);
            product.updated = getFormattedDateString(data.data.updated);
            product.code = data.data.code;
            product.name = data.data.name;
            product.description = (data.data.description) ? data.data.description : "";
            product.buy_price = data.data.buy_price;
            product.sale_price = data.data.sale_price;
            product.quantity = data.data.quantity;
            product.category = data.data.category;
            product.category_id = data.data.category_id;
         }
         loaded.value = true;
      });

      const onDelete = async() => {
         let response = await axios.delete<ProductResponse>("product/v3/delete.php", {
            params: {
               field: "id",
               data: product.id
            },
         });
         if(response) {
            if(response.data.error.is_error) {
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

         window.api.send("product-module-window-dialog", {
            type: "delete",
            message: "The product has been deleted properly"
         });
         window.api.receive("product-module-window-dialog-reply", () => {
            window.api.send("product-module-window-close", {
               id: product.id,
               data: null,
               result: "success",
               type: "delete"
            });
         });
      };

      const onClose = () => {
         window.api.send("product-module-window-close", {
            id: product.id,
            data: null,
            result: "closed",
            type: "delete"
         });
      };

      return {
         t,
         product,
         loaded,
         onDelete,
         onClose
      }
   }
});
</script>

<style lang="sass" scoped></style>
