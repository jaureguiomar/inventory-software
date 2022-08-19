<template lang="pug">
   MainContainer
      //- template(#menu)
      template(#content)
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
                           b-row(class="mb-1")
                              b-col(sm="3" class="text-sm-right")
                                 b Active?:
                              b-col {{ (row.item.is_active) ? row.item.is_active : "Unknown" }}
                           b-row(class="mb-1")
                              b-col(sm="3" class="text-sm-right")
                                 b Date Created:
                              b-col {{ (row.item.created) ? row.item.created : "---" }}
                           b-row(class="mb-1")
                              b-col(sm="3" class="text-sm-right")
                                 b Date Updated:
                              b-col {{ (row.item.updated) ? row.item.updated : "---" }}
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
                              b-col {{ row.item.cellphone2 }}
                           b-row(class="mb-1")
                              b-col(sm="3" class="text-sm-right")
                                 b Email:
                              b-col {{ row.item.email }}
                     template(#cell(actions)="row")
                        a(class="btn btn-primary mr-2" href="#_" @click="onClientUpdateWindowClick(row.item)")
                           <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        a(class="btn btn-danger" href="#_" @click="onClientDeleteWindowClick(row.item)")
                           <font-awesome-icon icon="fa-solid fa-xmark" />

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
import MainContainer from "../views/layout/MainContainer.vue";
import Content from "../views/layout/Content.vue";

export default Vue.extend({
   name: "client-component",
   components: {
      MainContainer,
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
         "getSomeData"
      ])
   },
   created() {
      const vue_this = this;
      Vue.prototype.$http.get("client/v3/select-all.php")
         .then(function (response:AxiosResponse) {
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data;
                  vue_this.data.client = data.data;
                  vue_this.table.totalRows = data.data.length;
               } else {
                  // vue_this.$fire({
                  //    title: "Error",
                  //    text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
                  //    type: "error"
                  // });
               }
            } else {
               // vue_this.$fire({
               //    title: "Error",
               //    text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
               //    type: "error"
               // });
            }
         });

      window.api.receive("main-window-client-add-update-reply", (data:WindowResponse) => {
         if(data.result === "success") {
            if(data.type === "create") {
               vue_this.data.client.push(data.data);
            } else if(data.type === "update") {
               for(let i = 0; i < vue_this.data.client.length; i++) {
                  const curr_client = vue_this.data.client[i];
                  if(curr_client.id === data.data.id) {
                     vue_this.data.client[i].id = curr_client.id;
                     vue_this.data.client[i].is_active = curr_client.id;
                     vue_this.data.client[i].created = curr_client.created;
                     vue_this.data.client[i].updated = curr_client.updated;
                     vue_this.data.client[i].first_name = curr_client.first_name;
                     vue_this.data.client[i].last_name = curr_client.last_name;
                     vue_this.data.client[i].address = curr_client.address;
                     vue_this.data.client[i].cellphone = curr_client.cellphone;
                     vue_this.data.client[i].cellphone2 = curr_client.cellphone2;
                     vue_this.data.client[i].email = curr_client.email;
                     break;
                  }
               }
            } else if(data.type === "delete") {
               for(let i = 0; i < vue_this.data.client.length; i++) {
                  const curr_client = vue_this.data.client[i];
                  if(curr_client.id === data.data.id) {
                     vue_this.data.client.splice(i, 1);
                     break;
                  }
               }
            }
         }
      });
   },
   methods: {
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
      getFormattedDateString(date:string, type:number=0, format:number=0) {
         let new_date = date;
         if(new_date) {
            const splitted_date = date.split("-");
            if(splitted_date.length === 3) {
               let day:number|string = parseInt(splitted_date[2]);
               let month:number|string = parseInt(splitted_date[1]);
               const year:number = parseInt(splitted_date[0]);

               if(day < 10)
                  day = "0" + day;

               if(type === 0) {
                  switch(month) {
                     case 1: month = "Enero"; break;
                     case 2: month = "Febrero"; break;
                     case 3: month = "Marzo"; break;
                     case 4: month = "Abril"; break;
                     case 5: month = "Mayo"; break;
                     case 6: month = "Junio"; break;
                     case 7: month = "Julio"; break;
                     case 8: month = "Agosto"; break;
                     case 9: month = "Septiembre"; break;
                     case 10: month = "Octubre"; break;
                     case 11: month = "Noviembre"; break;
                     case 12: month = "Diciembre"; break;
                  }
               } else {
                  if(month < 10)
                     month = "0" + month;
               }

               if(format === 0)
                  new_date = day + "/" + month + "/" + year;
               else if(format === 1)
                  new_date = year + "-" + month + "-" + day;
            }
         } else {
            new_date = "----";
         }
         return new_date;
      }
   }
});
</script>

<style lang="sass" scoped>
   .main-container
      width: 100%
      height: 100vh
      display: block
      padding: 16px
      background: #5cdb94
      .banner
         width: 100%
         height: auto
         display: block
         background: #05386b
         color: #edf5e1
         padding: 40px
         border-radius: 10px
         display: flex
         flex-direction: row
         align-items: center
         font-size: 26px
         font-weight: bold
         margin-bottom: 10px
         transition: 0.3s
         &:hover
            box-shadow: 5px 5px #379683
         .logo
            background: #5cdb94
            color: #edf5e1
            padding: 20px
            border-radius: 10px
            margin-right: 20px
            transition: 0.3s
            &:hover
               cursor: pointer
               background: #05386b
      .menu
         width: 100%
         height: auto
         display: block
         background: #edf5e1
         border-radius: 10px
         padding: 20px 40px
         margin-bottom: 10px
         transition: 0.3s
         &:hover
            box-shadow: 5px 5px #379683
         .title
            font-size: 26px
            font-weight: bold
            color: #edf5e1
            border-radius: 4px
            transition: 0.3s
            background: linear-gradient(to left, #5cdb94 50%, #05386b 50%) right
            background-size: 200%
            transition: .5s ease-out
            display: flex
            flex-direction: row
            align-items: center
            justify-content: space-between
            &:hover
               background-position: left
            // .left-content
            .right-content
               margin-right: 20px
               a
                  color: #edf5e1
                  transition: 0.3s
                  &:hover
                     color: #5cdb94
                  &:not(:last-child)
                     margin-right: 20px
         .subtitle
            font-size: 19px
            color: #05386b
      .content
         width: 100%
         height: auto
         display: block
         background: #edf5e1
         border-radius: 10px
         transition: 0.3s
         &:hover
            box-shadow: 5px 5px #379683
         label
            color: #05386b
            font-weight: bold
         .border-top
            background: #05386b
            height: 20px
            border-start-start-radius: 10px
            border-start-end-radius: 10px
         .content-container
            padding: 40px 36px
</style>
