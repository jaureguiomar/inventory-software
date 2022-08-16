<template lang="pug">
   div.crud-container
      div.banner
         div.title
            router-link(to="/")
               <font-awesome-icon icon="fa-solid fa-arrow-left" size="2x" />
            h1 Clients {{ getSomeData }}
         div.actions
            a(href="#_" @click="onClientAddWindowClick")
               <font-awesome-icon icon="fa-solid fa-users" size="2x" />
            a(href="#_" @click="onClientUpdateWindowClick")
               <font-awesome-icon icon="fa-solid fa-users" size="2x" />

      div.content
         b-row(align-h="end")
            b-col(lg="12" class="mb-2")
               //- b-form-datepicker(
               //-    size="sm"
               //-    placeholder="Selecciona fecha inicial"
               //-    locale="es"
               //- )
               //- b-form-datepicker(
               //-    size="sm"
               //-    placeholder="Selecciona fecha final"
               //-    locale="es"
               //- )
               b-form-input(
                  id="filter-input"
                  v-model="table.filter"
                  type="search"
                  size="sm"
                  placeholder="Buscar..."
               )
               b-form-select(
                  id="per-page-select"
                  v-model="table.perPage"
                  :options="table.pageOptions"
                  size="sm")

         div.table-responsive
            b-table(
               ref="selectableTable"
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
               empty-text="No hay registros disponibles para mostrar"
               empty-filtered-text="No hay registros disponibles para mostrar"
               small
               selectable
               filter-debounce="600"
               :select-mode="'single'"
               @filtered="onFiltered"
               @row-selected="onRowClick"
            )
               template(#cell(details)="row")
                  b-button(class="mr-2" variant="primary" size="sm" @click="row.toggleDetails") {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} detalles

               template(#row-details="row")
                  b-card
                     b-row(class="mb-1")
                        b-col(sm="3" class="text-sm-right")
                           b # Client:
                        b-col {{ row.item.id }}
                     b-row(class="mb-1")
                        b-col(sm="3" class="text-sm-right")
                           b Active?:
                        b-col {{ row.item.is_active }}
                     b-row(class="mb-1")
                        b-col(sm="3" class="text-sm-right")
                           b Date Created:
                        b-col {{ row.item.created }}
                     b-row(class="mb-1")
                        b-col(sm="3" class="text-sm-right")
                           b Date Updated:
                        b-col {{ row.item.updated }}
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
import { Props, AxiosResponse } from "../interfaces/client/client";

export default Vue.extend({
   name: "client-component",
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
               { key: "details", label: "Show details", sortable: true, class: "text-center" }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [
               5, 10, 15,
               { value: 100, text: "Mostrar todo" }
            ],
            sortBy: "idventa",
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

      window.api.receive("main-window-client-add-update-reply", (data) => {
         vue_this.$store.commit("SET_SOME_DATA_DATA", "New value");
         vue_this.data.client.push(data.data);
      });
   },
   methods: {
      onClientAddWindowClick() {
         window.api.send("client-add-update-window", {
            id: -1,
            content: {
               title: "Add Client",
               description: "The clients that will be added for the use of the system"
            },
            data: null
         });
      },
      onClientUpdateWindowClick() {
         window.api.send("client-add-update-window", {
            id: 10,
            content: {
               title: "Update Client",
               description: "The clients that will be updated for the use of the system"
            },
            data: {
               first_name: "Omar Misael",
               last_name: "Torres Jauregui",
               address: "Florido 3ra secc",
               cellphone: "6641309641",
               cellphone2: "6644877638",
               email: "omarmisael.1997@gmail.com"
            }
         });
      },
      onFiltered(filteredItems) {
        this.table.totalRows = filteredItems.length;
        this.table.currentPage = 1;
      },
      onRowClick(selected_sale) {
         console.error("---");
         console.log("selected_sale", selected_sale);
         // // if(this.table.selected == selected_sale.idventa)
         // //    return;

         // if(selected_sale.length > 0) {
         //    let index = -1;
         //    selected_sale = selected_sale[0];

         //    for(let i = 0; i < this.data.sale.length; i++) {
         //       const curr_oder = this.data.sale[i];
         //       if(selected_sale.idventa == curr_oder.idventa) {
         //          index = i;
         //          break;
         //       }
         //    }

         //    this.data.new_sale = false;
         //    this.table.selected = selected_sale.idventa;

         //    const vue_this = this;
         //    Vue.prototype.$http.post("Ventas/get_by_id/" + this.table.selected)
         //       .then(function (response) {
         //          if(response) {
         //             const data = response.data;
         //             vue_this.data.curr_sale = data;
         //             vue_this.data.curr_sale_index = index;
         //          } else {
         //             this.$fire({
         //                title: "Error",
         //                text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
         //                type: "error"
         //             });
         //          }
         //       });
         // } else {
         //    this.data.new_sale = false;
         //    this.table.selected = -1;
         // }
      },
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
   .crud-container
      padding: 20px 40px
      .banner
         display: flex
         flex-direction: row
         align-items: center
         justify-content: space-between
         border: 1px solid black
         padding: 10px
         border-radius: 5px
         background: black
         color: white
         .title
            display: flex
            flex-direction: row
            align-items: center
            position: relative
            h1
               margin-left: 10px
               font-size: 30px
               margin: 0
               padding: 0
               margin-left: 27px
               margin-right: 10px
            a
               text-decoration: none
               color: white
               font-size: 10px
               position: absolute
               top: 10px
         .actions
            a
               text-decoration: none
               color: white
               &:not(:last-child)
                  margin-right: 10px
</style>
