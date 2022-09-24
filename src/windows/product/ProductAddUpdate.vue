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
                        v-model="field.code.text"
                        class="counter"
                        :label="t('product.window.field.code') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.code.error.is_error"
                        :error-message="field.code.error.message"
                        @blur="onCodeBlur"
                        @keyup="onCodeKeyup"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.name.text"
                        :label="t('product.window.field.name') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.name.error.is_error"
                        :error-message="field.name.error.message"
                        @blur="onNameBlur"
                        @keyup="onNameKeyup"
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.description.text"
                        :label="t('product.window.field.description') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.description.error.is_error"
                        :error-message="field.description.error.message"
                        @blur="onDescriptionBlur"
                        @keyup="onDescriptionKeyup"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.buy_price.text"
                        :label="t('product.window.field.buy_price') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.buy_price.error.is_error"
                        :error-message="field.buy_price.error.message"
                        @blur="onBuyPriceBlur"
                        @keyup="onBuyPriceKeyup"
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.sale_price.text"
                        :label="t('product.window.field.sale_price') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.sale_price.error.is_error"
                        :error-message="field.sale_price.error.message"
                        @blur="onSalePriceBlur"
                        @keyup="onSalePriceKeyup"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.quantity.text"
                        :label="t('product.window.field.quantity') + ':'"
                        type="text"
                        hint="Valid Email format"
                        bottom-slots
                        :error="field.quantity.error.is_error"
                        :error-message="field.quantity.error.message"
                        @blur="onQuantityBlur"
                        @keyup="onQuantityKeyup"
                     >
                     </q-input>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     class="q-mr-sm"
                     color="primary"
                     :label="(page.id <= 0) ? t('product.window.add.button.add') : t('product.window.update.button.update')"
                     @click="onAddUpdate"
                  >
                  </q-btn>
                  <q-btn
                     class="q-mr-sm"
                     color="info"
                     :label="t('product.window.button.clear')"
                     @click="onClear"
                  >
                  </q-btn>
                  <q-btn
                     color="negative"
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
import axios from "axios";
import { defineComponent, reactive, ref } from "vue";
import { IPCParams, Page, ProductField, ProductResponse, Product } from "@/interfaces/product/product-add-update";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import { validateField, enterKeyNavigation } from "@/plugins/mixins";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "product-add-update-component",
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
      const field = reactive<ProductField>({
         code: {
            text: "",
            max_text: 70,
            error: {
               is_error: false,
               message: ""
            }
         },
         name: {
            text: "",
            max_text: 70,
            error: {
               is_error: false,
               message: ""
            }
         },
         description: {
            text: "",
            max_text: 160,
            error: {
               is_error: false,
               message: ""
            }
         },
         buy_price: {
            text: "",
            max_text: 20,
            error: {
               is_error: false,
               message: ""
            }
         },
         sale_price: {
            text: "",
            max_text: 20,
            error: {
               is_error: false,
               message: ""
            }
         },
         quantity: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         }
      });
      const loaded = ref(false);

      window.api.receive("product-module-window-reply", (data:IPCParams) => {
         page.id = data.id;
         page.type = data.type;
         page.content = data.content;
         if(data.data) {
            field.code.text = data.data.code;
            field.name.text = data.data.name;
            field.description.text = (data.data.description) ? data.data.description : "";
            field.buy_price.text = data.data.buy_price;
            field.sale_price.text = data.data.sale_price;
            field.quantity.text = data.data.quantity.toString();
         }
         loaded.value = true;
      });

      const onAddUpdate = async() => {
         field.code.text = field.code.text.trim();
         field.name.text = field.name.text.trim();
         field.description.text = field.description.text.trim();
         field.buy_price.text = field.buy_price.text.trim();
         field.sale_price.text = field.sale_price.text.trim();
         field.quantity.text = field.quantity.text.trim();

         let code = field.code.text;
         let name = field.name.text;
         // let description = field.description.text;
         let buy_price = field.buy_price.text;
         let sale_price = field.sale_price.text;
         let quantity = field.quantity.text;
         let error_code = false;
         let error_name = false;
         // let error_description = false;
         let error_buy_price = false;
         let error_sale_price = false;
         let error_quantity = false;

         error_code = validateCode(code);
         error_name = validateName(name);
         // error_description = validateDescription(description);
         error_buy_price = validateBuyPrice(buy_price);
         error_sale_price = validateSalePrice(sale_price);
         error_quantity = validateQuantity(quantity);

         if(error_code || error_name || error_buy_price || error_sale_price || error_quantity)
            return;

         let data:Product|null = null;
         if(page.id <= 0) {
            let response = await axios.put<ProductResponse>("product/v3/create.php", {
               code: field.code.text,
               name: field.name.text,
               description: field.description.text,
               buy_price: field.buy_price.text,
               sale_price: field.sale_price.text,
               quantity: field.quantity.text
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
            let response = await axios.post<ProductResponse>("product/v3/update.php", {
               id: page.id,
               code: field.code.text,
               name: field.name.text,
               description: field.description.text,
               buy_price: field.buy_price.text,
               sale_price: field.sale_price.text,
               quantity: field.quantity.text
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
            message = "The product has been added properly";
         else if(page.type === "update")
            message = "The product has been updated properly";
         window.api.send("product-module-window-dialog", {
            type: page.type,
            message: message
         });
         window.api.receive("product-module-window-dialog-reply", () => {
            window.api.send("product-module-window-close", {
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
         window.api.send("product-module-window-close", {
            id: page.id,
            data: null,
            result: "closed",
            type: page.type
         });
      };
      const clearForm = () => {
         field.code.text = "";
         field.code.error.is_error = false;
         field.code.error.message = "";

         field.name.text = "";
         field.name.error.is_error = false;
         field.name.error.message = "";

         field.description.text = "";
         field.description.error.is_error = false;
         field.description.error.message = "";

         field.buy_price.text = "";
         field.buy_price.error.is_error = false;
         field.buy_price.error.message = "";

         field.sale_price.text = "";
         field.sale_price.error.is_error = false;
         field.sale_price.error.message = "";

         field.quantity.text = "";
         field.quantity.error.is_error = false;
         field.quantity.error.message = "";
      };
      /////////////////
      // Blur Events //
      const onCodeBlur = () => {
         let value = field.code.text;
         validateCode(value);
      };
      const onNameBlur = () => {
         let value = field.name.text;
         validateName(value);
      };
      // const onDescriptionBlur = () => {
      //    let value = field.description.text;
      //    validateDescription(value);
      // };
      const onBuyPriceBlur = () => {
         let value = field.buy_price.text;
         validateBuyPrice(value);
      };
      const onSalePriceBlur = () => {
         let value = field.sale_price.text;
         validateSalePrice(value);
      };
      const onQuantityBlur = () => {
         let value = field.quantity.text;
         validateQuantity(value);
      };
      /////////////////////
      // Keypress Events //
      const onCodeKeyup = (e:KeyboardEvent) => {
         let value = field.code.text;
         validateCode(value);
         enterKeyNavigation(e, "last-name", "");
      };
      const onNameKeyup = (e:KeyboardEvent) => {
         let value = field.name.text;
         validateName(value);
         enterKeyNavigation(e, "address", "first-name");
      };
      // const onDescriptionKeyup = (e:KeyboardEvent) => {
      //    let value = field.description.text;
      //    validateDescription(value);
      //    enterKeyNavigation(e, "cellphone", "last-name");
      // };
      const onBuyPriceKeyup = (e:KeyboardEvent) => {
         let value = field.buy_price.text;
         validateBuyPrice(value);
         enterKeyNavigation(e, "cellphone2", "address");
      };
      const onSalePriceKeyup = (e:KeyboardEvent) => {
         let value = field.sale_price.text;
         validateSalePrice(value);
         enterKeyNavigation(e, "email", "cellphone");
      };
      const onQuantityKeyup = (e:KeyboardEvent) => {
         let value = field.quantity.text;
         validateQuantity(value);
         enterKeyNavigation(e, "add-update-button", "cellphone2");
      };
      ////////////////
      // Validators //
      const validateCode = (code:string) => {
         let result = validateField(code, () => {
            if(field.code.text.length <= field.code.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.code.error.is_error = result.error;
         field.code.error.message = result.message;
         return result.error;
      };
      const validateName = (name:string) => {
         let result = validateField(name, () => {
            if(field.name.text.length <= field.name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.name.error.is_error = result.error;
         field.name.error.message = result.message;
         return result.error;
      };
      // const validateDescription = (description:string) => {
      //    let result = validateField(description, () => {
      //       if(field.description.text.length <= field.description.max_text)
      //          return null;
      //       return "This field has exceeded the length limit";
      //    });
      //    field.description.error.is_error = result.error;
      //    field.description.error.message = result.message;
      //    return result.error;
      // };
      const validateBuyPrice = (buy_price:string)  =>{
         let result = validateField(buy_price, () => {
            if(field.buy_price.text.length <= field.buy_price.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.buy_price.error.is_error = result.error;
         field.buy_price.error.message = result.message;
         return result.error;
      };
      const validateSalePrice = (sale_price:string) => {
         let result = validateField(sale_price, () => {
            if(field.sale_price.text.length <= field.sale_price.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.sale_price.error.is_error = result.error;
         field.sale_price.error.message = result.message;
         return result.error;
      };
      const validateQuantity = (quantity:string) => {
         let result = validateField(quantity, () => {
            if(field.quantity.text.length <= field.quantity.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.quantity.error.is_error = result.error;
         field.quantity.error.message = result.message;
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
         onCodeBlur,
         onNameBlur,
         // onDescriptionBlur,
         onBuyPriceBlur,
         onSalePriceBlur,
         onQuantityBlur,
         onCodeKeyup,
         onNameKeyup,
         // onDescriptionKeyup,
         onBuyPriceKeyup,
         onSalePriceKeyup,
         onQuantityKeyup,
      }
   }
});
</script>

<style lang="sass" scoped></style>
