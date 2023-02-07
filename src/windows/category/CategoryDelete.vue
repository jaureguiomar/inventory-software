<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("category.window.delete.title") }}</p>
            </template>
            <template #subtitle>{{ t("category.window.delete.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="category.id > 0"
                        v-model="category.id"
                        :label="t('category.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="category.created"
                        :label="t('category.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="category.updated"
                        :label="t('category.window.field.updated') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="category.name"
                        :label="t('category.window.field.name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        :model-value="category.branch?.name"
                        label="Created in:"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     class="q-mr-sm"
                     color="negative"
                     :label="t('category.window.delete.button.delete')"
                     @click="onDelete"
                  >
                  </q-btn>
                  <q-btn
                     color="primary"
                     :label="t('category.window.button.close')"
                     @click="onClose"
                  >
                  </q-btn>
               </div>
            </template>
         </Content>
      </div>
   </transition-group>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { Category, CategoryResponse, IPCParams } from "@/types/category";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "category-delete-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const category = reactive<Category>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         id_user: -1,
         id_pos: -1,
         id_branch: -1,
         user: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            username: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            id_role: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            role: null,
            user: null,
            pos: null,
            branch: null
         },
         pos: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            machine_id: "",
            mac_address: "",
            id_branch: -1,
            branch: null
         },
         branch: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            telephone: "",
            address: ""
         }
      });
      const loaded = ref(false);
      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getIsOnline = computed(() => {
         return store.getters["getIsOnline"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getSessionUserId = computed(() => {
         return store.getters["getSessionUserId"];
      });

      window.api.receive("category-module-window-reply", (data:IPCParams) => {
         category.id = data.id;
         if(data.data) {
            category.id = data.data.id;
            category.is_active = data.data.is_active;
            category.created = getFormattedDateString(data.data.created);
            category.updated = getFormattedDateString(data.data.updated);
            category.name = data.data.name;
            category.id_user = data.data.id_user;
            category.id_pos = data.data.id_pos;
            category.id_branch = data.data.id_branch;
            category.user = data.data.user;
            category.pos = data.data.pos;
            category.branch = data.data.branch;

            create_activity_log({
               name: "The user has access to category delete report",
               extra_data: JSON.stringify(category),
               id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
               id_access: ACTIVITY_LOG_OPERATION.CATEGORY_REPORT_DELETE,
               id_user: getSessionUserId.value,
               server: getServer.value,
               access_token: getAuthToken.value.access_token
            });
         }
         loaded.value = true;
      });

      const onDelete = async() => {
         if(getIsOnline.value) {
            try {
               let response = await axios.delete<CategoryResponse>(`${ getServer.value }/category/v3/delete.php`,
                  {
                     params: {
                        field: "id",
                        data: category.id
                     },
                     headers: {
                        "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                     }
                  }
               );
               if(response) {
                  if(response.data.error.is_error) {
                     Swal.fire({
                        title: "Error",
                        text: t("global.default_error"),
                        icon: "error"
                     });
                     return;
                  }
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
                  return;
               }
            } catch (error) {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
               return;
            }

            create_activity_log({
               name: "The user has deleted a category item",
               extra_data: JSON.stringify(category),
               id_operation: ACTIVITY_LOG_ACCESS.DELETE,
               id_access: ACTIVITY_LOG_OPERATION.CATEGORY_REPORT_DELETE,
               id_user: getSessionUserId.value,
               server: getServer.value,
               access_token: getAuthToken.value.access_token
            });

            window.api.send("category-module-window-dialog", {
               type: "delete",
               message: "The category has been deleted properly"
            });
            window.api.receive("category-module-window-dialog-reply", () => {
               window.api.send("category-module-window-close", {
                  id: category.id,
                  data: null,
                  result: "success",
                  type: "delete"
               });
            });
         } else {
            window.api.send("mysql-delete-category", category.id);
            window.api.receive("mysql-delete-category-reply", function(is_ok:boolean) {
               if(is_ok) {
                  window.api.send("category-module-window-dialog", {
                     type: "delete",
                     message: "The category has been deleted properly"
                  });
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
                  return;
               }
            });
            window.api.receive("category-module-window-dialog-reply", () => {
               window.api.send("category-module-window-close", {
                  id: category.id,
                  data: null,
                  result: "success",
                  type: "delete"
               });
            });
         }
      };

      const onClose = () => {
         window.api.send("category-module-window-close", {
            id: category.id,
            data: null,
            result: "closed",
            type: "delete"
         });
      };

      return {
         t,
         category,
         loaded,
         onDelete,
         onClose
      }
   }
});
</script>

<style lang="sass" scoped></style>
