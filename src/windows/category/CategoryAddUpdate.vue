<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ page.content.title }}</p>
            </template>
            <template #subtitle>{{ page.content.description }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="page.id > 0"
                        v-model="page.id"
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
                        v-model="field.name.text"
                        class="counter"
                        :label="t('category.window.field.name') + ':'"
                        type="text"
                        bottom-slots
                        :error="field.name.error.is_error"
                        :error-message="field.name.error.message"
                        @blur="onNameBlur"
                        @keyup="onNameKeyup"
                     >
                     </q-input>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     class="q-mr-sm"
                     color="primary"
                     :label="(page.id <= 0) ? t('category.window.add.button.add') : t('category.window.update.button.update')"
                     @click="onAddUpdate"
                  >
                  </q-btn>
                  <q-btn
                     class="q-mr-sm"
                     color="info"
                     :label="t('category.window.button.clear')"
                     @click="onClear"
                  >
                  </q-btn>
                  <q-btn
                     color="negative"
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
import { defineComponent, reactive, ref } from "vue";
import { IPCParams, Page, CategoryField, CategoryResponse, Category } from "@/interfaces/category/category-add-update";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import { validateField, enterKeyNavigation } from "@/plugins/mixins";
import axios from "@/plugins/axios";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "category-add-update-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const page = reactive<Page>({
         id: -1,
         type: "",
         content: {
            title: "",
            description: ""
         }
      });
      const field = reactive<CategoryField>({
         name: {
            text: "",
            max_text: 70,
            error: {
               is_error: false,
               message: ""
            }
         }
      });
      const loaded = ref(false);

      window.api.receive("category-module-window-reply", (data:IPCParams) => {
         page.id = data.id;
         page.type = data.type;
         page.content = data.content;
         if(data.data) {
            field.name.text = data.data.name;
         }
         loaded.value = true;
      });

      const onAddUpdate = async() => {
         field.name.text = field.name.text.trim();

         let name = field.name.text;
         let error_name = false;

         error_name = validateName(name);
         if(error_name)
            return;

         let data:Category|null = null;
         if(page.id <= 0) {
            let response = await axios.put<CategoryResponse>("category/v3/create.php", {
               name: field.name.text
            });
            if(response) {
               if(!response.data.error.is_error) {
                  data = response.data.data;
               } else {
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
         } else {
            let response = await axios.post<CategoryResponse>("category/v3/update.php", {
               id: page.id,
               name: field.name.text
            });
            if(response) {
               if(!response.data.error.is_error) {
                  data = response.data.data;
               } else {
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
         }

         let message = "";
         if(page.type === "add")
            message = "The category has been added properly";
         else if(page.type === "update")
            message = "The category has been updated properly";
         window.api.send("category-module-window-dialog", {
            type: page.type,
            message: message
         });
         window.api.receive("category-module-window-dialog-reply", () => {
            window.api.send("category-module-window-close", {
               id: page.id,
               data: data,
               result: "success",
               type: page.type
            });
         });
      };
      const onClear = () => {
         clearForm();
      };
      const onClose = () => {
         window.api.send("category-module-window-close", {
            id: page.id,
            data: null,
            result: "closed",
            type: page.type
         });
      };
      const clearForm = () => {
         field.name.text = "";
         field.name.error.is_error = false;
         field.name.error.message = "";
      };
      /////////////////
      // Blur Events //
      const onNameBlur = () => {
         let value = field.name.text;
         validateName(value);
      };
      /////////////////////
      // Keypress Events //
      const onNameKeyup = (e:KeyboardEvent) => {
         let value = field.name.text;
         validateName(value);
         enterKeyNavigation(e, "last-name", "");
      };
      ////////////////
      // Validators //
      const validateName = (name:string) => {
         let result = validateField(name, () => {
            if(field.name.text.length <= field.name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.name.error.is_error = result.error;
         field.name.error.message = result.message;
         return result.error;
      };

      return {
         t,
         page,
         field,
         loaded,
         onAddUpdate,
         onClear,
         onClose,
         onNameBlur,
         onNameKeyup
      }
   }
});
</script>

<style lang="sass" scoped></style>
