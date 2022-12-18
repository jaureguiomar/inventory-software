<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("cash_cutoff.title") }}</p>
         </template>
         <template #right-content>
            <!-- <a class="q-mr-sm text-white cursor-pointer" @click="onCashCutoffAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a> -->
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("cash_cutoff.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="Cash Cutoffs List"
               :rows="cashCutoff"
               :columns="cashCutoffColumns"
               :no-data-label="t('cash_cutoff.table.content.details.empty')"
               :no-results-label="t('cash_cutoff.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="id"
               :visible-columns="cashCutoffVisibleColumns"
               :pagination="cashCutoffPagination"
               :filter="cashCutoffFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">Cash Cutoffs List</h6>
                  <q-input v-model="cashCutoffFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-select
                     v-model="cashCutoffVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="cashCutoffColumns"
                     option-value="name"
                     options-cover
                     style="min-width: 150px"
                  >
                  </q-select>
               </template>

               <template #body-cell-amount="props">
                  <q-td :props="props">
                     <span>
                        <q-badge color="primary q-pa-sm q-mr-sm" align="top">
                           ${{ (props.row.amount_open) ? props.row.amount_open : '0.00' }}
                        </q-badge>
                        <span class="q-mr-sm">/</span>
                        <q-badge class="q-pa-sm" color="primary" align="top">
                           ${{ (props.row.amount_close) ? props.row.amount_close : '0.00' }}
                        </q-badge>
                     </span>
                  </q-td>
               </template>
               <template #body-cell-user="props">
                  <q-td :props="props">
                     <span>
                        <q-badge color="primary q-pa-sm q-mr-sm" align="top">
                           {{ (props.row.user_open.username) ? props.row.user_open.username : "Not yet" }}
                        </q-badge>
                        <span class="q-mr-sm">/</span>
                        <q-badge class="q-pa-sm" color="primary" align="top">
                           {{ (props.row.user_open.username) ? props.row.user_open.username : "Not yet" }}
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
                        @click="onCashCutoffSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <!-- <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onCashCutoffUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onCashCutoffDeleteWindowClick(props.row)"
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
import { format_user, format_pos, format_branch } from "@/plugins/mixins/format";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins/general";
import { CashCutoff, CashCutoffsResponse, WindowResponse } from "@/types/cash-cutoff";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "cash-cutoff-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const cashCutoff = ref<CashCutoff[]>([]);
      const cashCutoffVisibleColumns = ref<Array<string>>([
         "id", "created", "updated", "amount", "date_close",
         "amount_sale", "amount_supplier", "user", "actions"
      ]);
      const cashCutoffFilter = ref<string>("");
      const cashCutoffPagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
      });
      const cashCutoffColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("cash_cutoff.table.field.id"),
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
            label: t("cash_cutoff.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("cash_cutoff.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "amount",
            label: t("cash_cutoff.table.field.amount"),
            align: "center",
            sortable: true
         },
         {
            name: "date_close",
            label: t("cash_cutoff.table.field.date_close"),
            align: "center",
            field: "date_close",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date, 0, 0, true);
            }
         },
         {
            name: "amount_sale",
            label: t("cash_cutoff.table.field.amount_sale"),
            align: "center",
            field: "amount_sale",
            sortable: true,
            format: (amount_sale:string) => {
               return (amount_sale) ? "$" + amount_sale : "$0.00";
            }
         },
         {
            name: "amount_supplier",
            label: t("cash_cutoff.table.field.amount_supplier"),
            align: "center",
            field: "amount_supplier",
            sortable: true,
            format: (amount_supplier:string) => {
               return (amount_supplier) ? "$" + amount_supplier : "$0.00";
            }
         },
         {
            name: "user",
            label: t("cash_cutoff.table.field.user"),
            align: "center",
            sortable: true
         },
         {
            name: "actions",
            label: t("cash_cutoff.table.field.actions"),
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
      const getCashCutoffLoadedReply = computed(() => {
         return store.getters["getCashCutoffLoadedReply"];
      });

      const onRefreshData = () => {
         cashCutoff.value = [];

         axios.get<CashCutoffsResponse>(`${ getServer.value }/cash_cutoff/v3/select-all.php`,
            {
               headers: {
                  'Authorization': `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_cash_cutoff:Array<CashCutoff> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_user_open:User|null = format_user(data[i].user_open);
                     const formatted_user_Close:User|null = format_user(data[i].user_close);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_cash_cutoff.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        amount_open: data[i].amount_open,
                        amount_sale: data[i].amount_sale,
                        amount_supplier: data[i].amount_supplier,
                        amount_close: data[i].amount_close,
                        date_close: data[i].date_close,
                        id_type: data[i].id_type,
                        id_user_open: data[i].id_user_open,
                        id_user_close: data[i].id_user_close,
                        id_pos: data[i].id_pos,
                        id_branch: data[i].id_branch,
                        user_open: formatted_user_open,
                        user_close: formatted_user_Close,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
                  }

                  cashCutoff.value = formatted_cash_cutoff;
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
      // const onCashCutoffAddWindowClick = () => {
      //    window.api.send("cash-cutoff-module-window", {
      //       id: -1,
      //       type: "add",
      //       content: {
      //          title: t("cash_cutoff.window.add.title"),
      //          description: t("cash_cutoff.window.add.subtitle")
      //       },
      //       data: null
      //    });
      // };
      const onCashCutoffSeeWindowClick = (item:CashCutoff) => {
         window.api.send("cash-cutoff-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               amount_open: item.amount_open,
               amount_sale: item.amount_sale,
               amount_supplier: item.amount_supplier,
               amount_close: item.amount_close,
               date_close: item.date_close,
               id_type: item.id_type,
               id_user_open: item.id_user_open,
               id_user_close: item.id_user_close,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               user_open: { ...item.user_open },
               user_close: { ...item.user_close },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      // const onCashCutoffUpdateWindowClick = (item:CashCutoff) => {
      //    window.api.send("cash-cutoff-module-window", {
      //       id: item.id,
      //       type: "update",
      //       content: {
      //          title: t("cash_cutoff.window.update.title"),
      //          description: t("cash_cutoff.window.update.subtitle")
      //       },
      //       data: {
      //          id: item.id,
      //          is_active: item.is_active,
      //          created: item.created,
      //          updated: item.updated,
      //          amount_open: item.amount_open,
      //          amount_sale: item.amount_sale,
      //          amount_supplier: item.amount_supplier,
      //          amount_close: item.amount_close,
      //          date_close: item.date_close,
      //          id_type: item.id_type,
      //          id_user_open: item.id_user_open,
      //          id_user_close: item.id_user_close,
      //          id_pos: item.id_pos,
      //          id_branch: item.id_branch,
      //          user_open: { ...item.user_open },
      //          user_close: { ...item.user_close },
      //          pos: { ...item.pos },
      //          branch: { ...item.branch }
      //       }
      //    });
      // };
      // const onCashCutoffDeleteWindowClick = (item:CashCutoff) => {
      //    window.api.send("cash-cutoff-module-window", {
      //       id: item.id,
      //       type: "delete",
      //       data: {
      //          id: item.id,
      //          is_active: item.is_active,
      //          created: item.created,
      //          updated: item.updated,
      //          amount_open: item.amount_open,
      //          amount_sale: item.amount_sale,
      //          amount_supplier: item.amount_supplier,
      //          amount_close: item.amount_close,
      //          date_close: item.date_close,
      //          id_type: item.id_type,
      //          id_user_open: item.id_user_open,
      //          id_user_close: item.id_user_close,
      //          id_pos: item.id_pos,
      //          id_branch: item.id_branch,
      //          user_open: { ...item.user_open },
      //          user_close: { ...item.user_close },
      //          pos: { ...item.pos },
      //          branch: { ...item.branch }
      //       }
      //    });
      // };

      onRefreshData();
      if(!getCashCutoffLoadedReply.value) {
         window.api.receive("main-window-cash-cutoff-module-reply", (data:WindowResponse) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     cashCutoff.value.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < cashCutoff.value.length; i++) {
                     const curr_user_role = cashCutoff.value[i];
                     if(curr_user_role.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0) {
                     if(data.data) {
                        cashCutoff.value[finded_index].id = data.data.id;
                        cashCutoff.value[finded_index].is_active = data.data.is_active;
                        cashCutoff.value[finded_index].created = data.data.created;
                        cashCutoff.value[finded_index].updated = data.data.updated;
                        cashCutoff.value[finded_index].amount_open = data.data.amount_open;
                        cashCutoff.value[finded_index].amount_sale = data.data.amount_sale;
                        cashCutoff.value[finded_index].amount_supplier = data.data.amount_supplier;
                        cashCutoff.value[finded_index].amount_close = data.data.amount_close;
                        cashCutoff.value[finded_index].date_close = data.data.date_close;
                        cashCutoff.value[finded_index].id_type = data.data.id_type;
                        cashCutoff.value[finded_index].id_user_open = data.data.id_user_open;
                        cashCutoff.value[finded_index].id_user_close = data.data.id_user_close;
                        cashCutoff.value[finded_index].id_pos = data.data.id_pos;
                        cashCutoff.value[finded_index].id_branch = data.data.id_branch;
                        cashCutoff.value[finded_index].user_open = data.data.user_open;
                        cashCutoff.value[finded_index].user_close = data.data.user_close;
                        cashCutoff.value[finded_index].pos = data.data.pos;
                        cashCutoff.value[finded_index].branch = data.data.branch;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < cashCutoff.value.length; i++) {
                     const curr_user_role = cashCutoff.value[i];
                     if(curr_user_role.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index >= 0)
                  cashCutoff.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_CASH_CUTOFF_LOADED_REPLY", true);
      }

      return {
         t,
         cashCutoff,
         cashCutoffVisibleColumns,
         cashCutoffColumns,
         cashCutoffFilter,
         cashCutoffPagination,
         onRefreshData,
         // onCashCutoffAddWindowClick,
         onCashCutoffSeeWindowClick,
         // onCashCutoffUpdateWindowClick,
         // onCashCutoffDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
