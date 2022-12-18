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
                        :label="t('category.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div v-if="page.id > 0" class="row">
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
                        v-model="field.name.text"
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
                  <div v-if="page.id > 0" class="col-md-6 col-12">
                     <q-input
                        v-model="category.branch.name"
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
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { validateField, getFormattedDateString } from "@/plugins/mixins/general";
import { format_branch, format_pos, format_user } from "@/plugins/mixins/format";
import { IPCParamsContent, Page, CategoryField, CategoryResponse, Category } from "@/types/category";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
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
      const store = useStore(key);
      const page = reactive<Page>({
         id: -1,
         type: "",
         content: {
            title: "",
            description: ""
         }
      });
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
      const field = reactive<CategoryField>({
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

      window.api.receive("category-module-window-reply", (data:IPCParamsContent) => {
         page.id = data.id;
         page.type = data.type;
         page.content = data.content;
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

            field.name.text = data.data.name;
         }
         loaded.value = true;
      });

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getIsOnline = computed(() => {
         return store.getters["getIsOnline"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
      });
      const getPosId = computed(() => {
         return store.getters["getPosId"];
      });
      const getSessionUserId = computed(() => {
         return store.getters["getSessionUserId"];
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
         let formatted_data:Category = {
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
         };
         let message = "";

         if(page.type === "add")
            message = "The category has been added properly";
         else if(page.type === "update")
            message = "The category has been updated properly";

         if(page.id <= 0) {
            if(getIsOnline.value) {
               try {
                  let response = await axios.put<CategoryResponse>(`${ getServer.value }/category/v3/create.php`,
                     {
                        name: field.name.text,
                        id_user: getSessionUserId.value,
                        id_pos: getPosId.value,
                        id_branch: getBranchId.value
                     },
                     {
                        headers: {
                           "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                        }
                     }
                  );
                  if(response) {
                     if(!response.data.error.is_error) {
                        const data:Category = response.data.data.data;
                        const formatted_user:User|null = format_user(data.user);
                        const formatted_pos:Pos|null = format_pos(data.pos);
                        const formatted_branch:Branch|null = format_branch(data.branch);

                        formatted_data = {
                           id: Number(data.id),
                           is_active: Number(data.is_active),
                           created: data.created,
                           updated: data.updated,
                           name: data.name,
                           id_user: Number(data.id_user),
                           id_pos: Number(data.id_pos),
                           id_branch: Number(data.id_branch),
                           user: formatted_user,
                           pos: formatted_pos,
                           branch: formatted_branch
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
               window.api.send("mysql-create-category", {
                  name: field.name.text,
                  id_user: getSessionUserId.value,
                  id_pos: getPosId.value,
                  id_branch: getBranchId.value
               });
               window.api.receive("mysql-create-category-reply", function(data:Category) {
                  const formatted_user:User|null = format_user(data.user);
                  const formatted_pos:Pos|null = format_pos(data.pos);
                  const formatted_branch:Branch|null = format_branch(data.branch);

                  formatted_data = {
                     id: Number(data.id),
                     is_active: Number(data.is_active),
                     created: data.created,
                     updated: data.updated,
                     name: data.name,
                     id_user: Number(data.id_user),
                     id_pos: Number(data.id_pos),
                     id_branch: Number(data.id_branch),
                     user: formatted_user,
                     pos: formatted_pos,
                     branch: formatted_branch
                  };
                  window.api.send("category-module-window-dialog", {
                     type: page.type,
                     message: message
                  });
               });
               window.api.receive("category-module-window-dialog-reply", () => {
                  window.api.send("category-module-window-close", {
                     id: page.id,
                     data: formatted_data,
                     result: "success",
                     type: page.type
                  });
               });
            }
         } else {
            if(getIsOnline.value) {
               try {
                  let response = await axios.post<CategoryResponse>(`${ getServer.value }/category/v3/update.php`,
                     {
                        id: page.id,
                        name: field.name.text,
                        id_user: getSessionUserId.value,
                        id_pos: getPosId.value,
                        id_branch: getBranchId.value
                     },
                     {
                        headers: {
                           "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                        }
                     }
                  );
                  if(response) {
                     if(!response.data.error.is_error) {
                        const data:Category = response.data.data.data;
                        const formatted_user:User|null = format_user(data.user);
                        const formatted_pos:Pos|null = format_pos(data.pos);
                        const formatted_branch:Branch|null = format_branch(data.branch);

                        formatted_data = {
                           id: Number(data.id),
                           is_active: Number(data.is_active),
                           created: data.created,
                           updated: data.updated,
                           name: data.name,
                           id_user: Number(data.id_user),
                           id_pos: Number(data.id_pos),
                           id_branch: Number(data.id_branch),
                           user: formatted_user,
                           pos: formatted_pos,
                           branch: formatted_branch
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
               window.api.send("mysql-update-category", {
                  id: page.id,
                  name: field.name.text,
                  id_user: getSessionUserId.value,
                  id_pos: getPosId.value,
                  id_branch: getBranchId.value
               });
               window.api.receive("mysql-update-category-reply", function(data:Category) {
                  const formatted_user:User|null = format_user(data.user);
                  const formatted_pos:Pos|null = format_pos(data.pos);
                  const formatted_branch:Branch|null = format_branch(data.branch);

                  formatted_data = {
                     id: Number(data.id),
                     is_active: Number(data.is_active),
                     created: data.created,
                     updated: data.updated,
                     name: data.name,
                     id_user: Number(data.id_user),
                     id_pos: Number(data.id_pos),
                     id_branch: Number(data.id_branch),
                     user: formatted_user,
                     pos: formatted_pos,
                     branch: formatted_branch
                  };
                  window.api.send("category-module-window-dialog", {
                     type: page.type,
                     message: message
                  });
               });
               window.api.receive("category-module-window-dialog-reply", () => {
                  window.api.send("category-module-window-close", {
                     id: page.id,
                     data: formatted_data,
                     result: "success",
                     type: page.type
                  });
               });
            }
         }

         if(getIsOnline.value) {
            window.api.send("category-module-window-dialog", {
               type: page.type,
               message: message
            });
            window.api.receive("category-module-window-dialog-reply", () => {
               window.api.send("category-module-window-close", {
                  id: page.id,
                  data: formatted_data,
                  result: "success",
                  type: page.type
               });
            });
         }
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
         category,
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
