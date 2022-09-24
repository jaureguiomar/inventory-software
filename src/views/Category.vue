<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("category.title") }}</p>
         </template>
         <template #right-content>
            <a class="q-mr-sm text-white cursor-pointer" @click="onCategoryAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("category.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="Category List"
               :rows="category"
               :columns="categoryColumns"
               :no-data-label="t('category.table.content.details.empty')"
               :no-results-label="t('category.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="name"
               :visible-columns="categoryVisibleColumns"
               :pagination="categoryPagination"
               :filter="categoryFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">Category List</h6>
                  <q-input v-model="categoryFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-select
                     v-model="categoryVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="categoryColumns"
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
                        @click="onClienSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onCategoryUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onCategoryDeleteWindowClick(props.row)"
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
import { CategoryResponse, WindowResponse, Category } from "../interfaces/category/category";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "category-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const category = ref<Category[]>([]);
      const categoryVisibleColumns = ref<Array<string>>([ "id", "created", "updated", "name", "actions" ]);
      const categoryFilter = ref("");
      const categoryPagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
         // rowsNumber: xx if getting data from a server
      });
      const categoryColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("category.table.field.id"),
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
            label: t("category.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("category.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "name",
            label: t("category.table.field.name"),
            align: "center",
            field: "name",
            sortable: true
         },
         {
            name: "actions",
            label: t("category.table.field.actions"),
            align: "center",
            sortable: true
         }
      ];

      const getCategoryLoadedReply = computed(() => {
         return store.getters["getCategoryLoadedReply"];
      });

      const onRefreshData = () => {
         category.value = [];

         axios.get<CategoryResponse>("category/v3/select-all.php")
            .then((response) => {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data.data;
                     category.value = data;
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
            });
      };
      const onCategoryAddWindowClick = () => {
         window.api.send("category-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("category.window.add.title"),
               description: t("category.window.add.subtitle")
            },
            data: null
         });
      };
      const onClienSeeWindowClick = (item:Category) => {
         window.api.send("category-module-window", {
            id: item.id,
            type: "see",
            data: {
               name: item.name
            }
         });
      };
      const onCategoryUpdateWindowClick = (item:Category) => {
         window.api.send("category-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("category.window.update.title"),
               description: t("category.window.update.subtitle")
            },
            data: {
               name: item.name
            }
         });
      };
      const onCategoryDeleteWindowClick = (item:Category) => {
         window.api.send("category-module-window", {
            id: item.id,
            type: "delete",
            data: {
               name: item.name
            }
         });
      };

      onRefreshData();
      if(!getCategoryLoadedReply) {
         window.api.receive("main-window-category-module-reply", (data:WindowResponse) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     category.value.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < category.value.length; i++) {
                     const curr_category = category.value[i];
                     if(curr_category.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0) {
                     if(data.data) {
                        category.value[finded_index].id = data.data.id;
                        category.value[finded_index].is_active = data.data.is_active;
                        category.value[finded_index].created = data.data.created;
                        category.value[finded_index].updated = data.data.updated;
                        category.value[finded_index].name = data.data.name;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < category.value.length; i++) {
                     const curr_category = category.value[i];
                     if(curr_category.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0)
                     category.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_CLIENT_LOADED_REPLY", true);
      }

      return {
         t,
         category,
         categoryVisibleColumns,
         categoryColumns,
         categoryFilter,
         categoryPagination,
         getCategoryLoadedReply,
         onRefreshData,
         onCategoryAddWindowClick,
         onClienSeeWindowClick,
         onCategoryUpdateWindowClick,
         onCategoryDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
