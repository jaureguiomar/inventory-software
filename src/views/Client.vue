<template lang="pug">
   div.crud-container
      div.banner
         div.title
            router-link(to="/")
               <font-awesome-icon icon="fa-solid fa-arrow-left" size="2x" />
            h1 Clients
         div.actions
            a(href="#_" @click="onClientAddWindowClick")
               <font-awesome-icon icon="fa-solid fa-users" size="2x" />
            a(href="#_" @click="onClientUpdateWindowClick")
               <font-awesome-icon icon="fa-solid fa-users" size="2x" />
            router-link(to="/")
               <font-awesome-icon icon="fa-solid fa-arrow-left" size="2x" />

      div.content
         b-row(align-h="end")
            b-col(lg="7" class="mb-2")
               b-form-group(
                  label="Filtrar"
                  label-for="filter-input"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  class="mb-0"
               )
                  b-input-group(size="sm")
                     b-form-input(
                        id="filter-input"
                        v-model="table.filter"
                        type="search"
                        placeholder="Buscar..."
                     )
                     b-input-group-append
                        b-button(:disabled="!table.filter" @click="table.filter=''") Limpiar
            b-col(sm="5" md="5" class="mb-2")
               b-form-select(
                  id="per-page-select"
                  v-model="table.perPage"
                  :options="table.pageOptions"
                  size="sm"
               )

         div.table-responsive
            b-table(
               :items="data.sale"
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
               @filtered="onFiltered"
               selectable
               ref="selectableTable"
               :select-mode="'single'"
               @row-selected="onSaleRowClick"
            )
               template(#cell(name)="row") {{ row.value.first }} {{ row.value.last }}
               template(#cell(actions)="row")
                  b-button(
                     size="sm"
                     @click="info(row.item, row.index, $event.target)"
                     class="mr-1"
                  ) Info modal
                  b-button(
                     size="sm"
                     @click="row.toggleDetails"
                  ) {{ row.detailsShowing ? 'Hide' : 'Show' }} Details

               template(#row-details="row")
                  b-card
                     ul
                        li(v-for="(value, key) in row.item" :key="key") {{ key }}: {{ value }}
</template>

<script lang="ts">
import Vue from "vue";
// import Header from "@/views/layout/Header.vue";
// import Footer from "@/views/layout/Footer.vue";

interface Mesero {
   nombre: string;
   apellidos: string;
}
// interface Venta {
// }

export default Vue.extend({
   name: "home-component",
   data() {
      return {
         data: {
            sale: [],
            new_sale: {}
         },
         table: {
            selected: -1,
            fields: [
               { key: "idventa", label: "No. de Venta", sortable: true, sortDirection: "desc", class: "text-center" },
               {
                  key: "mesero",
                  label: "Mesero",
                  sortable: true,
                  sortByFormatted: true,
                  filterByFormatted: true,
                  class: "text-center",
                  formatter: (mesero:Mesero) => {
                     return mesero.nombre + " " + mesero.apellidos;
                  }
               },
               { key: "status", label: "Status", sortable: true, class: "text-center" },
               {
                  key: "total",
                  label: "Total",
                  sortable: false,
                  sortByFormatted: true,
                  filterByFormatted: true,
                  class: "text-center",
                  formatter: (total:string) => {
                     return "$" + total;
                  }
               },
               {
                  key: "fecha_final",
                  label: "Fecha",
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
                           new_date = day + "/" + month + "/" + year;
                        }
                     } else {
                        new_date = "----";
                     }
                     return new_date;
                  }
               },
               {
                  key: "hora_final",
                  label: "Hora",
                  sortable: false,
                  sortByFormatted: true,
                  filterByFormatted: true,
                  class: "text-center",
                  formatter: (time:string) => {
                     if(!time)
                        return "----";
                     else
                        return time;
                  }
               }
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
      }
   },
   created() {
      const vue_this = this;
      Vue.prototype.$http.get("Rutes/venta_ventas")
         .then(function (response) {
            if(response) {
               const data = response.data;
               console.log("data", data);
               vue_this.data.sale = data;
               vue_this.table.totalRows = vue_this.data.sale.length;
            } else {
               // vue_this.$fire({
               //    title: "Error",
               //    text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
               //    type: "error"
               // });
            }
         });
   },
   methods: {
      onClientAddWindowClick() {
         window.api.send("client-add-update-window");
      },
      onClientUpdateWindowClick() {
         window.api.send("client-add-update-window");
      },
      onFiltered(filteredItems) {
        this.table.totalRows = filteredItems.length;
        this.table.currentPage = 1;
      },
      onSaleRowClick(selected_sale) {
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
