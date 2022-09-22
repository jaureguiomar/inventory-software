<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p>{{ $t("category.title") }}</p>
         </template>
         <template #right-content>
            <a href="#_" @click="onCategoryAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a href="#_" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ $t("category.subtitle") }}
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
                     :placeholder="$t('category.table.search')"
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
                  v-model:sort-by.sync="table.sortBy"
                  v-model:sort-desc.sync="table.sortDesc"
                  :items="data.category"
                  :fields="table.fields"
                  :current-page="table.currentPage"
                  :per-page="table.perPage"
                  :filter="table.filter"
                  :filter-included-fields="table.filterOn"
                  :sort-direction="table.sortDirection"
                  stacked="md"
                  show-emptya="show-emptya"
                  :empty-text="$t('category.table.content.details.empty')"
                  :empty-filtered-text="$t('category.table.content.details.empty')"
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
                        {{ row.detailsShowing ? $t("category.table.content.details.hide_details") : $t("category.table.content.details.show_details") }}
                     </b-button>
                  </template>
                  <template #row-details="row">
                     <b-card>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ $t("category.table.content.id") }}:</b></b-col>
                           <b-col>{{ row.item.id }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ $t("category.table.content.created") }}:</b></b-col>
                           <b-col>{{ (row.item.created) ? getFormattedDateString(row.item.created, 0, 0, true) : "---" }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ $t("category.table.content.updated") }}:</b></b-col>
                           <b-col>{{ (row.item.updated) ? getFormattedDateString(row.item.updated, 0, 0, true) : "---" }}</b-col>
                        </b-row>
                        <b-row class="mb-1">
                           <b-col class="text-sm-right" sm="3"><b>{{ $t("category.table.content.name") }}:</b></b-col>
                           <b-col>{{ row.item.name }}</b-col>
                        </b-row>
                     </b-card>
                  </template>
                  <template #cell(actions)="row">
                     <a class="btn btn-success mr-2" style="color: white;" href="#_" @click="onCategorySeeWindowClick(row.item)">
                        <font-awesome-icon icon="fa-solid fa-eye"></font-awesome-icon>
                     </a>
                     <a class="btn btn-primary mr-2" href="#_" @click="onCategoryUpdateWindowClick(row.item)">
                        <font-awesome-icon icon="fa-solid fa-pen-to-square"></font-awesome-icon>
                     </a>
                     <a class="btn btn-danger" href="#_" @click="onCategoryDeleteWindowClick(row.item)">
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
import Vue, { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Props, AxiosResponse, WindowResponse, Category } from "../interfaces/category/category";
import Banner from "../views/layout/Banner.vue";
import Menu from "../views/layout/Menu.vue";
import Content from "../views/layout/Content.vue";

export default defineComponent({
   name: "category-component",
   components: {
      Banner,
      Menu,
      Content
   },
   data() {
      return {
         data: {
            category: [],
            new_category: {}
         },
         table: {
            selected: -1,
            fields: [
               {
                  key: "id",
                  label: this.$t("category.table.field.id"),
                  sortable: true,
                  sortDirection: "desc",
                  class: "text-center"
               },
               {
                  key: "created",
                  label: this.$t("category.table.field.created"),
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
               {
                  key: "name",
                  label: this.$t("category.table.field.name"),
                  sortable: true,
                  class: "text-center"
               },
               {
                  key: "details",
                  label: this.$t("category.table.field.show_details"),
                  sortable: true,
                  class: "text-center"
               },
               {
                  key: "actions",
                  label: this.$t("category.table.field.actions"),
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
         }
      } as unknown as Props
   },
   computed: {
      ...mapGetters([
         "getCategoryLoadedReply"
      ])
   },
   created() {
      this.onRefreshData();

      if(!this.getCategoryLoadedReply) {
         const vue_this = this;
         window.api.receive("main-window-category-module-reply", (data:WindowResponse) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     vue_this.data.category.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < vue_this.data.category.length; i++) {
                     const curr_category = vue_this.data.category[i];
                     if(curr_category.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0) {
                     if(data.data) {
                        vue_this.data.category[finded_index].id = data.data.id;
                        vue_this.data.category[finded_index].is_active = data.data.is_active;
                        vue_this.data.category[finded_index].created = data.data.created;
                        vue_this.data.category[finded_index].updated = data.data.updated;
                        vue_this.data.category[finded_index].name = data.data.name;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < vue_this.data.category.length; i++) {
                     const curr_category = vue_this.data.category[i];
                     if(curr_category.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0)
                     vue_this.data.category.splice(finded_index, 1);
               }
            }
         });
         this.$store.commit("SET_CATEGORY_LOADED_REPLY", true);
      }
   },
   methods: {
      onRefreshData() {
         const vue_this = this;
         this.data.category = [];

         Vue.prototype.$http.get("category/v3/select-all.php")
            .then(function (response:AxiosResponse) {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data;
                     vue_this.data.category = data.data;
                     vue_this.table.totalRows = data.data.length;
                  } else {
                     vue_this.$fire({
                        title: "Error",
                        text: vue_this.$t("global.default_error") as string,
                        type: "error"
                     });
                  }
               } else {
                  vue_this.$fire({
                     title: "Error",
                     text: vue_this.$t("global.default_error") as string,
                     type: "error"
                  });
               }
            });
      },
      onCategoryAddWindowClick() {
         window.api.send("category-module-window", {
            id: -1,
            type: "add",
            content: {
               title: this.$t("category.window.add.title"),
               description: this.$t("category.window.add.subtitle")
            },
            data: null
         });
      },
      onCategorySeeWindowClick(item:Category) {
         window.api.send("category-module-window", {
            id: item.id,
            type: "see",
            data: {
               name: item.name
            }
         });
      },
      onCategoryUpdateWindowClick(item:Category) {
         window.api.send("category-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: this.$t("category.window.update.title"),
               description: this.$t("category.window.update.subtitle")
            },
            data: {
               name: item.name
            }
         });
      },
      onCategoryDeleteWindowClick(item:Category) {
         window.api.send("category-module-window", {
            id: item.id,
            type: "delete",
            data: {
               name: item.name
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
