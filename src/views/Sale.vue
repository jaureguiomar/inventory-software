<template>
   <div class="main-container">
      <!-- <Banner /> -->
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">Sale</p>
         </template>
         <template #subtitle>
            Sales that the user will do in the system
         </template>
         <template #right-content>
            <a class="text-white cursor-pointer" @click="onRefreshProducts">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
      </Menu>

      <Content>
         <template #content>
            <div class="sale">
               <div class="sale-favorite">
                  <div class="sale-favorite-title">
                     Favorite Items
                  </div>
                  <div class="sale-favorite-items">
                     <q-list bordered separator>
                        <q-item
                           v-for="tmp_product in allProductsFavorites"
                           :key="tmp_product.id"
                           v-ripple
                           clickable
                        >
                           <q-item-section @click="onAddFavoriteProduct(tmp_product)">
                              <q-item-label>{{ tmp_product.name }}</q-item-label>
                              <q-item-label caption>{{ tmp_product.description }}</q-item-label>
                           </q-item-section>
                        </q-item>
                     </q-list>
                  </div>
               </div>
               <div class="sale-content">
                  <!-- <div class="sale-indicators">
                     <div class="sale-indicator-item">
                        <div class="sale-indicator-item-top">
                           Indicator 1
                        </div>
                        <div class="sale-indicator-item-bottom">
                           $1,250.00
                        </div>
                     </div>
                     <div class="sale-indicator-item">
                        <div class="sale-indicator-item-top">
                           Indicator 2
                        </div>
                        <div class="sale-indicator-item-bottom">
                           $1,250.00
                        </div>
                     </div>
                     <div class="sale-indicator-item">
                        <div class="sale-indicator-item-top">
                           Indicator 3
                        </div>
                        <div class="sale-indicator-item-bottom">
                           $1,250.00
                        </div>
                     </div>
                     <div class="sale-indicator-item">
                        <div class="sale-indicator-item-top">
                           Indicator 4
                        </div>
                        <div class="sale-indicator-item-bottom">
                           $1,250.00
                        </div>
                     </div>
                  </div> -->
                  <div class="sale-options1">
                     <div class="options1-left">
                        <q-btn
                           class="q-mr-sm"
                           color="primary"
                           label="Product List"
                           @click="onDisplayProductListDialog"
                        >
                        </q-btn>
                     </div>
                     <div class="options1-middle">
                        <q-select
                           v-model="barcodeSelect"
                           use-input
                           dense
                           input-debounce="0"
                           label="Barcode..."
                           :options="allProductsOptions"
                           behavior="menu"
                           style="max-width: 260px;"
                           @filter="onBarcodeProductFilter"
                           @update:model-value="onBarcodeProductUpdate"
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
                     <div class="options1-right">
                        <q-btn
                           color="primary"
                           label="Cash Cut Off"
                           @click="onDisplayCashCutOffDialog"
                        >
                        </q-btn>
                        <q-checkbox v-model="isSupplier" label="Supplier Sale"></q-checkbox>
                     </div>
                  </div>
                  <div class="sale-data">
                     <q-table
                        title="Sale"
                        :rows="getSaleCurrSaleProduct"
                        :columns="saleColumns"
                        :no-data-label="t('client.table.content.details.empty')"
                        :no-results-label="t('client.table.content.details.empty')"
                        separator="vertical"
                        virtual-scroll
                        :virtual-scroll-sticky-size-start="48"
                        row-key="id"
                        :visible-columns="saleVisibleColumns"
                        :filter="saleFilter"
                     >
                        <template #top>
                           <h6 class="q-ma-none q-mr-md">Sale</h6>
                           <q-input v-model="saleFilter" dense debounce="300" placeholder="Search">
                              <template #append>
                                 <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                              </template>
                           </q-input>

                           <q-space></q-space>

                           <q-select
                              v-model="saleVisibleColumns"
                              multiple
                              outlined
                              dense
                              options-dense
                              :display-value="$q.lang.table.columns"
                              emit-value
                              map-options
                              :options="saleColumns"
                              option-value="name"
                              options-cover
                              style="min-width: 150px"
                           >
                           </q-select>
                        </template>

                        <template #body-cell-sale_quantity="props">
                           <q-td :props="props">
                              <div class="sale-quantity-container">
                                 <q-btn
                                    class="q-mr-sm"
                                    color="negative"
                                    label="-"
                                    @click="onQuantityPlusMinusClick(props.row, 'minus')"
                                 >
                                 </q-btn>
                                 <q-input
                                    v-model="props.row.sale_quantity"
                                    class="text-center"
                                    readonly
                                 >
                                 </q-input>
                                 <q-btn
                                    class="q-ml-sm"
                                    color="primary"
                                    label="+"
                                    @click="onQuantityPlusMinusClick(props.row, 'plus')"
                                 >
                                 </q-btn>
                              </div>
                           </q-td>
                        </template>
                        <template #body-cell-actions="props">
                           <q-td :props="props">
                              <q-btn
                                 class="q-mr-sm"
                                 color="negative"
                                 label="Delete"
                                 @click="onProductSaleDelete(props.row.id)"
                              >
                              </q-btn>
                           </q-td>
                        </template>

                        <template #no-data="{ icon, message }">
                           <div class="full-width row flex-center q-gutter-sm">
                              <span>
                                 {{ message }}
                              </span>
                              <q-icon size="2em" :name="icon"></q-icon>
                           </div>
                        </template>

                        <template #bottom-row>
                           <q-tr>
                              <q-td colspan="100%">
                                 <div class="totals-main-container">
                                    <!-- <div class="totals-container">
                                       <div class="title">
                                          Subtotal:
                                       </div>
                                       <div class="text">
                                          $1,000.66
                                       </div>
                                    </div> -->
                                    <div class="totals-container">
                                       <div class="title">
                                          Total:
                                       </div>
                                       <div class="text">
                                          ${{ calculateTotal }}
                                       </div>
                                    </div>
                                 </div>
                              </q-td>
                           </q-tr>
                        </template>
                     </q-table>
                  </div>
                  <div class="sale-options2">
                     <q-btn
                        class="q-mr-sm"
                        color="info"
                        label="Restore sale"
                        @click="onRestoreSale"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="info"
                        label="Save sale"
                        @click="onSaveSale"
                     >
                     </q-btn>
                     <q-btn
                        color="primary"
                        label="Finish sale"
                        @click="onFinishSale"
                     >
                     </q-btn>
                  </div>
               </div>
            </div>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n/index";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { defineComponent, getCurrentInstance, ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import { key } from "@/plugins/store";
