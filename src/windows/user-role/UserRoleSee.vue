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
                           <q-checkbox label="Permission 1" disabled></q-checkbox>
                           <q-checkbox label="Permission 2" disabled></q-checkbox>
                           <q-checkbox label="Permission 3" disabled></q-checkbox>
                           <q-checkbox label="Permission 4" disabled></q-checkbox>
                           <q-checkbox label="Permission 5" disabled></q-checkbox>
                           <q-checkbox label="Permission 6" disabled></q-checkbox>
                           <q-checkbox label="Permission 7" disabled></q-checkbox>
                           <q-checkbox label="Permission 8" disabled></q-checkbox>
                           <q-checkbox label="Permission 9" disabled></q-checkbox>
                           <q-checkbox label="Permission 10" disabled></q-checkbox>
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
                           <q-checkbox label="Permission 11" disabled></q-checkbox>
                           <q-checkbox label="Permission 12" disabled></q-checkbox>
                           <q-checkbox label="Permission 13" disabled></q-checkbox>
                           <q-checkbox label="Permission 14" disabled></q-checkbox>
                           <q-checkbox label="Permission 15" disabled></q-checkbox>
                           <q-checkbox label="Permission 16" disabled></q-checkbox>
                           <q-checkbox label="Permission 17" disabled></q-checkbox>
                           <q-checkbox label="Permission 18" disabled></q-checkbox>
                           <q-checkbox label="Permission 19" disabled></q-checkbox>
                           <q-checkbox label="Permission 20" disabled></q-checkbox>
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
                           <q-checkbox label="Permission 21" disabled></q-checkbox>
                           <q-checkbox label="Permission 22" disabled></q-checkbox>
                           <q-checkbox label="Permission 23" disabled></q-checkbox>
                           <q-checkbox label="Permission 24" disabled></q-checkbox>
                           <q-checkbox label="Permission 25" disabled></q-checkbox>
                           <q-checkbox label="Permission 26" disabled></q-checkbox>
                           <q-checkbox label="Permission 27" disabled></q-checkbox>
                           <q-checkbox label="Permission 28" disabled></q-checkbox>
                           <q-checkbox label="Permission 29" disabled></q-checkbox>
                           <q-checkbox label="Permission 30" disabled></q-checkbox>
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
                           <q-checkbox label="Permission 31" disabled></q-checkbox>
                           <q-checkbox label="Permission 32" disabled></q-checkbox>
                           <q-checkbox label="Permission 33" disabled></q-checkbox>
                           <q-checkbox label="Permission 34" disabled></q-checkbox>
                           <q-checkbox label="Permission 35" disabled></q-checkbox>
                           <q-checkbox label="Permission 36" disabled></q-checkbox>
                           <q-checkbox label="Permission 37" disabled></q-checkbox>
                           <q-checkbox label="Permission 38" disabled></q-checkbox>
                           <q-checkbox label="Permission 39" disabled></q-checkbox>
                           <q-checkbox label="Permission 40" disabled></q-checkbox>
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
                           <q-checkbox label="Permission 41" disabled></q-checkbox>
                           <q-checkbox label="Permission 42" disabled></q-checkbox>
                           <q-checkbox label="Permission 43" disabled></q-checkbox>
                           <q-checkbox label="Permission 44" disabled></q-checkbox>
                           <q-checkbox label="Permission 45" disabled></q-checkbox>
                           <q-checkbox label="Permission 46" disabled></q-checkbox>
                           <q-checkbox label="Permission 47" disabled></q-checkbox>
                           <q-checkbox label="Permission 48" disabled></q-checkbox>
                           <q-checkbox label="Permission 49" disabled></q-checkbox>
                           <q-checkbox label="Permission 50" disabled></q-checkbox>
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
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n/index";
import { getFormattedDateString } from "@/plugins/mixins/general";
import { UserRole, IPCParams } from "@/interfaces/user-role/user-role";
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
      const loaded = ref(false);

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
         onClose
      };
   }
});
</script>

<style lang="sass" scoped></style>
