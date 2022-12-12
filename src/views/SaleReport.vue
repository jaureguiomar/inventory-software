<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("sale_report.title") }}</p>
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
            {{ t("sale_report.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="User Roles List"
               :rows="sale"
               :columns="saleColumns"
               :no-data-label="t('sale_report.table.content.details.empty')"
               :no-results-label="t('sale_report.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="id"
               :visible-columns="saleVisibleColumns"
               :pagination="salePagination"
               :filter="saleFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">User Roles List</h6>
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
import axios from "axios";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins/general";
import { format_branch, format_pos, format_user } from "@/plugins/mixins/format";
import { SalesResponse, WindowResponse, Sale } from "@/types/sale";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
import { CashCutoff } from "@/types/cash-cutoff";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import { format_cash_cutoff } from '@/plugins/mixins/format';

export default defineComponent({
   name: "sale-report-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const sale = ref<Sale[]>([]);
      const saleVisibleColumns = ref<Array<string>>([ "id", "created", "updated", "name", "actions" ]);
      const saleFilter = ref("");
      const salePagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
      });
      const saleColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("sale_report.table.field.id"),
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
            label: t("sale_report.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("sale_report.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "name",
            label: t("sale_report.table.field.name"),
            align: "center",
            field: "name",
            sortable: true
         },
         {
            name: "actions",
            label: t("sale_report.table.field.actions"),
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
         sale.value = [];

         axios.get<SalesResponse>(`${ getServer.value }/sale/v3/select-all.php`,
            {
               headers: {
                  'Authorization': `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_sale:Array<Sale> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_cash_cutoff:CashCutoff|null = format_cash_cutoff(data[i].cash_cutoff);
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_sale.push({
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
                        branch: formatted_branch
                     });
                  }
                  sale.value = formatted_sale;
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
               title: t("sale_report.window.add.title"),
               description: t("sale_report.window.add.subtitle")
            },
            data: null
         });
      };
      const onUserRoleSeeWindowClick = (item:Sale) => {
         window.api.send("user-role-module-window", {
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
               cash_cutoff: { ...item.cash_cutoff },
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      const onUserRoleUpdateWindowClick = (item:Sale) => {
         window.api.send("user-role-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("sale_report.window.update.title"),
               description: t("sale_report.window.update.subtitle")
            },
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
               cash_cutoff: { ...item.cash_cutoff },
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      const onUserRoleDeleteWindowClick = (item:Sale) => {
         window.api.send("user-role-module-window", {
            id: item.id,
            type: "delete",
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
               cash_cutoff: { ...item.cash_cutoff },
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
                     sale.value.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < sale.value.length; i++) {
                     const curr_user_role = sale.value[i];
                     if(curr_user_role.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0) {
                     if(data.data) {
                        sale.value[finded_index].id = data.data.id;
                        sale.value[finded_index].is_active = data.data.is_active;
                        sale.value[finded_index].created = data.data.created;
                        sale.value[finded_index].updated = data.data.updated;
                        sale.value[finded_index].total = data.data.total;
                        sale.value[finded_index].is_supplier = data.data.is_supplier;
                        sale.value[finded_index].id_cash_cutoff = data.data.id_cash_cutoff;
                        sale.value[finded_index].id_user = data.data.id_user;
                        sale.value[finded_index].id_pos = data.data.id_pos;
                        sale.value[finded_index].id_branch = data.data.id_branch;
                        sale.value[finded_index].cash_cutoff = data.data.cash_cutoff;
                        sale.value[finded_index].user = data.data.user;
                        sale.value[finded_index].pos = data.data.pos;
                        sale.value[finded_index].branch = data.data.branch;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < sale.value.length; i++) {
                     const curr_user_role = sale.value[i];
                     if(curr_user_role.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0)
                     sale.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_USER_ROLE_LOADED_REPLY", true);
      }

      return {
         t,
         sale,
         saleVisibleColumns,
         saleColumns,
         saleFilter,
         salePagination,
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
