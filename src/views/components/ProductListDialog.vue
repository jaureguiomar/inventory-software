<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="min-width: 1000px;" class="q-dialog-plugin">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col text-center">
            <q-table
               title="Product List"
               :rows="products"
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

               <template #no-data="{ icon, message, filter }">
                  <div class="full-width row flex-center q-gutter-sm">
                     <span>
                        {{ message }}
                     </span>
                     <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon"></q-icon>
                  </div>
               </template>

               <template #body-cell-actions="props">
                  <q-td :props="props">
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="Add"
                        @click="onProductAdd(props.row)"
                     >
                     </q-btn>
                  </q-td>
               </template>
            </q-table>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="q-mb-md" color="negative" label="Cancelar" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from "quasar";
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n/index";
import { Product } from "@/interfaces/product/product";

export default {
   props: {
      allProducts: {
         type: Array,
         required: true
      }
   },
   emits: [
      ...useDialogPluginComponent.emits
   ],
   setup (props) {
      const { t } = useI18n();
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
      const products = ref(props.allProducts);
      const productVisibleColumns = ref<Array<string>>([
         "id", "code", "name", // "description",
         "buy_price", "sale_price", "quantity",
         "actions"
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
            sort: (id:string) => {
               return parseInt(id);
            },
            format: (id:string) => {
               return "#" + id;
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
         // {
         //    name: "description",
         //    label: t("product.table.field.description"),
         //    align: "center",
         //    field: "description",
         //    sortable: true
         // },
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
            field: "actions",
            sortable: true
         }
      ];

      const onProductAdd = (data:Product) => {
         onDialogOK(data);
      };

      return {
         t,
         products,
         productVisibleColumns,
         productFilter,
         productPagination,
         productColumns,
         dialogRef,
         onProductAdd,
         onDialogHide,
         onDialogCancel
      };
   }
}
</script>
