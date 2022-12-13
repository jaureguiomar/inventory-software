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
            <a class="q-mr-sm text-white cursor-pointer" @click="onUserRoleAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
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
               title="User Roles List"
               :rows="saleProduct"
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
                  <h6 class="q-ma-none q-mr-md">User Roles List</h6>
                  <q-input v-model="saleProductFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

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

               <template #body-cell-actions="props">
                  <q-td :props="props">
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="See"
                        @click="onUserRoleSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onUserRoleUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onUserRoleDeleteWindowClick(props.row)"
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
import { defineComponent, ref, computed, reactive } from "vue"
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins/general";
import { format_branch, format_pos, format_user } from "@/plugins/mixins/format";
import { SaleProductsResponse, WindowResponse, SaleProduct } from "@/types/sale-product";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
import { Sale } from "@/types/sale";
import { Product } from "@/types/product";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import { format_sale, format_product } from '../plugins/mixins/format';

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
      const saleProduct = ref<SaleProduct[]>([]);
      const saleProductVisibleColumns = ref<Array<string>>([ "id", "created", "updated", "name", "actions" ]);
      const saleProductFilter = ref("");
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
            name: "name",
            label: t("sale_product.table.field.name"),
            align: "center",
            field: "name",
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
      const getSaleLoadedReply = computed(() => {
         return store.getters["getSaleLoadedReply"];
      });

      const onRefreshData = () => {
         saleProduct.value = [];

         axios.get<SaleProductsResponse>(`${ getServer.value }/sale_product/v3/select-all.php`,
            {
               headers: {
                  'Authorization': `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_sale_product:Array<SaleProduct> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_sale:Sale|null = format_sale(data[i].sale);
                     const formatted_product:Product|null = format_product(data[i].product);
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_sale_product.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        quantity: Number(data[i].quantity),
                        id_sale: Number(data[i].id_sale),
                        id_product: Number(data[i].id_product),
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        sale: formatted_sale,
                        product: formatted_product,
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
                  }
                  saleProduct.value = formatted_sale_product;
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
      const onUserRoleAddWindowClick = () => {
         window.api.send("user-role-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("sale_product.window.add.title"),
               description: t("sale_product.window.add.subtitle")
            },
            data: null
         });
      };
      const onUserRoleSeeWindowClick = (item:SaleProduct) => {
         window.api.send("user-role-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               quantity: item.quantity,
               id_sale: item.id_sale,
               id_product: item.id_product,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               sale: { ...item.sale },
               product: { ...item.product },
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      const onUserRoleUpdateWindowClick = (item:SaleProduct) => {
         window.api.send("user-role-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("sale_product.window.update.title"),
               description: t("sale_product.window.update.subtitle")
            },
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               quantity: item.quantity,
               id_sale: item.id_sale,
               id_product: item.id_product,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               sale: { ...item.sale },
               product: { ...item.product },
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      const onUserRoleDeleteWindowClick = (item:SaleProduct) => {
         window.api.send("user-role-module-window", {
            id: item.id,
            type: "delete",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               quantity: item.quantity,
               id_sale: item.id_sale,
               id_product: item.id_product,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               sale: { ...item.sale },
               product: { ...item.product },
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };

      onRefreshData();
      if(!getSaleLoadedReply.value) {
         window.api.receive("main-window-user-role-module-reply", (data:WindowResponse) => {
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
                        saleProduct.value[finded_index].quantity = data.data.quantity;
                        saleProduct.value[finded_index].id_sale = data.data.id_sale;
                        saleProduct.value[finded_index].id_product = data.data.id_product;
                        saleProduct.value[finded_index].id_user = data.data.id_user;
                        saleProduct.value[finded_index].id_pos = data.data.id_pos;
                        saleProduct.value[finded_index].id_branch = data.data.id_branch;
                        saleProduct.value[finded_index].sale = data.data.sale;
                        saleProduct.value[finded_index].product = data.data.product;
                        saleProduct.value[finded_index].user = data.data.user;
                        saleProduct.value[finded_index].pos = data.data.pos;
                        saleProduct.value[finded_index].branch = data.data.branch;
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
         store.commit("SET_USER_ROLE_LOADED_REPLY", true);
      }

      return {
         t,
         saleProduct,
         saleProductVisibleColumns,
         saleProductColumns,
         saleProductFilter,
         saleProductPagination,
         onRefreshData,
         onUserRoleAddWindowClick,
         onUserRoleSeeWindowClick,
         onUserRoleUpdateWindowClick,
         onUserRoleDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
