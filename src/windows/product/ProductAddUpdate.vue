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
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.id") }}:</label>
                  <div class="col-sm-2">
                     <input v-model="id" class="form-control" type="text" disabled="disabled" />
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.code") }}:</label>
                  <div class="col-sm-4">
                     <input id="code" v-model="data.code.text" v-focus="v-focus" class="form-control counter" type="text" placeholder="Enter code" :class="{ 'is-invalid': data.code.error.is_error }" @blur="onCodeBlur" @keyup="onCodeKeyup" />
                     <div v-if="data.code.error.is_error" class="invalid-feedback text-left">{{ data.code.error.message }}</div>
                     <BadgeCounter :value="data.code.text" :maxText="data.code.max_text" :isError="data.code.error.is_error"></BadgeCounter>
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.name") }}:</label>
                  <div class="col-sm-4">
                     <input id="name" v-model="data.name.text" class="form-control" type="text" placeholder="Enter name" :class="{ 'is-invalid': data.name.error.is_error }" @blur="onNameBlur" @keyup="onNameKeyup" />
                     <div v-if="data.name.error.is_error" class="invalid-feedback text-left">{{ data.name.error.message }}</div>
                     <BadgeCounter :value="data.name.text" :maxText="data.name.max_text" :isError="data.name.error.is_error"></BadgeCounter>
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.description") }}:</label>
                  <div class="col-sm-4">
                     <input id="description" v-model="data.description.text" class="form-control" type="text" placeholder="Enter description" :class="{ 'is-invalid': data.description.error.is_error }" @blur="onDescriptionBlur" @keyup="onDescriptionKeyup" />
                     <div v-if="data.description.error.is_error" class="invalid-feedback text-left">{{ data.description.error.message }}</div>
                     <BadgeCounter :value="data.description.text" :maxText="data.description.max_text" :isError="data.description.error.is_error"></BadgeCounter>
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.buy_price") }}:</label>
                  <div class="col-sm-4">
                     <input id="buy-price" v-model="data.buy_price.text" class="form-control" type="text" placeholder="Enter buy price" :class="{ 'is-invalid': data.buy_price.error.is_error }" @blur="onBuyPriceBlur" @keyup="onBuyPriceKeyup" />
                     <div v-if="data.buy_price.error.is_error" class="invalid-feedback text-left">{{ data.buy_price.error.message }}</div>
                     <BadgeCounter :value="data.buy_price.text" :maxText="data.buy_price.max_text" :isError="data.buy_price.error.is_error"></BadgeCounter>
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.sale_price") }}:</label>
                  <div class="col-sm-4">
                     <input id="sale-price" v-model="data.sale_price.text" class="form-control" type="text" placeholder="Enter cellphone 2" :class="{ 'is-invalid': data.sale_price.error.is_error }" @blur="onSalePriceBlur" @keyup="onSalePriceKeyup" />
                     <div v-if="data.sale_price.error.is_error" class="invalid-feedback text-left">{{ data.sale_price.error.message }}</div>
                     <BadgeCounter :value="data.sale_price.text" :maxText="data.sale_price.max_text" :isError="data.sale_price.error.is_error"></BadgeCounter>
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("product.window.field.quantity") }}:</label>
                  <div class="col-sm-4">
                     <input id="quantity" v-model="data.quantity.text" class="form-control" type="text" placeholder="Enter quantity" :class="{ 'is-invalid': data.quantity.error.is_error }" @blur="onQuantityBlur" @keyup="onQuantityKeyup" />
                     <div v-if="data.quantity.error.is_error" class="invalid-feedback text-left">{{ data.quantity.error.message }}</div>
                     <BadgeCounter :value="data.quantity.text" :maxText="data.quantity.max_text" :isError="data.quantity.error.is_error"></BadgeCounter>
                  </div>
               </div>
               <div class="text-center">
                  <button
                     id="add-update-button"
                     class="btn btn-primary text-center mr-2"
                     type="submit"
                     @click="onAddUpdate"
                  >
                     {{ (id <= 0) ? $t("product.window.add.button.add") : $t("product.window.update.button.update") }}
                  </button>
                  <button
                     class="btn btn-danger text-center mr-2"
                     type="clear"
                     @click="onClear"
                  >
                     {{ $t("product.window.button.clear") }}
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
import { Props, IPCParams, AxiosResponse, Product } from "../../interfaces/product/product-add-update";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";
import BadgeCounter from "../../views/components/BadgeCounter.vue";

