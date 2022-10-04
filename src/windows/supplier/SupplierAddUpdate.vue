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
               <div v-if="page.id > 0" class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-model="page.id"
                        :label="t('supplier.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div v-if="page.id > 0" class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="supplier.created"
                        :label="t('supplier.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="supplier.updated"
                        :label="t('supplier.window.field.updated') + ':'"
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
                        :label="t('supplier.window.field.name') + ':'"
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
                     :label="(page.id <= 0) ? t('supplier.window.add.button.add') : t('supplier.window.update.button.update')"
                     @click="onAddUpdate"
                  >
                  </q-btn>
                  <q-btn
                     class="q-mr-sm"
                     color="info"
                     :label="t('supplier.window.button.clear')"
                     @click="onClear"
                  >
                  </q-btn>
                  <q-btn
                     color="negative"
                     :label="t('supplier.window.button.close')"
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
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { key } from "@/plugins/store";
import { validateField, getFormattedDateString } from "@/plugins/mixins/general";
import { IPCParamsContent, Page, SupplierField, SupplierResponse, Supplier } from "@/interfaces/supplier/supplier";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "supplier-add-update-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const page = reactive<Page>({
         id: -1,
         type: "",
         content: {
            title: "",
            description: ""
         }
      });
      const supplier = reactive<Supplier>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         id_branch: -1
      });
      const field = reactive<SupplierField>({
         name: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         }
      });
      const loaded = ref(false);

      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
      });

      window.api.receive("supplier-module-window-reply", (data:IPCParamsContent) => {
         page.id = data.id;
         page.type = data.type;
         page.content = data.content;
         if(data.data) {
            supplier.id = data.data.id;
            supplier.is_active = data.data.is_active;
            supplier.created = getFormattedDateString(data.data.created);
            supplier.updated = getFormattedDateString(data.data.updated);
            supplier.name = data.data.name;
            supplier.id_branch = data.data.id_branch;

            field.name.text = data.data.name;
         }
         loaded.value = true;
      });

      const onAddUpdate = async() => {
         field.name.text = field.name.text.trim();

         let name:string = field.name.text;
         let error_name:boolean = false;

         error_name = validateName(name);
         if(error_name)
            return;

         ///////////////////////
         // Add / Update Data //
         let formatted_data:Supplier = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            id_branch: -1
         };

         if(page.id <= 0) {
            try {
               let response = await axios.put<SupplierResponse>("supplier/v3/create.php", {
                  name: field.name.text,
                  id_branch: getBranchId.value
               });
               if(response) {
                  if(!response.data.error.is_error) {
                     const data:Supplier = response.data.data.data;
                     formatted_data = {
                        id: Number(data.id),
                        is_active: Number(data.is_active),
                        created: data.created,
                        updated: data.updated,
                        name: data.name,
                        id_branch: Number(data.id_branch)
                     };
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
            } catch (error) {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
               return;
            }
         } else {
            try {
               let response = await axios.post<SupplierResponse>("supplier/v3/update.php", {
                  id: page.id,
                  name: field.name.text,
                  id_branch: getBranchId.value
               });
               if(response) {
                  if(!response.data.error.is_error) {
                     const data:Supplier = response.data.data.data;
                     formatted_data = {
                        id: Number(data.id),
                        is_active: Number(data.is_active),
                        created: data.created,
                        updated: data.updated,
                        name: data.name,
                        id_branch: Number(data.id_branch)
                     };
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
            } catch (error) {
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
            message = "The supplier has been added properly";
         else if(page.type === "update")
            message = "The supplier has been updated properly";
         window.api.send("supplier-module-window-dialog", {
            type: page.type,
            message: message
         });
         window.api.receive("supplier-module-window-dialog-reply", () => {
            window.api.send("supplier-module-window-close", {
               id: page.id,
               data: formatted_data,
               result: "success",
               type: page.type
            });
         });
      };
      const onClear = () => {
         clearForm();
      };
      const onClose = () => {
         window.api.send("supplier-module-window-close", {
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
      const onNameKeyup = () => {
         let value = field.name.text;
         validateName(value);
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
         supplier,
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
