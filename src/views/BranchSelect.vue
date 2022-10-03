<template>
   <div class="main-container">
      <Banner />

      <Menu>
         <template #left-content>
            <p class="q-ma-none">Select a branch</p>
         </template>
         <template #subtitle>
            Opps... It seems that this system doesn't have a branch associated,
            please select a branch to continue
         </template>
      </Menu>

      <Content>
         <template #content>
            <div class="row">
               <div class="col-md-6 col-12">
                  <q-select
                     v-model="field.name.text"
                     use-input
                     input-debounce="0"
                     label="Branch"
                     :options="branchOptions"
                     behavior="menu"
                     :error="field.name.error.is_error"
                     :error-message="field.name.error.message"
                     @filter="branchFilter"
                     @blur="onNameBlur"
                     @update:model-value="onNameUpdate"
                     @input-value="onNameInput"
                  >
                     <template #no-option>
                        <q-item>
                           <q-item-section class="text-grey">
                           No results
                           </q-item-section>
                        </q-item>
                     </template>
                  </q-select>
               </div>
            </div>
            <div class="row q-mb-md">
               <div class="col-md-6 col-12">
                  <q-input
                     v-model="field.telephone.text"
                     label="Telephone"
                     type="text"
                     bottom-slots
                     readonly
                  >
                  </q-input>
               </div>
               <div class="col-md-6 col-12">
                  <q-input
                     v-model="field.address.text"
                     label="Address"
                     type="text"
                     bottom-slots
                     readonly
                  >
                  </q-input>
               </div>
            </div>
            <div class="text-center">
               <q-btn
                  class="q-mr-sm"
                  color="primary"
                  label="Select"
                  @click="onSelect"
               >
               </q-btn>
            </div>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { key } from "@/plugins/store";
import { findValueBy, validateField } from "@/plugins/mixins";
import { Branch, BranchesResponse, BranchField } from "@/interfaces/branch/branch";
import { BranchStore } from '@/interfaces/store';
import Menu from "@/views/layout/Menu.vue";
import Banner from "@/views/layout/Banner.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "branch-select-component",
   components: {
      Menu,
      Banner,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const router = useRouter();
      const branchOptions = ref<Array<string>>([]);
      const branchFilteredOptions = ref<Array<string>>([]);
      const branch = ref<Branch[]>([]);
      const field = reactive<BranchField>({
         name: {
            text: "",
            max_text: 160,
            error: {
               is_error: false,
               message: ""
            }
         },
         telephone: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         },
         address: {
            text: "",
            max_text: 160,
            error: {
               is_error: false,
               message: ""
            }
         }
      });

      onMounted(() => {
         axios.get<BranchesResponse>("branch/v3/select-all.php")
            .then((response) => {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data.data;
                     let formatted_branched:Array<Branch> = [];

                     for(let i = 0; i < data.length; i++) {
                        formatted_branched.push({
                           id: Number(data[i].id),
                           is_active: Number(data[i].is_active),
                           created: data[i].created,
                           updated: data[i].updated,
                           name: data[i].name,
                           telephone: data[i].telephone,
                           address: data[i].address
                        });

                        branchOptions.value.push(data[i].name);
                        branchFilteredOptions.value.push(data[i].name);
                     }
                     branch.value = formatted_branched;
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
            });
      });

      const onSelect = () => {
         const finded_index = findValueBy(branch.value, field.name.text, "name");
         if(finded_index >= 0) {
            const new_branch:BranchStore = {
               id: branch.value[finded_index].id,
               name: branch.value[finded_index].name,
               telephone: branch.value[finded_index].telephone,
               address: branch.value[finded_index].address
            };
            localStorage.setItem("branch", JSON.stringify(new_branch));
            store.commit("SET_BRANCH_DATA", branch);

            Swal.fire({
               title: "Ok",
               text: "Branch selected successfully",
               icon: "success"
            }).then(() => {
               router.push({ name: "login" });
            })
         } else {
            Swal.fire({
               title: "Error",
               text: "You must select a branch to continue",
               icon: "error"
            });
         }
      };
      const branchFilter = (value:string, update:Function) => {
         if(value === "") {
            update(() => {
               branchOptions.value = branchFilteredOptions.value;
            });
            return;
         }
         update(() => {
            const needle = value.toLowerCase();
            branchOptions.value = branchFilteredOptions.value.filter(tmp_value => tmp_value.toLowerCase().indexOf(needle) > -1);
         });
      };

      /////////////////
      // Blur Events //
      const onNameBlur = () => {
         let value = field.name.text;
         validateName(value);
      };
      //////////////////
      // Input Events //
      const onNameInput = () => {
         let value = field.name.text;
         validateName(value);
      };
      ////////////////////
      // Select Events //
      const onNameUpdate = () => {
         let value = field.name.text;
         validateName(value);

         const finded_index = findValueBy(branch.value, value, "name");
         if(finded_index >= 0) {
            field.telephone.text = branch.value[finded_index].telephone;
            field.address.text = branch.value[finded_index].address;
         } else {
            field.telephone.text = "";
            field.address.text = "";
         }
      };
      ////////////////
      // Validators //
      const validateName = (name:string) => {
         let result = validateField(name);
         field.name.error.is_error = result.error;
         field.name.error.message = result.message;
         return result.error;
      };

      return {
         branchOptions,
         field,
         onSelect,
         branchFilter,
         onNameBlur,
         onNameInput,
         onNameUpdate
      };
   }
});
</script>

<style lang="sass" scoped></style>
