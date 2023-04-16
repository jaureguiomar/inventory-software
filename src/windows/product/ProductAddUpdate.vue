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
               <div v-if="page.id > 0" class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-model="page.id"
                        :label="t('product.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div v-if="page.id > 0" class="row">
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
                  <!-- <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.code.text"
                        :label="t('product.window.field.code') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.code.error.is_error"
                        :error-message="field.code.error.message"
                        @blur="onCodeBlur"
                        @keyup="onCodeKeyup"
                     >
                     </q-input>
                  </div> -->
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
               </div>
               <div class="row">
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
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="field.quantity.text"
                        :label="t('product.window.field.quantity') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.quantity.error.is_error"
                        :error-message="field.quantity.error.message"
                        @blur="onQuantityBlur"
                        @keyup="onQuantityKeyup"
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-select
                        v-model="field.id_category.text"
                        use-input
                        input-debounce="0"
                        label="Category"
                        :options="categoryOptions"
                        behavior="menu"
                        :error="field.id_category.error.is_error"
                        :error-message="field.id_category.error.message"
                        @filter="categoryFilter"
                        @blur="onIdCategoryBlur"
                        @keyup="onIdCategoryKeyup"
                     >
                        <template #no-option>
                           <q-item>
                              <q-item-section class="text-grey">
                              No results
                              </q-item-section>
                           </q-item>
                        </template>
                     </q-select>
                  </div>
               </div>
               <div class="row q-mb-sm">
                  <div class="col-md-6 col-12">
                     <q-checkbox
                        v-model="hasBarcode"
                        label="This product has barcode"
                        @click="onHasBarcodeCheckboxClick"
                     >
                     </q-checkbox>
                  </div>
                  <div v-if="page.id > 0" class="col-md-6 col-12">
                     <q-checkbox
                        v-model="updateBarcode"
                        label="Update barcode"
                        :disable="!hasBarcode"
                     >
                     </q-checkbox>
                  </div>
               </div>
               <div class="row q-mb-sm">
                  <div class="col-md-6 col-12">
                     <q-checkbox
                        v-model="field.is_favorite.text"
                        label="Is Favorite"
                     >
                     </q-checkbox>
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
import { defineComponent, reactive, ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { format_category, format_product } from "@/plugins/mixins/format";
import { fd_data_category, fd_data_product } from "@/plugins/mixins/format-display-data";
import { validateField, findValueBy, getFormattedDateString } from "@/plugins/mixins/general";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { IPCParamsContent, Page, ProductField, ProductResponse, Product } from "@/types/product";
import { Category, CategoryOneResponse, CategoriesResponse } from "@/types/category";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";
import AddUpdateDialogVue from "@/windows/product/dialog/AddUpdateDialog.vue";

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
      const store = useStore(key);
      const $q = useQuasar();
      const hasBarcode = ref(true);
      const updateBarcode = ref(false);
      const category = ref<Category[]>([]);
      const categoryOptions = ref<Array<string>>([]);
      const categoryFilteredOptions = ref<Array<string>>([]);
      const page = reactive<Page>({
         id: -1,
         type: "",
         content: {
            title: "",
            description: ""
         }
      });
      const product = reactive<Product>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         is_favorite: -1,
         code: "",
         name: "",
         description: "",
         buy_price: -1,
         sale_price: -1,
         quantity: 0,
         id_category: -1,
         id_user: -1,
         id_pos: -1,
         id_branch: -1,
         category: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            user: null,
            pos: null,
            branch: null
         },
         user: null,
         pos: null,
         branch: null
      });
      const field = reactive<ProductField>({
         is_favorite: {
            text: false,
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         },
         code: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         },
         name: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         },
         description: {
            text: "",
            max_text: 170,
            error: {
               is_error: false,
               message: ""
            }
         },
         buy_price: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         },
         sale_price: {
            text: "",
            max_text: 100,
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
         },
         id_category: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         }
      });
      const loaded = ref(false);

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
      });
      const getPosId = computed(() => {
         return store.getters["getPosId"];
      });
      const getSessionUserId = computed(() => {
         return store.getters["getSessionUserId"];
      });

      window.api.receive("product-module-window-reply", (data:IPCParamsContent) => {
         page.id = data.id;
         page.type = data.type;
         page.content = data.content;
         if(data.data) {
            product.id = data.data.id;
            product.is_active = data.data.is_active;
            product.created = getFormattedDateString(data.data.created);
            product.updated = getFormattedDateString(data.data.updated);
            product.is_favorite = data.data.is_favorite;
            product.code = data.data.code;
            product.name = data.data.name;
            product.description = (data.data.description) ? data.data.description : "";
            product.buy_price = data.data.buy_price;
            product.sale_price = data.data.sale_price;
            product.quantity = data.data.quantity;
            product.id_category = data.data.id_category;
            product.id_branch = data.data.id_branch;
            product.category = data.data.category;

            field.is_favorite.text = (product.is_favorite === 1) ? true : false;
            field.code.text = data.data.code;
            field.name.text = data.data.name;
            field.description.text = (data.data.description) ? data.data.description : "";
            field.buy_price.text = data.data.buy_price.toString();
            field.sale_price.text = data.data.sale_price.toString();
            field.quantity.text = data.data.quantity.toString();
            if(data.data.category)
               field.id_category.text = data.data.category.name;
            if(!field.code.text)
               hasBarcode.value = false;

            create_activity_log({
               name: `The user has access to product ${(page.id > 0) ? 'add' : 'update'} report`,
               extra_data: JSON.stringify(product),
               id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
               id_access: ACTIVITY_LOG_OPERATION.PRODUCT_REPORT_ADD_UPDATE,
               id_user: getSessionUserId.value,
               server: getServer.value,
               access_token: getAuthToken.value.access_token
            });
         }

         if(page.id <= 0)
            updateBarcode.value = true;
         loaded.value = true;
      });
      axios.get<CategoriesResponse>(`${ getServer.value }/category`,
         {
            headers: {
               "Authorization": `Bearer ${ getAuthToken.value.access_token }`
            }
         }
      ).then((response) => {
         if(response) {
            if(response.data.data) {
               const data = response.data.data;
               let formatted_data:Array<Category> = [];
               for(let i = 0; i < data.length; i++) {
                  const category = format_category(data[i], fd_data_category);
                  if(category)
                     formatted_data.push(category);
                  categoryOptions.value.push(data[i].name);
                  categoryFilteredOptions.value.push(data[i].name);
               }
               category.value = formatted_data;
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } else {
            Swal.fire({
               title: "Error",
               text: t("global.default_error"),
               icon: "error"
            });
         }
      }).catch(() => {
         Swal.fire({
            title: "Error",
            text: t("global.default_error"),
            icon: "error"
         });
      });

      const onAddUpdate = async() => {
         // field.code.text = field.code.text.trim();
         field.name.text = field.name.text.trim();
         field.description.text = field.description.text.trim();
         field.buy_price.text = field.buy_price.text.trim();
         field.sale_price.text = field.sale_price.text.trim();
         field.quantity.text = field.quantity.text.trim();
         field.id_category.text = field.id_category.text.trim();

         // let code:string = field.code.text;
         let name:string = field.name.text;
         let description:string = field.description.text;
         let buy_price:string = field.buy_price.text;
         let sale_price:string = field.sale_price.text;
         let quantity:string = field.quantity.text;
         let category_name:string = field.id_category.text;
         // let id_category:number = -1;
         // let error_code:boolean = false;
         let error_name:boolean = false;
         let error_description:boolean = false;
         let error_buy_price:boolean = false;
         let error_sale_price:boolean = false;
         let error_quantity:boolean = false;
         let error_id_category:boolean = false;

         // error_code = validateCode(code);
         error_name = validateName(name);
         if(description)
            error_description = validateDescription(description);
         error_buy_price = validateBuyPrice(buy_price);
         error_sale_price = validateSalePrice(sale_price);
         error_quantity = validateQuantity(quantity);

         // Validate category
         const finded_index = findValueBy(category.value, category_name, "name");
         if(finded_index < 0)
            error_id_category = true;
         if(error_id_category)
            error_id_category = validateIdCategory(category_name);
         // else
         //    id_category = category.value[finded_index].id;

         if(error_name || error_buy_price || error_sale_price || error_quantity || error_id_category)
            return;
         if(description)
            if(error_description)
               return;

         if(hasBarcode.value) {
            if(updateBarcode.value) {
               $q.dialog({
                  component: AddUpdateDialogVue,
                  componentProps: {
                     type: (page.id <= 0) ? "add" : "update"
                  },
               }).onOk(async (payload:string) => {
                  field.code.text = payload;
                  field.code.text = field.code.text.trim();
                  let code:string = field.code.text;

                  if(validateCode(code))
                     return;
                  onAddUpdateFunction();
               });
            } else {
               onAddUpdateFunction();
            }
         } else {
            field.code.text = "";
            onAddUpdateFunction();
         }
      };
      const onAddUpdateFunction = async() => {
         let formatted_data:Product = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            is_favorite: -1,
            code: "",
            name: "",
            description: "",
            buy_price: -1,
            sale_price: -1,
            quantity: -1,
            id_category: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            category: {
               id: -1,
               is_active: -1,
               created: "",
               updated: "",
               name: "",
               id_user: -1,
               id_pos: -1,
               id_branch: -1,
               user: null,
               pos: null,
               branch: null
            },
            user: null,
            pos: null,
            branch: null
         };

         // Get "id_category"
         let id_category = -1;
         const finded_index = findValueBy(category.value, field.id_category.text, "name");
         if(finded_index < 0)
            return;
         id_category = category.value[finded_index].id;

         if(page.id <= 0) {
            try {
               let response = await axios.put<ProductResponse>(`${ getServer.value }/product`,
                  {
                     is_favorite: (field.is_favorite.text) ? 1 : 0,
                     code: field.code.text,
                     name: field.name.text,
                     description: field.description.text,
                     buy_price: field.buy_price.text,
                     sale_price: field.sale_price.text,
                     quantity: field.quantity.text,
                     id_category: id_category,
                     id_user: getSessionUserId.value,
                     id_pos: getPosId.value,
                     id_branch: getBranchId.value
                  },
                  {
                     headers: {
                        "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                     }
                  }
               );
               if(response) {
                  if(response.data.data) {
                     const data:Product = response.data.data;
                     const product = format_product(data, fd_data_product);
                     if(product)
                        formatted_data = product;

                     create_activity_log({
                        name: `The user has added a product item`,
                        extra_data: JSON.stringify(formatted_data),
                        id_operation: ACTIVITY_LOG_ACCESS.ADD,
                        id_access: ACTIVITY_LOG_OPERATION.CLIENT_REPORT_ADD_UPDATE,
                        id_user: getSessionUserId.value,
                        server: getServer.value,
                        access_token: getAuthToken.value.access_token
                     });
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
            } catch (error) {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
               return;
            }
         } else {
            try {
               let response = await axios.post<ProductResponse>(`${ getServer.value }/product`,
                  {
                     id: page.id,
                     is_favorite: (field.is_favorite.text) ? 1 : 0,
                     code: field.code.text,
                     name: field.name.text,
                     description: field.description.text,
                     buy_price: field.buy_price.text,
                     sale_price: field.sale_price.text,
                     quantity: field.quantity.text,
                     id_category: id_category,
                     id_user: getSessionUserId.value,
                     id_pos: getPosId.value,
                     id_branch: getBranchId.value
                  },
                  {
                     headers: {
                        "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                     }
                  }
               );
               if(response) {
                  if(response.data.data) {
                     const data:Product = response.data.data;
                     const product = format_product(data, fd_data_product);
                     if(product)
                        formatted_data = product;

                     create_activity_log({
                        name: `The user has updated a product item`,
                        extra_data: JSON.stringify(formatted_data),
                        id_operation: ACTIVITY_LOG_ACCESS.UPDATE,
                        id_access: ACTIVITY_LOG_OPERATION.PRODUCT_REPORT_ADD_UPDATE,
                        id_user: getSessionUserId.value,
                        server: getServer.value,
                        access_token: getAuthToken.value.access_token
                     });
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
            } catch (error) {
               Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               return;
            }
         }

         // Get Category
         try {
            let response = await axios.get<CategoryOneResponse>(`${ getServer.value }/category/${ formatted_data.id_category }`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data:Category = response.data.data;
                  const category = format_category(data, fd_data_category);
                  if(category)
                     formatted_data.category = category;
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
         } catch (error) {
            Swal.fire({
               title: "Error",
               text: t("global.default_error"),
               icon: "error"
            });
            return;
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
               data: formatted_data,
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
      const onHasBarcodeCheckboxClick = () => {
         if(hasBarcode.value)
            updateBarcode.value = true;
      };
      const categoryFilter = (value:string, update:Function) => {
         if(value === "") {
            update(() => {
               categoryOptions.value = categoryFilteredOptions.value;
            });
            return;
         }
         update(() => {
            const needle = value.toLowerCase();
            categoryOptions.value = categoryFilteredOptions.value.filter(tmp_value => tmp_value.toLowerCase().indexOf(needle) > -1);
         });
      };
      /////////////////
      // Blur Events //
      // const onCodeBlur = () => {
      //    let value = field.code.text;
      //    validateCode(value);
      // };
      const onNameBlur = () => {
         let value = field.name.text;
         validateName(value);
      };
      const onDescriptionBlur = () => {
         let value = field.description.text;
         if(value) {
            validateDescription(value);
         } else {
            field.description.error.is_error = false;
            field.description.error.message = "";
         }
      };
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
      const onIdCategoryBlur = () => {
         let value = field.id_category.text;
         validateIdCategory(value);
      };
      /////////////////////
      // Keypress Events //
      // const onCodeKeyup = () => {
      //    let value = field.code.text;
      //    validateCode(value);
      // };
      const onNameKeyup = () => {
         let value = field.name.text;
         validateName(value);
      };
      const onDescriptionKeyup = () => {
         let value = field.description.text;
         if(value) {
            validateDescription(value);
         } else {
            field.description.error.is_error = false;
            field.description.error.message = "";
         }
      };
      const onBuyPriceKeyup = () => {
         let value = field.buy_price.text;
         validateBuyPrice(value);
      };
      const onSalePriceKeyup = () => {
         let value = field.sale_price.text;
         validateSalePrice(value);
      };
      const onQuantityKeyup = () => {
         let value = field.quantity.text;
         validateQuantity(value);
      };
      const onIdCategoryKeyup = () => {
         let value = field.id_category.text;
         validateIdCategory(value);
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
      const validateDescription = (description:string) => {
         let result = validateField(description, () => {
            if(field.description.text.length <= field.description.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.description.error.is_error = result.error;
         field.description.error.message = result.message;
         return result.error;
      };
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
      const validateIdCategory = (id_category:string) => {
         let result = validateField(id_category);
         field.id_category.error.is_error = result.error;
         field.id_category.error.message = result.message;
         return result.error;
      };

      return {
         t,
         hasBarcode,
         updateBarcode,
         page,
         field,
         loaded,
         product,
         categoryOptions,
         onAddUpdate,
         onClear,
         onClose,
         onHasBarcodeCheckboxClick,
         categoryFilter,
         // onCodeBlur,
         onNameBlur,
         onDescriptionBlur,
         onBuyPriceBlur,
         onSalePriceBlur,
         onQuantityBlur,
         onIdCategoryBlur,
         // onCodeKeyup,
         onNameKeyup,
         onDescriptionKeyup,
         onBuyPriceKeyup,
         onSalePriceKeyup,
         onQuantityKeyup,
         onIdCategoryKeyup
      }
   }
});
</script>

<style lang="sass" scoped></style>
