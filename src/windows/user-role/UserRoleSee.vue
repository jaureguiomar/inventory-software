<template>
   <transition-group name="list" tag="div">
      <Loader key="loader" :loaded="loaded" />

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p class="q-ma-none">{{ t("user_role.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ t("user_role.window.see.subtitle") }}</template>
         </Menu>

         <Content>
            <template #content>
               <div class="row">
                  <div class="col-md-2 col-12">
                     <q-input
                        v-if="userRole.id > 0"
                        v-model="userRole.id"
                        :label="t('user_role.window.field.id') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="userRole.created"
                        :label="t('user_role.window.field.created') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="userRole.updated"
                        :label="t('user_role.window.field.updated') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-xl">
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="userRole.name"
                        :label="t('user_role.window.field.name') + ':'"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
                  <div class="col-md-6 col-12">
                     <q-input
                        v-model="userRole.branch.name"
                        label="Created in:"
                        type="text"
                        readonly
                     >
                     </q-input>
                  </div>
               </div>
               <div class="row q-mb-md text-center">
                  <div class="col-12">
                     <h6 class="q-ma-none">Role Permissions</h6>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                     <q-card class="q-ma-md" bordered>
                        <q-card-section>
                           <div class="text-h6">Permissions 1</div>
                        </q-card-section>

                        <q-separator inset></q-separator>

                        <q-card-section>
                           <q-checkbox v-model="checkbox" label="Permission 1" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 2" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 3" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 4" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 5" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 6" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 7" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 8" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 9" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 10" disable></q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                     <q-card class="q-ma-md" bordered>
                        <q-card-section>
                           <div class="text-h6">Permissions 2</div>
                        </q-card-section>

                        <q-separator inset></q-separator>

                        <q-card-section>
                           <q-checkbox v-model="checkbox" label="Permission 11" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 12" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 13" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 14" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 15" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 16" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 17" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 18" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 19" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 20" disable></q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                     <q-card class="q-ma-md" bordered>
                        <q-card-section>
                           <div class="text-h6">Permissions 3</div>
                        </q-card-section>

                        <q-separator inset></q-separator>

                        <q-card-section>
                           <q-checkbox v-model="checkbox" label="Permission 21" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 22" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 23" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 24" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 25" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 26" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 27" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 28" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 29" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 30" disable></q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                     <q-card class="q-ma-md" bordered>
                        <q-card-section>
                           <div class="text-h6">Permissions 4</div>
                        </q-card-section>

                        <q-separator inset></q-separator>

                        <q-card-section>
                           <q-checkbox v-model="checkbox" label="Permission 31" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 32" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 33" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 34" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 35" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 36" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 37" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 38" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 39" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 40" disable></q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                     <q-card class="q-ma-md" bordered>
                        <q-card-section>
                           <div class="text-h6">Permissions 5</div>
                        </q-card-section>

                        <q-separator inset></q-separator>

                        <q-card-section>
                           <q-checkbox v-model="checkbox" label="Permission 41" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 42" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 43" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 44" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 45" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 46" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 47" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 48" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 49" disable></q-checkbox>
                           <q-checkbox v-model="checkbox" label="Permission 50" disable></q-checkbox>
                        </q-card-section>
                     </q-card>
                  </div>
               </div>
               <div class="text-center">
                  <q-btn
                     color="primary"
                     :label="t('user_role.window.button.close')"
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
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { UserRole, IPCParams } from "@/interfaces/user-role/user-role";
import { UserRolePermission, UserRolePermissionsResponse } from "@/interfaces/user-role-permission/user-role-permission";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";
import Loader from "@/views/components/Loader.vue";

export default defineComponent({
   name: "user-role-see-component",
   components: {
      Banner,
      Menu,
      Content,
      Loader
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const userRole = reactive<UserRole>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         atributes_1: 0,
         atributes_2: 0,
         atributes_3: 0,
         atributes_4: 0,
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
      const user_role_permission = ref<UserRolePermission[]>([]);
      const loaded = ref(false);
      const checkbox = ref(true);

      const getServer = computed(() => {
         return store.getters["getServer"];
      });

      window.api.receive("user-role-module-window-reply", (data:IPCParams) => {
         userRole.id = data.id;
         if(data.data) {
            userRole.id = data.data.id;
            userRole.is_active = data.data.is_active;
            userRole.created = getFormattedDateString(data.data.created);
            userRole.updated = getFormattedDateString(data.data.updated);
            userRole.name = data.data.name;
            userRole.atributes_1 = data.data.atributes_1;
            userRole.atributes_2 = data.data.atributes_2;
            userRole.atributes_3 = data.data.atributes_3;
            userRole.atributes_4 = data.data.atributes_4;
            userRole.id_user = data.data.id_user;
            userRole.id_pos = data.data.id_pos;
            userRole.id_branch = data.data.id_branch;
            userRole.user = data.data.user;
            userRole.pos = data.data.pos;
            userRole.branch = data.data.branch;
         }
         loaded.value = true;
      });

      onMounted(() => {
         axios.get<UserRolePermissionsResponse>(`${ getServer.value }/user_role_permission/v3/select-all.php`)
         .then((response) => {
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_user_role_permissions:Array<UserRolePermission> = [];
                  for(let i = 0; i < data.length; i++) {
                     formatted_user_role_permissions.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        name: data[i].name,
                        shortname: data[i].shortname,
                        description: data[i].description,
                        attr_value: data[i].attr_value
                     });
                  }
                  user_role_permission.value = formatted_user_role_permissions;
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
      });

      const onClose = () => {
         window.api.send("user-role-module-window-close", {
            id: userRole.id,
            data: null,
            result: "closed",
            type: "see"
         });
      }

      return {
         t,
         userRole,
         loaded,
         checkbox,
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
