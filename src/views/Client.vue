<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p>{{ t("client.title") }}</p>
         </template>
         <template #right-content>
            <a href="#_" @click="onClientAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a href="#_" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("client.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <b-row>
               <b-col class="mb-2" lg="6">
                  <b-form-input
                     id="filter-input"
                     v-model="table.filter"
                     type="search"
                     size="sm"
                     :placeholder="t('client.table.search')"
                  >
                  </b-form-input>
               </b-col>
               <b-col class="mb-2" lg="6">
                  <b-form-select
                     id="per-page-select"
                     v-model="table.perPage"
                     :options="table.pageOptions"
                     size="sm"
                  >
                  </b-form-select>
               </b-col>
            </b-row>
            <div class="table-responsive">
               <b-table
                  :sort-by="table.sortBy"
                  :sort-desc="table.sortDesc"
                  :items="client"
                  :fields="table.fields"
                  :current-page="table.currentPage"
                  :per-page="table.perPage"
                  :filter="table.filter"
                  :filter-included-fields="table.filterOn"
                  :sort-direction="table.sortDirection"
                  stacked="md"
                  show-emptya="show-emptya"
                  :empty-text="t('client.table.content.details.empty')"
                  :empty-filtered-text="t('client.table.content.details.empty')"
                  small="small"
                  filter-debounce="600"
                  hover="hover"
                  @filtered="onFiltered"
               >
                  <template #cell(details)="row">
                     <b-button
                        class="mr-2"
                        variant="primary"
                        size="sm"
                        @click="row.toggleDetails"
                     >
                        {{ row.detailsShowing ? t("client.table.content.details.hide_details") : t("client.table.content.details.show_details") }}
                     </b-button>
                  </template>
                  <template #row-details="row">
                     <b-card>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ t("client.table.content.id") }}:</b></b-col>
                           <b-col>{{ row.item.id }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ t("client.table.content.created") }}:</b></b-col>
                           <b-col>{{ (row.item.created) ? getFormattedDateString(row.item.created, 0, 0, true) : "---" }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ t("client.table.content.updated") }}:</b></b-col>
                           <b-col>{{ (row.item.updated) ? getFormattedDateString(row.item.updated, 0, 0, true) : "---" }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ t("client.table.content.first_name") }}:</b></b-col>
                           <b-col>{{ row.item.first_name }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ t("client.table.content.last_name") }}:</b></b-col>
                           <b-col>{{ row.item.last_name }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ t("client.table.content.address") }}:</b></b-col>
                           <b-col>{{ row.item.address }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ t("client.table.content.cellphone") }}:</b></b-col>
                           <b-col>{{ row.item.cellphone }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ t("client.table.content.cellphone2") }}:</b></b-col>
                           <b-col>{{ (row.item.cellphone2) ? row.item.cellphone2 : "---" }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ t("client.table.content.email") }}:</b></b-col>
                           <b-col>{{ row.item.email }}</b-col>
                        </b-row>
                     </b-card>
                  </template>
                  <template #cell(actions)="row">
                     <a class="btn btn-success mr-2" style="color: white;" href="#_" @click="onClienSeeWindowClick(row.item)">
                        <font-awesome-icon icon="fa-solid fa-eye"></font-awesome-icon>
                     </a>
                     <a class="btn btn-primary mr-2" href="#_" @click="onClientUpdateWindowClick(row.item)">
                        <font-awesome-icon icon="fa-solid fa-pen-to-square"></font-awesome-icon>
                     </a>
                     <a class="btn btn-danger" href="#_" @click="onClientDeleteWindowClick(row.item)">
                        <font-awesome-icon icon="fa-solid fa-xmark"></font-awesome-icon>
                     </a>
                  </template>
               </b-table>

               <b-col class="my-1" sm="12" md="12">
                  <b-pagination
                     v-model="table.currentPage"
                     class="my-0 customPagination"
                     :total-rows="table.totalRows"
                     :per-page="table.perPage"
                     align="right"
                     size="sm"
                  >
                  </b-pagination>
               </b-col>
            </div>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, reactive, computed } from "vue"
import { AxiosResponse, WindowResponse, Client } from "../interfaces/client/client";
import Banner from "../views/layout/Banner.vue";
import Menu from "../views/layout/Menu.vue";
import Content from "../views/layout/Content.vue";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins";

