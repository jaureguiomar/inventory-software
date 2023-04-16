<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("category.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ t("category.window.see.subtitle") }}</template>
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
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
import { key } from "@/plugins/store";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { Category, IPCParams } from "@/types/category";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "category-see-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const store = useStore(key);
      const { t } = useI18n();
      const category = reactive<Category>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         id_user: -1,
         id_pos: -1,
         id_branch: -1,
         user: null,
         pos: null,
         branch: null
      });
      const loaded = ref(false);
      const getServer = computed(() => {
         return store.getters["getServer"];
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
               name: "The user has access to category see report",
               extra_data: JSON.stringify(category),
               id_operation: ACTIVITY_LOG_ACCESS.ACCESS,
               id_access: ACTIVITY_LOG_OPERATION.CATEGORY_REPORT_SEE,
               id_user: getSessionUserId.value,
               server: getServer.value,
               access_token: getAuthToken.value.access_token
            });
         }
         loaded.value = true;
      });

      const onClose = () => {
         window.api.send("category-module-window-close", {
            id: category.id,
            data: null,
            result: "closed",
            type: "see"
         });
      }

      return {
         t,
         category,
         loaded,
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