import { findValueBy } from "@/plugins/mixins/general";
import { format_branch, format_category, format_pos, format_user } from "@/plugins/mixins/format";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { Product, ProductsResponse } from "@/types/product";
import { Sale, SaleResponse } from "@/types/sale";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Category } from "@/types/category";
import { Branch } from "@/types/branch";
import { CashCutoff, CashCutoffOneResponse } from "@/types/cash-cutoff";
import { SaleProduct, SaleProductM2M, SaleProductResponse, SaleProductsM2MResponse } from "@/types/sale-product";
import { SaleContentStore } from "@/types/store";
// import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import ProductListDialog from "@/views/components/ProductListDialog.vue";
import SaleSaveDialog from "@/views/components/SaleSaveDialog.vue";
import SaleRestoreDialog from "@/views/components/SaleRestoreDialog.vue";
import SaleCashCutOffDialog from "@/views/components/SaleCashCutOffDialog.vue";

export default defineComponent({
   name: "sale-component",
   components: {
      // Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const $q = useQuasar();
      const _instance = getCurrentInstance();
      const barcodeScanner = _instance?.appContext.app.config.globalProperties.$barcodeScanner;
      const all_products = ref<Product[]>([]);
      const saleFilter = ref("");
      const saleVisibleColumns = ref<Array<string>>([ "code", "name", "sale_price", "sale_quantity", "sale_total", "actions" ]);
      const saleColumns:Array<any> = [
         { name: "code", label: t("product.table.field.code"), align: "center", field: "code", sortable: true },
         { name: "name", label: t("product.table.field.name"), align: "center", field: "name", sortable: true },
         { name: "sale_price", label: t("product.table.field.sale_price"), align: "center", field: "sale_price", sortable: true,
            format: (sale_price:string) => {
               return "$" + sale_price;
            }
         },
         { name: "sale_quantity", label: t("product.table.field.quantity"), align: "center", field: "sale_quantity", sortable: true },
         { name: "sale_total", label: "Total", align: "center", field: "sale_total", sortable: true,
            format: (sale_total:string) => {
               return "$" + sale_total;
            }
         },
         { name: "actions", label: t("product.table.field.actions"), align: "center", field: "actions", sortable: true }
      ];
      const isSupplier = ref<Boolean>(false);
      const allProductsFavorites = ref<Product[]>([]);
      const allProductsOptions = ref<string[]>([]);
      const allProductsFilteredOptions = ref<string[]>([]);
      const barcodeSelect = ref<string>("");
      const lastCashCutoff = reactive<CashCutoff>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         amount_open: -1,
         amount_sale: -1,
         amount_supplier: -1,
         amount_close: -1,
         date_close: "",
         id_type: -1,
         id_user_open: -1,
         id_user_close: -1,
         id_pos: -1,
         id_branch: -1,
         user_open: null,
         user_close: null,
         pos: null,
         branch: null
      });

      onMounted(() => {
         onRefreshProducts();
         getLastCashCutoff();
         barcodeScanner.init(onBarcodeScanned);

         axios.get<ProductsResponse>(`${ getServer.value }/product/find`,
            {
               params: {
                  field: "is_favorite",
                  query: "1"
               },
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_products:Array<Product> = [];
                  let formatted_products_input:Array<string> = [];

                  for(let i = 0; i < data.length; i++) {
                     const formatted_category:Category|null = format_category(data[i].category);
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_products.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        is_favorite: Number(data[i].is_favorite),
                        code: data[i].code,
                        name: data[i].name,
                        description: data[i].description,
                        buy_price: data[i].buy_price,
                        sale_price: data[i].sale_price,
                        quantity: Number(data[i].quantity),
                        id_category: Number(data[i].id_category),
                        id_user: Number(data[i].id_branch),
                        id_pos: Number(data[i].id_branch),
                        id_branch: Number(data[i].id_branch),
                        category: formatted_category,
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
                     formatted_products_input.push(data[i].name);
                  }
                  allProductsFavorites.value = formatted_products;
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

         axios.get<ProductsResponse>(`${ getServer.value }/product`,
            {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_products:Array<Product> = [];
                  let formatted_products_input:Array<string> = [];

                  for(let i = 0; i < data.length; i++) {
                     const formatted_category:Category|null = format_category(data[i].category);
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_products.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        is_favorite: Number(data[i].is_favorite),
                        code: data[i].code,
                        name: data[i].name,
                        description: data[i].description,
                        buy_price: data[i].buy_price,
                        sale_price: data[i].sale_price,
                        quantity: Number(data[i].quantity),
                        id_category: Number(data[i].id_category),
                        id_user: Number(data[i].id_branch),
                        id_pos: Number(data[i].id_branch),
                        id_branch: Number(data[i].id_branch),
                        category: formatted_category,
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
                     formatted_products_input.push(data[i].name);
                  }
                  allProductsOptions.value = formatted_products_input;
                  allProductsFilteredOptions.value = formatted_products_input;
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
      });
      onBeforeUnmount(() => {
         barcodeScanner.destroy();
      });

      const getLastCashCutoff = () => {
         axios.post<CashCutoffOneResponse>(`${ getServer.value }/cash-cutoff/last`,
            {
               id_pos: getPosId.value,
               id_branch: getBranchId.value
            },
            {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  if(data) {
                     const formatted_user_open:User|null = format_user(data.user_open);
                     const formatted_user_close:User|null = format_user(data.user_close);
                     const formatted_pos:Pos|null = format_pos(data.pos);
                     const formatted_branch:Branch|null = format_branch(data.branch);

                     lastCashCutoff.id = Number(data.id);
                     lastCashCutoff.is_active = Number(data.is_active);
                     lastCashCutoff.created = data.created;
                     lastCashCutoff.updated = data.updated;
                     lastCashCutoff.amount_open = data.amount_open;
                     lastCashCutoff.amount_sale = data.amount_sale;
                     lastCashCutoff.amount_supplier = data.amount_supplier;
                     lastCashCutoff.amount_close = data.amount_close;
                     lastCashCutoff.date_close = data.date_close;
                     lastCashCutoff.id_type = Number(data.id_type);
                     lastCashCutoff.id_user_open = Number(data.id_user_open);
                     lastCashCutoff.id_user_close = Number(data.id_user_close);
                     lastCashCutoff.id_pos = Number(data.id_pos);
                     lastCashCutoff.id_branch = Number(data.id_branch);
                     lastCashCutoff.user_open = formatted_user_open;
                     lastCashCutoff.user_close = formatted_user_close;
                     lastCashCutoff.pos = formatted_pos;
                     lastCashCutoff.branch = formatted_branch;
                  }
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
      };
      const onBarcodeScanned = (barcode:string) => {
         barcodeSelect.value = barcode;

         setTimeout(() => {
            const finded_index = findValueBy(all_products.value, barcode, "code");
            if(finded_index >= 0) {
               onAddSaleProduct(all_products.value[finded_index]);
            } else {
               Swal.fire({
                  title: "Error",
                  text: "Product does not exist",
                  icon: "error"
               });
            }
            barcodeSelect.value = "";
         }, 100);
      };
      // const onSimpleTypeaheadSelectItem = (value:string) => {
      //    setTimeout(() => {
      //       const finded_index = findValueBy(allProductsFavorites.value, value, "name");
      //       const typeaheadIdInput = document.getElementById("typeahead_id") as HTMLInputElement;
      //       if(finded_index >= 0)
      //          onAddSaleProduct(allProductsFavorites.value[finded_index]);
      //       typeaheadIdInput.value = "";
      //    }, 100);
      // };
      const onBarcodeProductFilter = (value:string, update:Function) => {
         if(value === "") {
            update(() => {
               allProductsOptions.value = allProductsFilteredOptions.value;
            });
            return;
         }
         update(() => {
            const needle = value.toLowerCase();
            allProductsOptions.value = allProductsFilteredOptions.value.filter(tmp_value => tmp_value.toLowerCase().indexOf(needle) > -1);
         });
      };
      const onBarcodeProductUpdate = () => {
         setTimeout(() => {
            const finded_index = findValueBy(all_products.value, barcodeSelect.value, "name");
            if(finded_index >= 0) {
               onAddSaleProduct(all_products.value[finded_index]);
            } else {
               Swal.fire({
                  title: "Error",
                  text: "Product does not exist",
                  icon: "error"
               });
            }
            barcodeSelect.value = "";
         }, 100);
      };
      const onRefreshProducts = () => {
         all_products.value = [];
         axios.get<ProductsResponse>(`${ getServer.value }/product/find`,
            {
               params: {
                  field: "id_branch",
                  query: getBranchId.value
               },
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  all_products.value = data;
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
      };
      const onAddFavoriteProduct = (curr_product:Product) => {
         onAddSaleProduct(curr_product);
      };
      const onDisplayProductListDialog = () => {
         $q.dialog({
            component: ProductListDialog,
            componentProps: {
               allProducts: all_products.value
            },
         }).onOk((payload:Product) => {
            onAddSaleProduct(payload);
         });
      };
      const onDisplayCashCutOffDialog = () => {
         $q.dialog({
            component: SaleCashCutOffDialog,
         }).onOk(() => {
            getLastCashCutoff();
         });
      };
      const onQuantityPlusMinusClick = (product:Product, type:string) => {
         switch(type) {
            case "plus":
               onAddSaleProduct(product);
               break;
            case "minus":
               store.commit("MINUS_SALE_CURR_SALE_PRODUCT_QUANTITY", product.id);
               break;
         }
      };
      const onProductSaleDelete = (id_product:number) => {
         store.commit("REMOVE_SALE_CURR_SALE_PRODUCT", id_product);
      };
      const onRestoreSale = () => {
         if(getSaleSavedSales.value.length > 0) {
            $q.dialog({
               component: SaleRestoreDialog,
            }).onOk((payload:SaleContentStore) => {
               store.commit("REMOVE_SALE_SAVED_SALE", payload.id);
               store.commit("SET_SALE_CURR_SALE", payload);
            });
         } else {
            Swal.fire({
               title: "Error",
               text: "Theres no saved to sales",
               icon: "error"
            });
            return;
         }
      };
      const onSaveSale = () => {
         if(getSaleCurrSaleProduct.value.length > 0) {
            $q.dialog({
               component: SaleSaveDialog,
            }).onOk((payload:string) => {
               store.commit("SET_SALE_CURR_SALE_DATA_NAME", payload);
               store.commit("ADD_SALE_SAVED_SALE", {
                  ...getSaleCurrSale.value,
                  product: [ ...getSaleCurrSale.value.product ]
               });
               store.commit("SET_SALE_CURR_SALE_PRODUCT", []);
            });
         } else {
            Swal.fire({
               title: "Error",
               text: "Theres no sale to save",
               icon: "error"
            });
            return;
         }
      };
      const onFinishSale = async () => {
         if(getSaleCurrSaleProduct.value.length > 0) {
            if(lastCashCutoff.id_type !== 1) {
               Swal.fire({
                  title: "Error",
                  text: "Theres no cash cutoff opened",
                  icon: "error"
               });
               return;
            }

            try {
               // Create sale
               let created_sale:Sale = {
                  id: -1,
                  is_active: -1,
                  created: "",
                  updated: "",
                  total: -1,
                  is_supplier: -1,
                  id_cash_cutoff: -1,
                  id_user: -1,
                  id_pos: -1,
                  id_branch: -1,
                  cash_cutoff: null,
                  user: null,
                  pos: null,
                  branch: null
               };
               let responseSale = await axios.put<SaleResponse>(`${ getServer.value }/sale`,
                  {
                     total: calculateTotal.value,
                     is_supplier: (isSupplier.value) ? 1 : 0,
                     id_cash_cutoff: lastCashCutoff.id,
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
               if(responseSale) {
                  if(responseSale.data.data) {
                     created_sale = responseSale.data.data;

                     create_activity_log({
                        name: "The user has added a sale item",
                        extra_data: JSON.stringify(created_sale),
                        id_operation: ACTIVITY_LOG_ACCESS.ADD,
                        id_access: ACTIVITY_LOG_OPERATION.SALE_REPORT,
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

               // Create sale-products
               let created_sale_product:SaleProduct = {
                  id: -1,
                  is_active: -1,
                  created: "",
                  updated: "",
                  quantity: -1,
                  id_sale: -1,
                  id_product: -1,
                  id_user: -1,
                  id_pos: -1,
                  id_branch: -1,
                  sale: null,
                  product: null,
                  user: null,
                  pos: null,
                  branch: null
               };
               let sale_product_error = false;
               for(let i = 0; i < getSaleCurrSaleProduct.value.length; i++) {
                  const curr_sale = getSaleCurrSaleProduct.value[i];
                  let responseSaleProduct = await axios.put<SaleProductResponse>(`${ getServer.value }/sale-product`,
                     {
                        quantity: curr_sale.sale_quantity,
                        is_supplier: (isSupplier.value) ? 1 : 0,
                        id_cash_cutoff: lastCashCutoff.id,
                        id_sale: created_sale.id,
                        id_product: curr_sale.id,
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
                  if(responseSaleProduct) {
                     if(responseSaleProduct.data.data)
                        created_sale_product = responseSaleProduct.data.data;
                     else
                        sale_product_error = true;
                  } else {
                     Swal.fire({
                        title: "Error",
                        text: t("global.default_error"),
                        icon: "error"
                     });
                     sale_product_error = true;
                  }
               }

               // Retrieve sale-products
               let sale_product_m2m:SaleProductM2M = {
                  id: -1,
                  is_active: -1,
                  created: "",
                  updated: "",
                  id_user: -1,
                  id_pos: -1,
                  id_branch: -1,
                  product: [],
                  total: -1,
                  is_supplier: -1,
                  id_cash_cutoff: -1,
                  cash_cutoff: null,
                  user: null,
                  pos: null,
                  branch: null
               };
               let sale_product_m2m_array:SaleProductM2M[] = [];
               let responseSaleProductM2M = await axios.get<SaleProductsM2MResponse>(`${ getServer.value }/sale-product/find-m2m`,
                  {
                     params: {
                        field: "id",
                        query: created_sale.id
                     },
                     headers: {
                        "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                     }
                  }
               );
               if(responseSaleProductM2M) {
                  if(responseSaleProductM2M.data.data) {
                     sale_product_m2m_array = responseSaleProductM2M.data.data;
                     if(sale_product_m2m_array.length > 0)
                        sale_product_m2m = sale_product_m2m_array[0];
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

               if(!sale_product_error) {
                  window.api.send("print-sale", {
                     sale: created_sale,
                     sale_product: created_sale_product,
                     sale_product_m2m: JSON.parse(JSON.stringify(sale_product_m2m))
                  });
                  store.commit("SET_SALE_CURR_SALE_PRODUCT", []);
                  Swal.fire({
                     title: "Ok",
                     text: "Thank you, come back soon",
                     icon: "success"
                  });
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
            Swal.fire({
               title: "Error",
               text: "Theres no products in the sale",
               icon: "error"
            });
            return;
         }
      };
      const onAddSaleProduct = (new_product:Product) => {
         if(lastCashCutoff.id_type !== 1) {
            Swal.fire({
               title: "Error",
               text: "Theres no cash cutoff opened",
               icon: "error"
            });
            return;
         }

         if(getSaleCurrSaleProduct.value.length <= 0)
            store.commit("SET_SALE_CURR_SALE_DATA_AUTOMATIC");
         store.commit("ADD_SALE_CURR_SALE_PRODUCT", new_product);
      }

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
      const getSaleCurrSale = computed(() => {
         return store.getters["getSaleCurrSale"];
      });
      const getSaleCurrSaleProduct = computed(() => {
         return store.getters["getSaleCurrSaleProduct"];
      });
      const getSaleSavedSales = computed(() => {
         return store.getters["getSaleSavedSales"];
      });
      const calculateTotal = computed(() => {
         let total = 0;
         for(let i = 0; i < getSaleCurrSaleProduct.value.length; i++)
            total += parseFloat(getSaleCurrSaleProduct.value[i].sale_price) * parseFloat(getSaleCurrSaleProduct.value[i].sale_quantity);
         return total.toFixed(2);
      });

      return {
         t,
         saleColumns,
         saleFilter,
         saleVisibleColumns,
         getSaleCurrSaleProduct,
         calculateTotal,
         isSupplier,
         allProductsFavorites,
         allProductsOptions,
         barcodeSelect,
         onBarcodeProductFilter,
         onBarcodeProductUpdate,
         onRefreshProducts,
         onAddFavoriteProduct,
         onDisplayProductListDialog,
         onDisplayCashCutOffDialog,
         onQuantityPlusMinusClick,
         onProductSaleDelete,
         onRestoreSale,
         onSaveSale,
         onFinishSale
      };
   }
});
</script>

<style lang="sass" scoped>
   .sale
      width: 100%
      height: auto
      display: flex
      flex-direction: row
      align-items: flex-start
      justify-content: space-between
      .sale-favorite
         width: 240px
         min-height: 647px
         max-height: 647px
         padding: 20px
         border: 1px solid #ccc
         border-radius: 4px
         color: #000
         background: #fff
         box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
         overflow-y: auto
         .sale-favorite-title
            font-size: 20px
            text-align: center
            margin-bottom: 10px
      .sale-content
         width: calc(100% - 240px - 20px)
         .sale-indicators
            display: flex
            flex-direction: row
            align-items: center
            justify-content: center
            margin-bottom: 10px
            .sale-indicator-item
               padding: 20px
               &:not(:last-child)
                  border-right: 1px solid #ccc
               .sale-indicator-item-top
                  text-align: center
                  font-size: 17px
                  font-weight: bold
                  color: #ccc
                  text-transform: uppercase
               .sale-indicator-item-bottom
                  text-align: right
                  font-size: 20px
                  font-weight: bold
         .sale-options1
            width: 100%
            height: auto
            display: flex
            flex-direction: row
            align-items: center
            justify-content: space-between
            margin-bottom: 10px
            .options1-middle
               .simple-typeahead
                  input
                     padding: 20px !important
         .sale-data
            margin-bottom: 10px
            // table
         .sale-options2
            width: 100%
            display: block
            text-align: right
            // margin-bottom: 10px
            // button
   .totals-main-container
      display: flex
      flex-direction: row
      align-items: center
      justify-content: flex-end
      .totals-container
         width: 160px
         padding: 20px
         background: orange
         border: 1px solid #ccc
         border-radius: 4px
         color: #000
         background-color: #fff
         box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
         &:not(:last-child)
            margin-right: 10px
         .title
            text-align: left
            font-size: 14px
            margin-bottom: 5px
         .text
            text-align: right
            font-size: 23px
            font-weight: bold
   .sale-quantity-container
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center

   @media screen and (max-width: 1198px)
      .sale
         .sale-favorite
            min-height: 665px
            max-height: 665px
      //       .sale-favorite-title
      //    .sale-content
      //       .sale-indicators
      //          .sale-indicator-item
      //             .sale-indicator-item-top
      //             .sale-indicator-item-bottom
      //       .sale-options1
      //       .sale-data
      //       .sale-options2
      // .totals-main-container
      //    .totals-container
      //       .title
      //       .text
   @media screen and (max-width: 932px)
      .sale
         align-items: center
         justify-content: center
         flex-direction: column
         padding: 20px
         .sale-favorite
            width: 100%
            margin-bottom: 20px
            min-height: 400px
            max-height: 400px
            // .sale-favorite-title
         .sale-content
            width: 100%
            // .sale-indicators
            //    .sale-indicator-item
            //       .sale-indicator-item-top
            //       .sale-indicator-item-bottom
            .sale-options1
               text-align: center
            // .sale-data
            .sale-options2
               text-align: center
      // .totals-main-container
      //    .totals-container
      //       .title
      //       .text
   @media screen and (max-width: 729px)
      .sale
         // .sale-favorite
         //    .sale-favorite-title
         .sale-content
            .sale-indicators
               flex-direction: column
               margin-bottom: 20px
               .sale-indicator-item
                  width: 100%
                  padding: 20px
                  background: magenta
                  border: 1px solid #ccc
                  border-radius: 4px
                  color: #000
                  background-color: #fff
                  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
                  &:not(:last-child)
                     border-right: none
                     margin-bottom: 10px
                  .sale-indicator-item-top
                     text-align: center
                  .sale-indicator-item-bottom
                     text-align: center
            .sale-options1
               flex-direction: column
               .options1-left
                  margin-bottom: 10px
               .options1-middle
                  margin-bottom: 10px
                  // .simple-typeahead
                  //    input
      //       .sale-data
      //       .sale-options2
      // .totals-main-container
      //    .totals-container
      //       .title
      //       .text
</style>
