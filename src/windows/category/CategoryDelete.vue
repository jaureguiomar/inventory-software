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
import { defineComponent, ref, reactive } from "vue";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { Category, CategoryResponse, IPCParams } from "@/interfaces/category/category";
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
      const category = reactive<Category>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         id_branch: -1,
         branch: {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            telephone: "",
            address: "",
            machine_id: "",
            mac_address: "",
         }
      });
      const loaded = ref(false);

      window.api.receive("category-module-window-reply", (data:IPCParams) => {
         category.id = data.id;
         if(data.data) {
            category.id = data.data.id;
            category.is_active = data.data.is_active;
            category.created = getFormattedDateString(data.data.created);
            category.updated = getFormattedDateString(data.data.updated);
            category.name = data.data.name;
            category.id_branch = data.data.id_branch;
            category.branch = data.data.branch;
         }
         loaded.value = true;
      });

      const onDelete = async() => {
         try {
            let response = await axios.delete<CategoryResponse>("category/v3/delete.php", {
               params: {
                  field: "id",
                  data: category.id
               },
            });
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
