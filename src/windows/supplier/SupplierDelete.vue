<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("supplier.window.delete.title") }}</p>
            </template>
            <template #subtitle>{{ t("supplier.window.delete.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="supplier.id > 0"
                        v-model="supplier.id"
                        :label="t('supplier.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
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
               <div class="row q-mb-md">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="supplier.name"
                        :label="t('supplier.window.field.name') + ':'"
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
                     :label="t('supplier.window.delete.button.delete')"
                     @click="onDelete"
                  >
                  </q-btn>
                  <q-btn
                     color="primary"
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
import { defineComponent, ref, reactive } from "vue";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { Supplier, SupplierResponse, IPCParams } from "@/interfaces/supplier/supplier";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "supplier-delete-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const supplier = reactive<Supplier>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         id_branch: -1
      });
      const loaded = ref(false);

      window.api.receive("supplier-module-window-reply", (data:IPCParams) => {
         supplier.id = data.id;
         if(data.data) {
            supplier.id = data.data.id;
            supplier.is_active = data.data.is_active;
            supplier.created = getFormattedDateString(data.data.created);
            supplier.updated = getFormattedDateString(data.data.updated);
            supplier.name = data.data.name;
            supplier.id_branch = data.data.id_branch;
         }
         loaded.value = true;
      });

      const onDelete = async() => {
         try {
            let response = await axios.delete<SupplierResponse>("supplier/v3/delete.php", {
               params: {
                  field: "id",
                  data: supplier.id
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

         window.api.send("supplier-module-window-dialog", {
            type: "delete",
            message: "The supplier has been deleted properly"
         });
         window.api.receive("supplier-module-window-dialog-reply", () => {
            window.api.send("supplier-module-window-close", {
               id: supplier.id,
               data: null,
               result: "success",
               type: "delete"
            });
         });
      };

      const onClose = () => {
         window.api.send("supplier-module-window-close", {
            id: supplier.id,
            data: null,
            result: "closed",
            type: "delete"
         });
      };

      return {
         t,
         supplier,
         loaded,
         onDelete,
         onClose
      }
   }
});
</script>

<style lang="sass" scoped></style>
