<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("product.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ t("product.window.see.subtitle") }}</template>
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
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n/index";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { Product, IPCParams } from "@/interfaces/product/product";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "product-see-component",
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
         id_category: -1,
         id_branch: -1,
         category: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            id_branch: -1,
            branch: {
               id: -1,
               is_active: -1,
               created: "",
               updated: "",
               name: "",
               telephone: "",
               address: "",
               machine_id: "",
               mac_address: "",
            }
         }
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
            product.id_category = data.data.id_category;
            product.id_branch = data.data.id_branch;
            product.category = data.data.category;
         }
         loaded.value = true;
      });

      const onClose = () => {
         window.api.send("product-module-window-close", {
            id: product.id,
            data: null,
            result: "closed",
            type: "see"
         });
      }

      return {
         t,
         product,
         loaded,
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
