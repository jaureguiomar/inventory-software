<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("product.title") }}</p>
         </template>
         <template #right-content>
            <a class="q-mr-sm text-white cursor-pointer" @click="onProductAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("product.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="Product List"
               :rows="product"
               :columns="productColumns"
               :no-data-label="t('product.table.content.details.empty')"
               :no-results-label="t('product.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="name"
               :visible-columns="productVisibleColumns"
               :pagination="productPagination"
               :filter="productFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">Product List</h6>
                  <q-input v-model="productFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-select
                     v-model="productVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="productColumns"
                     option-value="name"
                     options-cover
                     style="min-width: 150px"
                  >
                  </q-select>
               </template>

               <template #body-cell-name="props">
                  <q-td :props="props">
                     <div>
                        {{ props.row.name }}
                        <q-badge outline align="middle" color="primary">
                           {{ props.row.category.name }}
                        </q-badge>
                     </div>
                  </q-td>
               </template>

               <template #body-cell-actions="props">
                  <q-td :props="props">
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="See"
                        @click="onClienSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onProductUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onProductDeleteWindowClick(props.row)"
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
import axios from "@/plugins/axios";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins";
import { ProductsResponse, WindowResponse, Product } from "@/interfaces/product/product";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "product-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const product = ref<Product[]>([]);
      const productVisibleColumns = ref<Array<string>>([
         "id", "created", "updated", "code", "name", "description",
         "buy_price", "sale_price", "quantity", "category", "actions"
      ]);
      const productFilter = ref("");
      const productPagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
      });
      const productColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("product.table.field.id"),
            align: "center",
            field: "id",
            sortable: true,
            // sort: (id:number) => {
            //    return parseInt(id);
            // },
            format: (id:number) => {
               return "#" + id;
            }
         },
         {
            name: "created",
            label: t("product.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("product.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "code",
            label: t("product.table.field.code"),
            align: "center",
            field: "code",
            sortable: true
         },
         {
            name: "name",
            label: t("product.table.field.name"),
            align: "center",
            field: "name",
            sortable: true
         },
         {
            name: "description",
            label: t("product.table.field.description"),
            align: "center",
            field: "description",
            sortable: true,
            format: (description:string) => {
               return (description) ? description : "N/A";
            }
         },
         {
            name: "buy_price",
            label: t("product.table.field.buy_price"),
            align: "center",
            field: "buy_price",
            sortable: true,
            format: (buy_price:string) => {
               return "$" + buy_price;
            }
         },
         {
            name: "sale_price",
            label: t("product.table.field.sale_price"),
            align: "center",
            field: "sale_price",
            sortable: true,
            format: (sale_price:string) => {
               return "$" + sale_price;
            }
         },
         {
            name: "quantity",
            label: t("product.table.field.quantity"),
            align: "center",
            field: "quantity",
            sortable: true
         },
         {
            name: "actions",
            label: t("product.table.field.actions"),
            align: "center",
            sortable: true
         }
      ];

      const getProductLoadedReply = computed(() => {
         return store.getters["getProductLoadedReply"];
      });

      const onRefreshData = () => {
         product.value = [];

         axios.get<ProductsResponse>("product/v3/select-all.php")
            .then((response) => {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data.data;
                     let formatted_products:Array<Product> = [];
                     for(let i = 0; i < data.length; i++) {
                        formatted_products.push({
                           id: Number(data[i].id),
                           is_active: Number(data[i].is_active),
                           created: data[i].created,
                           updated: data[i].updated,
                           code: data[i].code,
                           name: data[i].name,
                           description: data[i].description,
                           buy_price: data[i].buy_price,
                           sale_price: data[i].sale_price,
                           quantity: Number(data[i].quantity),
                           category: {
                              id: Number(data[i].category.id),
                              is_active: Number(data[i].category.is_active),
                              created: data[i].category.created,
                              updated: data[i].category.updated,
                              name: data[i].category.name
                           },
                           category_id: Number(data[i].category_id)
                        });
                     }
                     product.value = formatted_products;
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
            });
      };
      const onProductAddWindowClick = () => {
         window.api.send("product-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("product.window.add.title"),
               description: t("product.window.add.subtitle")
            },
            data: null
         });
      };
      const onClienSeeWindowClick = (item:Product) => {
         window.api.send("product-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               code: item.code,
               name: item.name,
               description: item.description,
               buy_price: item.buy_price,
               sale_price: item.sale_price,
               quantity: item.quantity,
               category: { ...item.category },
               category_id: item.category_id
            }
         });
      };
      const onProductUpdateWindowClick = (item:Product) => {
         window.api.send("product-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("product.window.update.title"),
               description: t("product.window.update.subtitle")
            },
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               code: item.code,
               name: item.name,
               description: item.description,
               buy_price: item.buy_price,
               sale_price: item.sale_price,
               quantity: item.quantity,
               category: { ...item.category },
               category_id: item.category_id
            }
         });
      };
      const onProductDeleteWindowClick = (item:Product) => {
         window.api.send("product-module-window", {
            id: item.id,
            type: "delete",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               code: item.code,
               name: item.name,
               description: item.description,
               buy_price: item.buy_price,
               sale_price: item.sale_price,
               quantity: item.quantity,
               category: { ...item.category },
               category_id: item.category_id
            }
         });
      };

      onRefreshData();
      if(!getProductLoadedReply.value) {
         window.api.receive("main-window-product-module-reply", (data:WindowResponse) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     if(data.data.data)
                        product.value.push(data.data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < product.value.length; i++) {
                     const curr_product = product.value[i];
                     if(curr_product.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0) {
                     if(data.data.data) {
                        product.value[finded_index].id = data.data.data.id;
                        product.value[finded_index].is_active = data.data.data.is_active;
                        product.value[finded_index].created = data.data.data.created;
                        product.value[finded_index].updated = data.data.data.updated;
                        product.value[finded_index].code = data.data.data.code;
                        product.value[finded_index].name = data.data.data.name;
                        product.value[finded_index].description = data.data.data.description;
                        product.value[finded_index].buy_price = data.data.data.buy_price;
                        product.value[finded_index].sale_price = data.data.data.sale_price;
                        product.value[finded_index].quantity = data.data.data.quantity;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < product.value.length; i++) {
                     const curr_product = product.value[i];
                     if(curr_product.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0)
                     product.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_CLIENT_LOADED_REPLY", true);
      }

      return {
         t,
         product,
         productVisibleColumns,
         productColumns,
         productFilter,
         productPagination,
         onRefreshData,
         onProductAddWindowClick,
         onClienSeeWindowClick,
         onProductUpdateWindowClick,
         onProductDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
