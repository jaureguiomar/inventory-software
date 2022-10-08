<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("supplier.title") }}</p>
         </template>
         <template #right-content>
            <a class="q-mr-sm text-white cursor-pointer" @click="onSupplierAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("supplier.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="Supplier List"
               :rows="supplier"
               :columns="supplierColumns"
               :no-data-label="t('supplier.table.content.details.empty')"
               :no-results-label="t('supplier.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="id"
               :visible-columns="supplierVisibleColumns"
               :pagination="supplierPagination"
               :filter="supplierFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">Supplier List</h6>
                  <q-input v-model="supplierFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-select
                     v-model="supplierVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="supplierColumns"
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
                        @click="onSupplierSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onSupplierUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onSupplierDeleteWindowClick(props.row)"
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
import { SuppliersResponse, WindowResponse, Supplier } from "@/interfaces/supplier/supplier";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins/general";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "supplier-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const supplier = ref<Supplier[]>([]);
      const supplierVisibleColumns = ref<Array<string>>([ "id", "created", "updated", "name", "actions" ]);
      const supplierFilter = ref("");
      const supplierPagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
      });
      const supplierColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("supplier.table.field.id"),
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
            label: t("supplier.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("supplier.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "name",
            label: t("supplier.table.field.name"),
            align: "center",
            field: "name",
            sortable: true
         },
         {
            name: "actions",
            label: t("supplier.table.field.actions"),
            align: "center",
            sortable: true
         }
      ];

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getSupplierLoadedReply = computed(() => {
         return store.getters["getSupplierLoadedReply"];
      });

      const onRefreshData = () => {
         supplier.value = [];

         axios.get<SuppliersResponse>(`${ getServer.value }/supplier/v3/select-all.php`)
            .then((response) => {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data.data;
                     let formatted_suppliers:Array<Supplier> = [];
                     for(let i = 0; i < data.length; i++) {
                        formatted_suppliers.push({
                           id: Number(data[i].id),
                           is_active: Number(data[i].is_active),
                           created: data[i].created,
                           updated: data[i].updated,
                           name: data[i].name,
                           id_branch: Number(data[i].id_branch),
                           branch: {
                              id: Number(data[i].branch.id),
                              is_active: Number(data[i].branch.is_active),
                              created: data[i].branch.created,
                              updated: data[i].branch.updated,
                              name: data[i].branch.name,
                              telephone: data[i].branch.telephone,
                              address: data[i].branch.address
                           }
                        });
                     }
                     supplier.value = formatted_suppliers;
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
      const onSupplierAddWindowClick = () => {
         window.api.send("supplier-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("supplier.window.add.title"),
               description: t("supplier.window.add.subtitle")
            },
            data: null
         });
      };
      const onSupplierSeeWindowClick = (item:Supplier) => {
         window.api.send("supplier-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               id_branch: item.id_branch,
               branch: { ...item.branch }
            }
         });
      };
      const onSupplierUpdateWindowClick = (item:Supplier) => {
         window.api.send("supplier-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("supplier.window.update.title"),
               description: t("supplier.window.update.subtitle")
            },
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               id_branch: item.id_branch,
               branch: { ...item.branch }
            }
         });
      };
      const onSupplierDeleteWindowClick = (item:Supplier) => {
         window.api.send("supplier-module-window", {
            id: item.id,
            type: "delete",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               id_branch: item.id_branch,
               branch: { ...item.branch }
            }
         });
      };

      onRefreshData();
      if(!getSupplierLoadedReply.value) {
         window.api.receive("main-window-supplier-module-reply", (data:WindowResponse) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     supplier.value.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < supplier.value.length; i++) {
                     const curr_supplier = supplier.value[i];
                     if(curr_supplier.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0) {
                     if(data.data) {
                        supplier.value[finded_index].id = data.data.id;
                        supplier.value[finded_index].is_active = data.data.is_active;
                        supplier.value[finded_index].created = data.data.created;
                        supplier.value[finded_index].updated = data.data.updated;
                        supplier.value[finded_index].name = data.data.name;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < supplier.value.length; i++) {
                     const curr_supplier = supplier.value[i];
                     if(curr_supplier.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0)
                     supplier.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_SUPPLIER_LOADED_REPLY", true);
      }

      return {
         t,
         supplier,
         supplierVisibleColumns,
         supplierColumns,
         supplierFilter,
         supplierPagination,
         onRefreshData,
         onSupplierAddWindowClick,
         onSupplierSeeWindowClick,
         onSupplierUpdateWindowClick,
         onSupplierDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
