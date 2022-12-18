<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("sale_product.title") }}</p>
         </template>
         <template #right-content>
            <!-- <a class="q-mr-sm text-white cursor-pointer" @click="onSaleProductAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a> -->
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("sale_product.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="Sale Products List"
               :rows="
                  (saleProductType === 'all') ? saleProduct :
                  (saleProductType === 'sale') ? saleProductSale : saleProductSupplier
               "
               :columns="saleProductColumns"
               :no-data-label="t('sale_product.table.content.details.empty')"
               :no-results-label="t('sale_product.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="id"
               :visible-columns="saleProductVisibleColumns"
               :pagination="saleProductPagination"
               :filter="saleProductFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">Sale Products List</h6>
                  <q-input v-model="saleProductFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-radio v-model="saleProductType" val="all" label="All"></q-radio>
                  <q-radio v-model="saleProductType" val="sale" label="Sale"></q-radio>
                  <q-radio v-model="saleProductType" val="supplier" label="Supplier Sale"></q-radio>

                  <q-space></q-space>

                  <q-select
                     v-model="saleProductVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="saleProductColumns"
                     option-value="name"
                     options-cover
                     style="min-width: 150px"
                  >
                  </q-select>
               </template>

               <template #body-cell-total="props">
                  <q-td :props="props">
                     <span>
                        ${{ props.row.total }}
                        <q-badge
                           v-if="props.row.is_supplier === 0"
                           color="primary"
                           align="top"
                        >
                           Sale
                        </q-badge>
                        <q-badge
                           v-else
                           color="secondary"
                           align="top"
                        >
                           Supplier Sale
                        </q-badge>
                     </span>
                  </q-td>
               </template>
               <template #body-cell-actions="props">
                  <q-td :props="props">
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="See"
                        @click="onSaleProductSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <!-- <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onSaleProductUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onSaleProductDeleteWindowClick(props.row)"
                     >
                     </q-btn> -->
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
            </q-table>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue"
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins/general";
import {
   format_branch, format_pos, format_user,
   format_product_m2m, format_cash_cutoff
} from "@/plugins/mixins/format";
import { SaleM2M, SalesM2MResponse, WindowResponseM2M } from "@/types/sale";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
import { ProductM2M } from "@/types/product";
import { CashCutoff } from "@/types/cash-cutoff";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "sale-product-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const saleProduct = ref<SaleM2M[]>([]);
      const saleProductSale = ref<SaleM2M[]>([]);
      const saleProductSupplier = ref<SaleM2M[]>([]);
      const saleProductType = ref<string>("all");
      const saleProductVisibleColumns = ref<Array<string>>([ "id", "created", "updated", "total", "actions" ]);
      const saleProductFilter = ref<string>("");
      const saleProductPagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
      });
      const saleProductColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("sale_product.table.field.id"),
            align: "center",
            field: "id",
            sortable: true,
            sort: (id:string) => {
               return parseInt(id);
            },
            format: (id:string) => {
               return "#" + id;
            }
         },
         {
            name: "created",
            label: t("sale_product.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("sale_product.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "total",
            label: t("sale_product.table.field.total"),
            align: "center",
            sortable: true
         },
         {
            name: "actions",
            label: t("sale_product.table.field.actions"),
            align: "center",
            sortable: true
         }
      ];

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getSaleProductLoadedReply = computed(() => {
         return store.getters["getSaleProductLoadedReply"];
      });

      const onRefreshData = () => {
         saleProduct.value = [];
         saleProductSale.value = [];
         saleProductSupplier.value = [];

         axios.get<SalesM2MResponse>(`${ getServer.value }/sale_product/v3/select-all.php`,
            {
               headers: {
                  'Authorization': `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_sale_product:Array<SaleM2M> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_cash_cutoff:CashCutoff|null = format_cash_cutoff(data[i].cash_cutoff);
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);
                     const formatted_product_m2m:ProductM2M[] = [];

                     for(let j = 0; j < data[i].product.length; j++) {
                        const curr_product_m2m:ProductM2M|null = format_product_m2m(data[i].product[j]);
                        if(curr_product_m2m)
                           formatted_product_m2m.push(curr_product_m2m);
                     }

                     formatted_sale_product.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        total: data[i].total,
                        is_supplier: Number(data[i].is_supplier),
                        id_cash_cutoff: Number(data[i].id_cash_cutoff),
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        cash_cutoff: formatted_cash_cutoff,
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch,
                        product: formatted_product_m2m
                     });
                  }

                  saleProduct.value = formatted_sale_product;
                  for(let i = 0; i < formatted_sale_product.length; i++) {
                     if(formatted_sale_product[i].is_supplier)
                        saleProductSupplier.value.push(formatted_sale_product[i]);
                     else
                        saleProductSale.value.push(formatted_sale_product[i]);
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
      // const onSaleProductAddWindowClick = () => {
      //    window.api.send("sale-product-module-window", {
      //       id: -1,
      //       type: "add",
      //       content: {
      //          title: t("sale_product.window.add.title"),
      //          description: t("sale_product.window.add.subtitle")
      //       },
      //       data: null
      //    });
      // };
      const onSaleProductSeeWindowClick = (item:SaleM2M) => {
         window.api.send("sale-product-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               total: item.total,
               is_supplier: item.is_supplier,
               id_cash_cutoff: item.id_cash_cutoff,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               product: JSON.parse(JSON.stringify(item.product)),
               cash_cutoff: { ...item.cash_cutoff },
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      // const onSaleProductUpdateWindowClick = (item:SaleM2M) => {
      //    window.api.send("sale-product-module-window", {
      //       id: item.id,
      //       type: "update",
      //       content: {
      //          title: t("sale_product.window.update.title"),
      //          description: t("sale_product.window.update.subtitle")
      //       },
      //       data: {
      //          id: item.id,
      //          is_active: item.is_active,
      //          created: item.created,
      //          updated: item.updated,
      //          total: item.total,
      //          is_supplier: item.is_supplier,
      //          id_cash_cutoff: item.id_cash_cutoff,
      //          id_user: item.id_user,
      //          id_pos: item.id_pos,
      //          id_branch: item.id_branch,
      //          product: JSON.parse(JSON.stringify(item.product)),
      //          cash_cutoff: { ...item.cash_cutoff },
      //          user: { ...item.user },
      //          pos: { ...item.pos },
      //          branch: { ...item.branch }
      //       }
      //    });
      // };
      // const onSaleProductDeleteWindowClick = (item:SaleM2M) => {
      //    window.api.send("sale-product-module-window", {
      //       id: item.id,
      //       type: "delete",
      //       data: {
      //          id: item.id,
      //          is_active: item.is_active,
      //          created: item.created,
      //          updated: item.updated,
      //          total: item.total,
      //          is_supplier: item.is_supplier,
      //          id_cash_cutoff: item.id_cash_cutoff,
      //          id_user: item.id_user,
      //          id_pos: item.id_pos,
      //          id_branch: item.id_branch,
      //          product: JSON.parse(JSON.stringify(item.product)),
      //          cash_cutoff: { ...item.cash_cutoff },
      //          user: { ...item.user },
      //          pos: { ...item.pos },
      //          branch: { ...item.branch }
      //       }
      //    });
      // };

      onRefreshData();
      if(!getSaleProductLoadedReply.value) {
         window.api.receive("main-window-sale-product-module-reply", (data:WindowResponseM2M) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     saleProduct.value.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < saleProduct.value.length; i++) {
                     const curr_user_role = saleProduct.value[i];
                     if(curr_user_role.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0) {
                     if(data.data) {
                        saleProduct.value[finded_index].id = data.data.id;
                        saleProduct.value[finded_index].is_active = data.data.is_active;
                        saleProduct.value[finded_index].created = data.data.created;
                        saleProduct.value[finded_index].updated = data.data.updated;
                        saleProduct.value[finded_index].total = data.data.total;
                        saleProduct.value[finded_index].is_supplier = data.data.is_supplier;
                        saleProduct.value[finded_index].id_cash_cutoff = data.data.id_cash_cutoff;
                        saleProduct.value[finded_index].id_user = data.data.id_user;
                        saleProduct.value[finded_index].id_pos = data.data.id_pos;
                        saleProduct.value[finded_index].id_branch = data.data.id_branch;
                        saleProduct.value[finded_index].product = data.data.product;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < saleProduct.value.length; i++) {
                     const curr_user_role = saleProduct.value[i];
                     if(curr_user_role.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0)
                  saleProduct.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_SALE_PRODUCT_LOADED_REPLY", true);
      }

      return {
         t,
         saleProduct,
         saleProductSale,
         saleProductSupplier,
         saleProductType,
         saleProductVisibleColumns,
         saleProductColumns,
         saleProductFilter,
         saleProductPagination,
         onRefreshData,
         // onSaleProductAddWindowClick,
         onSaleProductSeeWindowClick,
         // onSaleProductUpdateWindowClick,
         // onSaleProductDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
