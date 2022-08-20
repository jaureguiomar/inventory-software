<template lang="pug">
   div.main-container
      Banner
      Menu
         template(#left-content)
            router-link(to="/")
               font-awesome-icon(icon="fa-solid fa-arrow-left")
            p Clients
         template(#right-content)
            a(href="#_" @click="onClientAddWindowClick")
               font-awesome-icon(icon="fa-solid fa-plus")
            a(href="#_" @click="onRefreshData")
               font-awesome-icon(icon="fa-solid fa-arrows-rotate")
         template(#subtitle) Descriptions about the clients view
      Content
         template(#content)
            b-row
               b-col(lg="6" class="mb-2")
                  b-form-input(
                     id="filter-input"
                     v-model="table.filter"
                     type="search"
                     size="sm"
                     placeholder="Search..."
                  )
               b-col(lg="6" class="mb-2")
                  b-form-select(
                     id="per-page-select"
                     v-model="table.perPage"
                     :options="table.pageOptions"
                     size="sm")

            div.table-responsive
               //- selectable
               //- :select-mode="'single'"
               //- @row-selected="onRowClick"
               b-table(
                  :items="data.client"
                  :fields="table.fields"
                  :current-page="table.currentPage"
                  :per-page="table.perPage"
                  :filter="table.filter"
                  :filter-included-fields="table.filterOn"
                  :sort-by.sync="table.sortBy"
                  :sort-desc.sync="table.sortDesc"
                  :sort-direction="table.sortDirection"
                  stacked="md"
                  show-empty
                  empty-text="Theres no data to display"
                  empty-filtered-text="Theres no data to display"
                  small
                  filter-debounce="600"
                  @filtered="onFiltered"
                  hover
               )
                  template(#cell(details)="row")
                     b-button(class="mr-2" variant="primary" size="sm" @click="row.toggleDetails") {{ row.detailsShowing ? "Hide" : "Show" }} details
                  template(#row-details="row")
                     b-card
                        b-row(class="mb-1")
                           b-col(sm="3" class="text-sm-right")
                              b # Client:
                           b-col {{ row.item.id }}
                        //- b-row(class="mb-1")
                        //-    b-col(sm="3" class="text-sm-right")
                        //-       b Active?:
                        //-    b-col {{ (row.item.is_active) ? row.item.is_active : "---" }}
                        b-row(class="mb-1")
                           b-col(sm="3" class="text-sm-right")
                              b Date Created:
                           b-col {{ (row.item.created) ? getFormattedDateString(row.item.created, 0, 0, true) : "---" }}
                        b-row(class="mb-1")
                           b-col(sm="3" class="text-sm-right")
                              b Date Updated:
                           b-col {{ (row.item.updated) ? getFormattedDateString(row.item.updated, 0, 0, true) : "---" }}
                        b-row(class="mb-1")
                           b-col(sm="3" class="text-sm-right")
                              b First Name:
                           b-col {{ row.item.first_name }}
                        b-row(class="mb-1")
                           b-col(sm="3" class="text-sm-right")
                              b Last Name:
                           b-col {{ row.item.last_name }}
                        b-row(class="mb-1")
                           b-col(sm="3" class="text-sm-right")
                              b Address:
                           b-col {{ row.item.address }}
                        b-row(class="mb-1")
                           b-col(sm="3" class="text-sm-right")
                              b Cellphone:
                           b-col {{ row.item.cellphone }}
                        b-row(class="mb-1")
                           b-col(sm="3" class="text-sm-right")
                              b Cellphone 2:
                           b-col {{ (row.item.cellphone2) ? row.item.cellphone2 : "---" }}
                        b-row(class="mb-1")
                           b-col(sm="3" class="text-sm-right")
                              b Email:
                           b-col {{ row.item.email }}
                  template(#cell(actions)="row")
                     a(class="btn btn-primary mr-2" href="#_" @click="onClientUpdateWindowClick(row.item)")
                        font-awesome-icon(icon="fa-solid fa-pen-to-square")
                     a(class="btn btn-danger" href="#_" @click="onClientDeleteWindowClick(row.item)")
                        font-awesome-icon(icon="fa-solid fa-xmark")

               b-col(sm="12" md="12" class="my-1")
                  b-pagination(
                     v-model="table.currentPage"
                     :total-rows="table.totalRows"
                     :per-page="table.perPage"
                     align="right"
                     size="sm"
                     class="my-0 customPagination"
                  )
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex";
import { Props, AxiosResponse, WindowResponse, Client } from "../interfaces/client/client";
import Banner from "../views/layout/Banner.vue";
import Menu from "../views/layout/Menu.vue";
import Content from "../views/layout/Content.vue";

export default Vue.extend({
   name: "client-component",
   components: {
      Banner,
      Menu,
      Content
   },
   data() {
      return {
         data: {
            client: [],
            new_client: {}
         },
         table: {
            selected: -1,
            fields: [
               { key: "id", label: "ID Client", sortable: true, sortDirection: "desc", class: "text-center" },
               {
                  key: "created",
                  label: "Created",
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
                              day = "0" + 10;
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
               { key: "first_name", label: "First Name", sortable: true, class: "text-center" },
               { key: "last_name", label: "Last Name", sortable: true, class: "text-center" },
               { key: "details", label: "Show details", sortable: true, class: "text-center" },
               { key: "actions", label: "Actions", sortable: false, class: "text-center" }
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
         }
      } as unknown as Props
   },
   computed: {
      ...mapGetters([
         "getClientLoadedReply"
      ])
   },
   created() {
      this.onRefreshData();

      if(!this.getClientLoadedReply) {
         const vue_this = this;
         window.api.receive("main-window-client-module-reply", (data:WindowResponse) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     vue_this.data.client.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < vue_this.data.client.length; i++) {
                     const curr_client = vue_this.data.client[i];
                     if(curr_client.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0) {
                     if(data.data) {
                        vue_this.data.client[finded_index].id = data.data.id;
                        vue_this.data.client[finded_index].is_active = data.data.is_active;
                        vue_this.data.client[finded_index].created = data.data.created;
                        vue_this.data.client[finded_index].updated = data.data.updated;
                        vue_this.data.client[finded_index].first_name = data.data.first_name;
                        vue_this.data.client[finded_index].last_name = data.data.last_name;
                        vue_this.data.client[finded_index].address = data.data.address;
                        vue_this.data.client[finded_index].cellphone = data.data.cellphone;
                        vue_this.data.client[finded_index].cellphone2 = data.data.cellphone2;
                        vue_this.data.client[finded_index].email = data.data.email;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < vue_this.data.client.length; i++) {
                     const curr_client = vue_this.data.client[i];
                     if(curr_client.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0)
                     vue_this.data.client.splice(finded_index, 1);
               }
            }
         });
         this.$store.commit("SET_CLIENTT_LOADED_REPLY", true);
      }
   },
   methods: {
      onRefreshData() {
         const vue_this = this;
         this.data.client = [];

         Vue.prototype.$http.get("client/v3/select-all.php")
            .then(function (response:AxiosResponse) {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data;
                     vue_this.data.client = data.data;
                     vue_this.table.totalRows = data.data.length;
                  } else {
                     vue_this.$fire({
                        title: "Error",
                        text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
                        type: "error"
                     });
                  }
               } else {
                  vue_this.$fire({
                     title: "Error",
                     text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
                     type: "error"
                  });
               }
            });
      },
      onClientAddWindowClick() {
         window.api.send("client-module-window", {
            id: -1,
            type: "add",
            content: {
               title: "Add Client",
               description: "The clients that will be added for the use of the system"
            },
            data: null
         });
      },
      onClientUpdateWindowClick(item:Client) {
         window.api.send("client-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: "Update Client",
               description: "The clients that will be updated for the use of the system"
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
      },
      onClientDeleteWindowClick(item:Client) {
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
      },
      onFiltered(filteredItems) {
        this.table.totalRows = filteredItems.length;
        this.table.currentPage = 1;
      },
      // onRowClick(selected_data) {
      //    console.error("---");
      //    console.log("selected_data", selected_data);
      // },
      ///////////////
      // Functions //
      getFormattedDate(date:Date) {
         let day:number|string = date.getDate();
         let month:number|string = (date.getMonth() + 1);
         let year:number|string = date.getFullYear();

         if(day < 10)
            day = "0" + day;
         if(month < 10)
            month = "0" + month;

         return year + "-" + month + "-" + day;
      },
      getFormattedDateString(date:string, type:number=0, format:number=0, time=false) {
         let new_date = date;
         if(new_date) {
            const splitted_date = date.split("-");
            const splitted_time = date.split(" ");
            if(splitted_date.length === 3) {
               let day:number|string = parseInt(splitted_date[2]);
               let month:number|string = parseInt(splitted_date[1]);
               const year:number = parseInt(splitted_date[0]);

               if(day < 10)
                  day = "0" + day;

               if(type === 0) {
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
               } else {
                  if(month < 10)
                     month = "0" + month;
               }

               if(format === 0)
                  new_date = day + "/" + month + "/" + year;
               else if(format === 1)
                  new_date = year + "-" + month + "-" + day;

               if(time) {
                  const time = splitted_time[1];
                  new_date += " ";
                  new_date += time;
               }
            }
         } else {
            new_date = "----";
         }
         return new_date;
      }
   }
});
</script>

<style lang="sass" scoped></style>
