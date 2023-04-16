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
            <a v-if="permissionProductSee" class="q-mr-sm text-white cursor-pointer" @click="onProductAddWindowClick">
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
               row-key="id"
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
                        v-if="permissionProductAdd"
                        class="q-mr-sm"
                        color="primary"
                        label="See"
                        @click="onProductSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        v-if="permissionProductUpdate"
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onProductUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        v-if="permissionProductDelete"
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onProductDeleteWindowClick(props.row)"
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
            </q-table>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted } from "vue"
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { format_product } from "@/plugins/mixins/format";
import { fd_data_product } from "@/plugins/mixins/format-display-data";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins/general";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { validate_permission, get_permission_by_id } from "@/plugins/mixins/permission";
import { ProductsResponse, WindowResponse, Product } from "@/types/product";
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
         "buy_price", "sale_price", "quantity", "actions"
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
            sortable: true,
            format: (code:string) => {
               return (code) ? code : "N/A";
            }
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
      const permissionProductSee = ref(false);
      const permissionProductAdd = ref(false);
      const permissionProductUpdate = ref(false);
      const permissionProductDelete = ref(false);
      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
      });
      const getSessionUserId = computed(() => {
         return store.getters["getSessionUserId"];
      });
      const getSessionUserRole = computed(() => {
         return store.getters["getSessionUserRole"];
      });
      const getSessionPermission = computed(() => {
         return store.getters["getSessionPermission"];
      });
      const getProductLoadedReply = computed(() => {
         return store.getters["getProductLoadedReply"];
      });

      onMounted(() => {
         const permission1 = get_permission_by_id(19, getSessionPermission.value);
         const permission2 = get_permission_by_id(20, getSessionPermission.value);
         const permission3 = get_permission_by_id(21, getSessionPermission.value);
         const permission4 = get_permission_by_id(22, getSessionPermission.value);
         permissionProductSee.value = validate_permission(getSessionUserRole.value.atributes_1, permission1.attr_value);
         permissionProductAdd.value = validate_permission(getSessionUserRole.value.atributes_1, permission2.attr_value);
         permissionProductUpdate.value = validate_permission(getSessionUserRole.value.atributes_1, permission3.attr_value);
         permissionProductDelete.value = validate_permission(getSessionUserRole.value.atributes_1, permission4.attr_value);

         create_activity_log({
            name: "The user has access to product report",
            extra_data: "",
            id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
            id_access: ACTIVITY_LOG_OPERATION.PRODUCT_REPORT,
            id_user: getSessionUserId.value,
            server: getServer.value,
            access_token: getAuthToken.value.access_token
         });
         onRefreshData();
         if(!getProductLoadedReply.value) {
            window.api.receive("main-window-product-module-reply", (data:WindowResponse) => {
               if(data.result === "success") {
                  if(data.type === "add") {
                     if(data.data)
                        product.value.push(data.data);
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
                        if(data.data) {
                           product.value[finded_index].id = data.data.id;
                           product.value[finded_index].is_active = data.data.is_active;
                           product.value[finded_index].created = data.data.created;
                           product.value[finded_index].updated = data.data.updated;
                           product.value[finded_index].code = data.data.code;
                           product.value[finded_index].is_favorite = data.data.is_favorite;
                           product.value[finded_index].name = data.data.name;
                           product.value[finded_index].description = data.data.description;
                           product.value[finded_index].buy_price = data.data.buy_price;
                           product.value[finded_index].sale_price = data.data.sale_price;
                           product.value[finded_index].quantity = data.data.quantity;
                           product.value[finded_index].id_category = data.data.id_category;
                           product.value[finded_index].id_user = data.data.id_user;
                           product.value[finded_index].id_pos = data.data.id_pos;
                           product.value[finded_index].id_branch = data.data.id_branch;
                           product.value[finded_index].category = data.data.category;
                           product.value[finded_index].user = data.data.user;
                           product.value[finded_index].pos = data.data.pos;
                           product.value[finded_index].branch = data.data.branch;
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
            store.commit("SET_PRODUCT_LOADED_REPLY", true);
         }
      });

      const onRefreshData = () => {
         product.value = [];

         axios.get<ProductsResponse>(`${ getServer.value }/product/find`, {
            params: {
               field: "id_branch",
               query: getBranchId.value
            },
            headers: {
               "Authorization": `Bearer ${ getAuthToken.value.access_token }`
            }
         }).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<Product> = [];
                  for(let i = 0; i < data.length; i++) {
                     const product = format_product(data[i], fd_data_product);
                     if(product)
                        formatted_data.push(product);
                  }
                  product.value = formatted_data;
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
      const onProductSeeWindowClick = (item:Product) => {
         window.api.send("product-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               is_favorite: item.is_favorite,
               code: item.code,
               name: item.name,
               description: item.description,
               buy_price: item.buy_price,
               sale_price: item.sale_price,
               quantity: item.quantity,
               id_category: item.id_category,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               category: { ...item.category },
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
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
               is_favorite: item.is_favorite,
               code: item.code,
               name: item.name,
               description: item.description,
               buy_price: item.buy_price,
               sale_price: item.sale_price,
               quantity: item.quantity,
               id_category: item.id_category,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               category: { ...item.category },
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
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
               is_favorite: item.is_favorite,
               code: item.code,
               name: item.name,
               description: item.description,
               buy_price: item.buy_price,
               sale_price: item.sale_price,
               quantity: item.quantity,
               id_category: item.id_category,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               category: { ...item.category },
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };

      return {
         t,
         product,
         productVisibleColumns,
         productColumns,
         productFilter,
         productPagination,
         permissionProductSee,
         permissionProductAdd,
         permissionProductUpdate,
         permissionProductDelete,
         onRefreshData,
         onProductAddWindowClick,
         onProductSeeWindowClick,
         onProductUpdateWindowClick,
         onProductDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