export default defineComponent({
   name: "product-add-update-component",
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
         },
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("product-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         vue_this.type = data.type;
         vue_this.content = data.content;
         if(data.data) {
            vue_this.data.code.text = data.data.code;
            vue_this.data.name.text = data.data.name;
            vue_this.data.description.text = data.data.description;
            vue_this.data.buy_price.text = data.data.buy_price;
            vue_this.data.sale_price.text = data.data.sale_price;
            vue_this.data.quantity.text = data.data.quantity;
         }
         vue_this.loaded = true;
      });
   },
   methods: {
      async onAddUpdate() {
         this.data.code.text = this.data.code.text.trim();
         this.data.name.text = this.data.name.text.trim();
         this.data.description.text = this.data.description.text.trim();
         this.data.buy_price.text = this.data.buy_price.text.trim();
         this.data.sale_price.text = this.data.sale_price.text.trim();
         this.data.quantity.text = this.data.quantity.text.trim();

         let code = this.data.code.text;
         let name = this.data.name.text;
         let description = this.data.description.text;
         let buy_price = this.data.buy_price.text;
         let sale_price = this.data.sale_price.text;
         let quantity = this.data.quantity.text;
         let error_code = false;
         let error_name = false;
         let error_description = false;
         let error_buy_price = false;
         let error_sale_price = false;
         let error_quantity = false;

         error_code = this.validateCode(code);
         error_name = this.validateName(name);
         error_description = this.validateDescription(description);
         error_buy_price = this.validateBuyPrice(buy_price);
         error_sale_price = this.validateSalePrice(sale_price);
         error_quantity = this.validateQuantity(quantity);

         if(error_code || error_name || error_description || error_buy_price || error_sale_price || error_quantity)
            return;

         let data:Product|null = null;
         if(this.id <= 0) {
            let response:AxiosResponse = await Vue.prototype.$http.put("product/v3/create.php", {
               code: this.data.code.text,
               name: this.data.name.text,
               description: this.data.description.text,
               buy_price: this.data.buy_price.text,
               sale_price: this.data.sale_price.text,
               quantity: this.data.quantity.text
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
            let response:AxiosResponse = await Vue.prototype.$http.post("product/v3/update.php", {
               id: this.id,
               code: this.data.code.text,
               name: this.data.name.text,
               description: this.data.description.text,
               buy_price: this.data.buy_price.text,
               sale_price: this.data.sale_price.text,
               quantity: this.data.quantity.text
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
            message = "The product has been added properly";
         else if(this.type === "update")
            message = "The product has been updated properly";

         window.api.send("product-module-window-dialog", {
            type: this.type,
            message: message
         });
         window.api.receive("product-module-window-dialog-reply", () => {
            window.api.send("product-module-window-close", {
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
         window.api.send("product-module-window-close", {
            id: this.id,
            data: null,
            result: "closed",
            type: vue_this.type
         });
      },
      clearForm() {
         this.data.code.text = "";
         this.data.code.error.is_error = false;
         this.data.code.error.message = "";

         this.data.name.text = "";
         this.data.name.error.is_error = false;
         this.data.name.error.message = "";

         this.data.description.text = "";
         this.data.description.error.is_error = false;
         this.data.description.error.message = "";

         this.data.buy_price.text = "";
         this.data.buy_price.error.is_error = false;
         this.data.buy_price.error.message = "";

         this.data.sale_price.text = "";
         this.data.sale_price.error.is_error = false;
         this.data.sale_price.error.message = "";

         this.data.quantity.text = "";
         this.data.quantity.error.is_error = false;
         this.data.quantity.error.message = "";
      },
      /////////////////
      // Blur Events //
      onCodeBlur() {
         let value = this.data.code.text;
         this.validateCode(value);
      },
      onNameBlur() {
         let value = this.data.name.text;
         this.validateName(value);
      },
      onDescriptionBlur() {
         let value = this.data.description.text;
         this.validateDescription(value);
      },
      onBuyPriceBlur() {
         let value = this.data.buy_price.text;
         this.validateBuyPrice(value);
      },
      onSalePriceBlur() {
         let value = this.data.sale_price.text;
         this.validateSalePrice(value);
      },
      onQuantityBlur() {
         let value = this.data.quantity.text;
         this.validateQuantity(value);
      },
      /////////////////////
      // Keypress Events //
      onCodeKeyup(e) {
         let value = this.data.code.text;
         this.validateCode(value);
         this.enterKeyNavigation(e, "last-name", "");
      },
      onNameKeyup(e) {
         let value = this.data.name.text;
         this.validateName(value);
         this.enterKeyNavigation(e, "address", "first-name");
      },
      onDescriptionKeyup(e) {
         let value = this.data.description.text;
         this.validateDescription(value);
         this.enterKeyNavigation(e, "cellphone", "last-name");
      },
      onBuyPriceKeyup(e) {
         let value = this.data.buy_price.text;
         this.validateBuyPrice(value);
         this.enterKeyNavigation(e, "cellphone2", "address");
      },
      onSalePriceKeyup(e) {
         let value = this.data.sale_price.text;
         this.validateSalePrice(value);
         this.enterKeyNavigation(e, "email", "cellphone");
      },
      onQuantityKeyup(e) {
         let value = this.data.quantity.text;
         this.validateQuantity(value);
         this.enterKeyNavigation(e, "add-update-button", "cellphone2");
      },
      ////////////////
      // Validators //
      validateCode(firstName:string) {
         let error = false;
         error = this.validateField(firstName, "code", "data", () => {
            if(this.data.code.text.length <= this.data.code.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      validateName(lastName:string) {
         let error = false;
         error = this.validateField(lastName, "name", "data", () => {
            if(this.data.name.text.length <= this.data.name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      validateDescription(address:string) {
         let error = false;
         error = this.validateField(address, "description", "data", () => {
            if(this.data.description.text.length <= this.data.description.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      validateBuyPrice(cellphone:string) {
         let error = false;
         error = this.validateField(cellphone, "buy_price", "data", () => {
            if(this.data.buy_price.text.length <= this.data.buy_price.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      validateSalePrice(cellphone2:string) {
         let error = false;
         error = this.validateField(cellphone2, "sale_price", "data", () => {
            if(this.data.sale_price.text.length <= this.data.sale_price.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      validateQuantity(email:string) {
         let error = false;
         error = this.validateField(email, "quantity", "data", () => {
            if(this.data.quantity.text.length <= this.data.quantity.max_text)
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
