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
               row-key="id"
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
                        @click="onCategorySeeWindowClick(props.row)"
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
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins/general";
import { format_user, format_pos, format_branch } from "@/plugins/mixins/format";
import { CategoriesResponse, WindowResponse, Category } from "@/types/category";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
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

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getIsOnline = computed(() => {
         return store.getters["getIsOnline"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getCategoryLoadedReply = computed(() => {
         return store.getters["getCategoryLoadedReply"];
      });
      const getCategoryLoadedGet = computed(() => {
         return store.getters["getCategoryLoadedGet"];
      });

      const onRefreshData = () => {
         category.value = [];

         if(getIsOnline.value) {
            axios.get<CategoriesResponse>(`${ getServer.value }/category/v3/select-all.php`,
               {
                  headers: {
                     'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            ).then((response) => {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data.data;
                     let formatted_categories:Array<Category> = [];
                     for(let i = 0; i < data.length; i++) {
                        const formatted_user:User|null = format_user(data[i].user);
                        const formatted_pos:Pos|null = format_pos(data[i].pos);
                        const formatted_branch:Branch|null = format_branch(data[i].branch);

                        formatted_categories.push({
                           id: Number(data[i].id),
                           is_active: Number(data[i].is_active),
                           created: data[i].created,
                           updated: data[i].updated,
                           name: data[i].name,
                           id_user: Number(data[i].id_user),
                           id_pos: Number(data[i].id_pos),
                           id_branch: Number(data[i].id_branch),
                           user: formatted_user,
                           pos: formatted_pos,
                           branch: formatted_branch
                        });
                     }
                     category.value = formatted_categories;
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
         } else {
            window.api.send("mysql-get-category");
            if(!getCategoryLoadedGet.value) {
               window.api.receive("mysql-get-category-reply", function(data:Category[]) {
                  category.value = data;
               });
               store.commit("SET_CATEGORY_LOADED_GET", true);
            }
         }
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
      const onCategorySeeWindowClick = (item:Category) => {
         window.api.send("category-module-window", {
            id: item.id,
            type: "see",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
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
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };
      const onCategoryDeleteWindowClick = (item:Category) => {
         window.api.send("category-module-window", {
            id: item.id,
            type: "delete",
            data: {
               id: item.id,
               is_active: item.is_active,
               created: item.created,
               updated: item.updated,
               name: item.name,
               id_user: item.id_user,
               id_pos: item.id_pos,
               id_branch: item.id_branch,
               user: { ...item.user },
               pos: { ...item.pos },
               branch: { ...item.branch }
            }
         });
      };

      onRefreshData();
      if(!getCategoryLoadedReply.value) {
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
                  if(finded_index >= 0) {
                     if(data.data) {
                        category.value[finded_index].id = data.data.id;
                        category.value[finded_index].is_active = data.data.is_active;
                        category.value[finded_index].created = data.data.created;
                        category.value[finded_index].updated = data.data.updated;
                        category.value[finded_index].name = data.data.name;
                        category.value[finded_index].id_user = data.data.id_user;
                        category.value[finded_index].id_pos = data.data.id_pos;
                        category.value[finded_index].id_branch = data.data.id_branch;
                        category.value[finded_index].user = data.data.user;
                        category.value[finded_index].pos = data.data.pos;
                        category.value[finded_index].branch = data.data.branch;
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
                  if(finded_index >= 0)
                     category.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_CATEGORY_LOADED_REPLY", true);
      }

      return {
         t,
         category,
         categoryVisibleColumns,
         categoryColumns,
         categoryFilter,
         categoryPagination,
         onRefreshData,
         onCategoryAddWindowClick,
         onCategorySeeWindowClick,
         onCategoryUpdateWindowClick,
         onCategoryDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
