<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("sale_product.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ t("sale_product.window.see.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="saleProduct.id > 0"
                        v-model="saleProduct.id"
                        :label="t('sale_product.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="saleProduct.created"
                        :label="t('sale_product.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="saleProduct.total"
                        :label="t('sale_product.window.field.total') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-checkbox
                        v-model="saleProduct.is_supplier"
                        :label="t('sale_product.window.field.is_supplier')"
                     >
                     </q-checkbox>
                  </div>
               </div>

               <q-table
                  class="q-mb-md"
                  title="Sale Products List"
                  :rows="saleProduct.product"
                  :columns="productColumns"
                  :no-data-label="t('sale_product.table.content.details.empty')"
                  :no-results-label="t('sale_product.table.content.details.empty')"
                  separator="vertical"
                  virtual-scroll
                  :virtual-scroll-sticky-size-start="48"
                  row-key="id"
                  :visible-columns="productVisibleColumns"
                  :pagination="productPagination"
                  :filter="productFilter"
               >
                  <template #top>
                     <h6 class="q-ma-none q-mr-md">Sale Products List</h6>
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

                  <template #no-data="{ icon, message }">
                     <div class="full-width row flex-center q-gutter-sm">
                        <span>
                           {{ message }}
                        </span>
                        <q-icon size="2em" :name="icon"></q-icon>
                     </div>
                  </template>
               </q-table>

               <div class="text-center">
                  <q-btn
                     color="primary"
                     :label="t('sale_product.window.button.close')"
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
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
import { key } from "@/plugins/store";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { SaleM2M, IPCParamsM2M } from "@/types/sale";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "sale-product-see-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const store = useStore(key);
      const { t } = useI18n();
      const saleProduct = reactive<SaleM2M>({
         id: 0,
         is_active: 0,
         created: "",
         updated: "",
         total: "",
         is_supplier: 0,
         id_cash_cutoff: 0,
         id_user: 0,
         id_pos: 0,
         id_branch: 0,
         product: [],
         cash_cutoff: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            amount_open: "",
            amount_sale: "",
            amount_supplier: "",
            amount_close: "",
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
         },
         user: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            username: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            id_role: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            role: null,
            user: null,
            pos: null,
            branch: null
         },
         pos: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            machine_id: "",
            mac_address: "",
            id_branch: -1,
            branch: null
         },
         branch: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            telephone: "",
            address: ""
         }
      });
      const productVisibleColumns = ref<Array<string>>([
         "id", "created", "updated", "code", "name",
         "description", "sale_price"
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
            name: "code",
            label: t("sale_product.table.field.code"),
            align: "center",
            field: "code",
            sortable: true
         },
         {
            name: "name",
            label: t("sale_product.table.field.name"),
            align: "center",
            field: "name",
            sortable: true
         },
         {
            name: "description",
            label: t("sale_product.table.field.description"),
            align: "center",
            field: "description",
            sortable: true
         },
         {
            name: "sale_price",
            label: t("sale_product.table.field.sale_price"),
            align: "center",
            field: "sale_price",
            sortable: true
         }
      ];
      const loaded = ref(false);
      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getSessionUserId = computed(() => {
         return store.getters["getSessionUserId"];
      });

      window.api.receive("sale-product-module-window-reply", (data:IPCParamsM2M) => {
         saleProduct.id = data.id;
         if(data.data) {
            saleProduct.id = data.data.id;
            saleProduct.is_active = data.data.is_active;
            saleProduct.created = getFormattedDateString(data.data.created);
            saleProduct.updated = getFormattedDateString(data.data.updated);
            saleProduct.total = data.data.total;
            saleProduct.is_supplier = data.data.is_supplier;
            saleProduct.id_cash_cutoff = data.data.id_cash_cutoff;
            saleProduct.id_user = data.data.id_user;
            saleProduct.id_pos = data.data.id_pos;
            saleProduct.id_branch = data.data.id_branch;
            saleProduct.product = data.data.product;
            saleProduct.user = data.data.user;
            saleProduct.pos = data.data.pos;
            saleProduct.branch = data.data.branch;

            create_activity_log({
               name: "The user has access to product see report",
               extra_data: JSON.stringify(saleProduct),
               id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
               id_access: ACTIVITY_LOG_OPERATION.SALE_PRODUCT_REPORT_SEE,
               id_user: getSessionUserId.value,
               server: getServer.value,
               access_token: getAuthToken.value.access_token
            });
         }
         loaded.value = true;
      });
      loaded.value = true;

      const onClose = () => {
         window.api.send("sale-product-module-window-close", {
            id: saleProduct.id,
            data: null,
            result: "closed",
            type: "see"
         });
      };

      return {
         t,
         saleProduct,
         productVisibleColumns,
         productFilter,
         productPagination,
         productColumns,
         loaded,
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