export default defineComponent({
   name: "client-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const client = ref<Client[]>([]);
      const new_client = reactive<Client|Object>({});
      const table = reactive<any>({
         selected: -1,
         fields: [
            {
               key: "id",
               label: t("client.table.field.id"),
               sortable: true,
               sortDirection: "desc",
               class: "text-center"
            },
            {
               key: "created",
               label: t("client.table.field.created"),
               sortable: false,
               sortByFormatted: true,
               filterByFormatted: true,
               class: "text-center",
               formatter: (date:string) => {
                  let new_date:string|number = date;
                  if(new_date) {
                     const splitted_date = date.split("-");
                     if(splitted_date.length === 3) {
                        let day:string|number = parseInt(splitted_date[2]);
                        let month:string|number = parseInt(splitted_date[1]);
                        const year:number = parseInt(splitted_date[0]);
                        if(day < 10)
                           day = "0" + day;
                        switch(month) {
                           case 1: month = "January"; break;
                           case 2: month = "February"; break;
                           case 3: month = "March"; break;
                           case 4: month = "April"; break;
                           case 5: month = "May"; break;
                           case 6: month = "June"; break;
                           case 7: month = "July"; break;
                           case 8: month = "August"; break;
                           case 9: month = "September"; break;
                           case 10: month = "October"; break;
                           case 11: month = "November"; break;
                           case 12: month = "December"; break;
                        }
                        new_date = day + "/" + month + "/" + year;
                     }
                  } else {
                     new_date = "----";
                  }
                  return new_date;
               }
            },
            {
               key: "first_name",
               label: t("client.table.field.first_name"),
               sortable: true,
               class: "text-center"
            },
            {
               key: "last_name",
               label: t("client.table.field.last_name"),
               sortable: true,
               class: "text-center"
            },
            {
               key: "details",
               label: t("client.table.field.show_details"),
               sortable: true,
               class: "text-center"
            },
            {
               key: "actions",
               label: t("client.table.field.actions"),
               sortable: false,
               class: "text-center"
            }
         ],
         totalRows: 1,
         currentPage: 1,
         perPage: 5,
         pageOptions: [
            5, 10, 15,
            { value: 100, text: "Show all" }
         ],
         sortBy: "id",
         sortDesc: true,
         sortDirection: "desc",
         filter: null,
         filterOn: []
      });

      const getClientLoadedReply = computed(() => {
         return store.getters["getClientLoadedReply"];
      });

      const onRefreshData = () => {
         client.value = [];

         axios.get<AxiosResponse>("http://127.0.0.1/inventory-software-api/api/client/v3/select-all.php")
            .then((response) => {
               console.log("response", response);
               // if(response) {
               //    if(!response.data.error.is_error) {
               //       const data = response.data;
               //       client = data.data;
               //       table.totalRows = data.data.length;
               //    } else {
               //       Swal.fire({
               //          title: "Error",
               //          text: t("global.default_error") as string,
               //          icon: "error"
               //       });
               //    }
               // } else {
               //    Swal.fire({
               //       title: "Error",
               //       text: t("global.default_error") as string,
               //       icon: "error"
               //    });
               // }

               Swal.fire({
                  title: "Error",
                  text: t("global.default_error") as string,
                  icon: "error"
               });
            });
      };
      const onClientAddWindowClick = () => {
         window.api.send("client-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("client.window.add.title"),
               description: t("client.window.add.subtitle")
            },
            data: null
         });
      };
      const onClienSeeWindowClick = (item:Client) => {
         window.api.send("client-module-window", {
            id: item.id,
            type: "see",
            data: {
               first_name: item.first_name,
               last_name: item.last_name,
               address: item.address,
               cellphone: item.cellphone,
               cellphone2: item.cellphone2,
               email: item.email
            }
         });
      };
      const onClientUpdateWindowClick = (item:Client) => {
         window.api.send("client-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("client.window.update.title"),
               description: t("client.window.update.subtitle")
            },
            data: {
               first_name: item.first_name,
               last_name: item.last_name,
               address: item.address,
               cellphone: item.cellphone,
               cellphone2: item.cellphone2,
               email: item.email
            }
         });
      };
      const onClientDeleteWindowClick = (item:Client) => {
         window.api.send("client-module-window", {
            id: item.id,
            type: "delete",
            data: {
               first_name: item.first_name,
               last_name: item.last_name,
               address: item.address,
               cellphone: item.cellphone,
               cellphone2: item.cellphone2,
               email: item.email
            }
         });
      };
      const onFiltered = (filteredItems) => {
        table.totalRows = filteredItems.length;
        table.currentPage = 1;
      };
      // onRowClick(selected_data) {
      //    console.error("---");
      //    console.log("selected_data", selected_data);
      // };

      onRefreshData();
      if(!getClientLoadedReply) {
         window.api.receive("main-window-client-module-reply", (data:WindowResponse) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     client.value.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < client.value.length; i++) {
                     const curr_client = client.value[i];
                     if(curr_client.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0) {
                     if(data.data) {
                        client.value[finded_index].id = data.data.id;
                        client.value[finded_index].is_active = data.data.is_active;
                        client.value[finded_index].created = data.data.created;
                        client.value[finded_index].updated = data.data.updated;
                        client.value[finded_index].first_name = data.data.first_name;
                        client.value[finded_index].last_name = data.data.last_name;
                        client.value[finded_index].address = data.data.address;
                        client.value[finded_index].cellphone = data.data.cellphone;
                        client.value[finded_index].cellphone2 = data.data.cellphone2;
                        client.value[finded_index].email = data.data.email;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < client.value.length; i++) {
                     const curr_client = client.value[i];
                     if(curr_client.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0)
                     client.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_CLIENT_LOADED_REPLY", true);
      }

      return {
         t,
         client,
         new_client,
         table,
         getClientLoadedReply,
         onRefreshData,
         onClientAddWindowClick,
         onClienSeeWindowClick,
         onClientUpdateWindowClick,
         onClientDeleteWindowClick,
         onFiltered,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
