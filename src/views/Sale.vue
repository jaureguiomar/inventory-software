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
                        <q-item v-ripple clickable>
                           <q-item-section>Single line item</q-item-section>
                        </q-item>

                        <q-item v-ripple clickable>
                           <q-item-section>
                              <q-item-label>Item with caption</q-item-label>
                              <q-item-label caption>Caption</q-item-label>
                           </q-item-section>
                        </q-item>

                        <q-item v-ripple clickable>
                           <q-item-section>
                              <q-item-label overline>OVERLINE</q-item-label>
                              <q-item-label>Item with caption</q-item-label>
                           </q-item-section>
                        </q-item>
                     </q-list>
                  </div>
               </div>
               <div class="sale-content">
                  <div class="sale-indicators">
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
                  </div>
                  <div class="sale-options1">
                     <div class="options1-left">
                        <q-btn
                           color="primary"
                           label="Product List"
                           @click="onDisplayProductListDialog"
                        >
                        </q-btn>
                     </div>
                     <div class="options1-middle">
                        <!-- :itemProjection="itemProjectionFunction"
                        @selectItem="selectItemEventHandler"
                        @onInput="onInputEventHandler"
                        @onFocus="onFocusEventHandler"
                        @onBlur="onBlurEventHandler" -->
                        <vue3-simple-typeahead
                           id="typeahead_id"
                           placeholder="Barcode..."
                           :items="['One','Two','Three', 'Fourth']"
                           :minInputLength="1"
                           class="q-pa-sm rounded-borders text-weight-bold no-outline shadow-1"
                        >
                           <template #list-item-text="slot">
                              number.- {{ slot.item }}
                           </template>
                        </vue3-simple-typeahead>
                     </div>
                     <div class="options1-right">
                        <q-btn
                           class="q-mr-sm"
                           color="primary"
                           label="History"
                        >
                        </q-btn>
                        <q-btn
                           class="q-mr-sm"
                           color="primary"
                           label="Sales"
                        >
                        </q-btn>
                        <q-btn
                           color="primary"
                           label="Buys"
                        >
                        </q-btn>
                     </div>
                  </div>
                  <div class="sale-data">
                     <q-table
                        title="Sale"
                        :rows="getSaleProduct"
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

                        <template #no-data="{ icon, message, filter }">
                           <div class="full-width row flex-center q-gutter-sm">
                              <span>
                                 {{ message }}
                              </span>
                              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon"></q-icon>
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
                        color="primary"
                        label="Other option"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="Restore sale"
                     >
                     </q-btn>
                     <q-btn
                        color="primary"
                        label="Save sale"
                        @click="onSaveSale"
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
import axios from "@/plugins/axios";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n/index";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import {
   defineComponent, getCurrentInstance, onMounted,
   onBeforeUnmount, ref, computed
} from "vue";
import { key } from "@/plugins/store";
import { findValueBy } from "@/plugins/mixins/general";
import { Product, ProductsResponse } from "@/interfaces/product/product";
// import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import ProductListDialog from "@/views/components/ProductListDialog.vue";

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

      onMounted(() => {
         onRefreshProducts();
         barcodeScanner.init(onBarcodeScanned);
         const typeaheadIdInput = document.getElementById("typeahead_id") as HTMLInputElement;
         typeaheadIdInput.addEventListener("keypress", typeaheadInputKeypress);
      });
      onBeforeUnmount(() => {
         const typeaheadIdInput = document.getElementById("typeahead_id") as HTMLInputElement;
         typeaheadIdInput.removeEventListener("keypress", typeaheadInputKeypress);
      });

      const typeaheadInputKeypress = (e:KeyboardEvent) => {
         let keyCode = e.keyCode ? e.keyCode : e.which;
         if(keyCode === 13) {
            const typeaheadIdInput = document.getElementById("typeahead_id") as HTMLInputElement;
            const barcode = typeaheadIdInput.value;

            setTimeout(() => {
               const finded_index = findValueBy(all_products.value, barcode, "code");
               if(finded_index >= 0) {
                  store.commit("ADD_SALE_PRODUCT_REPLY", all_products.value[finded_index]);
               } else {
                  Swal.fire({
                     title: "Error",
                     text: "Product does not exist",
                     icon: "error"
                  });
               }
               typeaheadIdInput.value = "";
            }, 100);
         }
      };
      const onBarcodeScanned = (barcode:string) => {
         const typeaheadIdInput = document.getElementById("typeahead_id") as HTMLInputElement;
         typeaheadIdInput.value = barcode;
         typeaheadIdInput.dispatchEvent(new KeyboardEvent("keypress", {
            keyCode: 13
         }));
      };
      const onRefreshProducts = () => {
         all_products.value = [];
         axios.get<ProductsResponse>("product/v3/find.php", {
            params: {
               type: "id_branch",
               query: getBranchId.value
            }
         }).then((response) => {
            if(response) {
               if(!response.data.error.is_error) {
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
      const onDisplayProductListDialog = () => {
         $q.dialog({
            component: ProductListDialog,
            componentProps: {
               allProducts: all_products.value
            },
         }).onOk((payload:any) => {
            store.commit("ADD_SALE_PRODUCT_REPLY", payload);
         });
      };
      const onQuantityPlusMinusClick = (product:Product, type:string) => {
         switch(type) {
            case "plus":
               store.commit("ADD_SALE_PRODUCT_REPLY", product);
               break;
            case "minus":
               store.commit("MINUS_SALE_PRODUCT_QUANTITY", product.id);
               break;
         }
      };
      const onProductSaleDelete = (id_product:number) => {
         store.commit("REMOVE_SALE_PRODUCT_REPLY", id_product);
      };
      const onSaveSale = () => {
         if(getSaleProduct.value.length > 0) {
            window.api.send("print-sale");
            store.commit("SET_SALE_PRODUCT_REPLY", []);
            Swal.fire({
               title: "Ok",
               text: "Thank you, come back soon",
               icon: "success"
            });
         } else {
            Swal.fire({
               title: "Error",
               text: "Theres no products in the sale",
               icon: "error"
            });
         }
      };

      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
      });
      const getSaleProduct = computed(() => {
         return store.getters["getSaleProduct"];
      });
      const calculateTotal = computed(() => {
         let total = 0;
         for(let i = 0; i < getSaleProduct.value.length; i++)
            total += parseFloat(getSaleProduct.value[i].sale_price) * parseFloat(getSaleProduct.value[i].sale_quantity);
         return total.toFixed(2);
      });

      return {
         t,
         saleColumns,
         saleFilter,
         saleVisibleColumns,
         getSaleProduct,
         calculateTotal,
         onRefreshProducts,
         onDisplayProductListDialog,
         onQuantityPlusMinusClick,
         onProductSaleDelete,
         onSaveSale
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
            font-size: 17px
            font-weight: bold
            margin-bottom: 5px
         .text
            text-align: right
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
