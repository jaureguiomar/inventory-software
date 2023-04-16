<template>
   <div class="main-container">
      <Banner />

      <Menu>
         <template #left-content>
            <p class="q-ma-none">Select a branch</p>
         </template>
         <template #subtitle>
            Opps... It seems that this system doesn't have a branch and pos associated,
            please select a branch and pos to continue
         </template>
      </Menu>

      <Content>
         <template #content>
            <div class="row">
               <div class="col-md-6 col-12">
                  <q-select
                     v-model="branchField.name.text"
                     use-input
                     input-debounce="0"
                     label="Branch"
                     :options="branchOptions"
                     behavior="menu"
                     :error="branchField.name.error.is_error"
                     :error-message="branchField.name.error.message"
                     @filter="branchFilter"
                     @blur="onBranchNameBlur"
                     @update:model-value="onBranchNameUpdate"
                     @input-value="onBranchNameInput"
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
               <div class="col-md-6 col-12">
                  <q-select
                     v-model="posField.name.text"
                     use-input
                     input-debounce="0"
                     label="POS"
                     :options="posOptions"
                     behavior="menu"
                     :error="posField.name.error.is_error"
                     :error-message="posField.name.error.message"
                     @filter="posFilter"
                     @blur="onPosNameBlur"
                     @update:model-value="onPosNameUpdate"
                     @input-value="onPosNameInput"
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
                     v-model="branchField.telephone.text"
                     label="Telephone"
                     type="text"
                     bottom-slots
                     readonly
                  >
                  </q-input>
               </div>
               <div class="col-md-6 col-12">
                  <q-input
                     v-model="branchField.address.text"
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
import { defineComponent, onMounted, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { format_pos } from "@/plugins/mixins/format";
import { findValueBy, validateField } from "@/plugins/mixins/general";
import { format_branch } from "@/plugins/mixins/format";
import { Branch, BranchesResponse, BranchField } from "@/types/branch";
import { Pos, PossResponse, PosField, PosResponse } from "@/types/pos";
import { BranchStore, PosStore } from "@/types/store";
import { IPCSetupMachine } from "@/types/setup-machine";
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
      const branchField = reactive<BranchField>({
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
      const posOptions = ref<Array<string>>([]);
      const posFilteredOptions = ref<Array<string>>([]);
      const pos = ref<Pos[]>([]);
      const posField = reactive<PosField>({
         name: {
            text: "",
            max_text: 60,
            error: {
               is_error: false,
               message: ""
            }
         },
         machine_id: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         },
         mac_address: {
            text: "",
            max_text: 60,
            error: {
               is_error: false,
               message: ""
            }
         }
      });

      onMounted(() => {
         window.api.receive("setup-machine", (data:IPCSetupMachine) => {
            posField.machine_id.text = data.machine_id;
            posField.mac_address.text = data.mac_address;
            localStorage.setItem("server", data.ip_server);
            store.commit("SET_SERVER_DATA", data.ip_server);
         });

         setTimeout(() => {
            // Get branches
            branchOptions.value = [];
            branchFilteredOptions.value = [];
            axios.get<BranchesResponse>(`${ getServer.value }/branch`,
            {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
            ).then((response) => {
               if(response) {
                  if(response.data.data) {
                     const data = response.data.data;
                     response.data.data
                     let formatted_data:Array<Branch> = [];
                     for(let i = 0; i < data.length; i++) {
                        const branch = format_branch(data[i]);
                        if(branch)
                           formatted_data.push(branch);
                        branchOptions.value.push(data[i].name);
                        branchFilteredOptions.value.push(data[i].name);
                     }
                     branch.value = formatted_data;
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
         }, 3000);
      });

      const onSelect = () => {
         const finded_index_branch = findValueBy(branch.value, branchField.name.text, "name");
         const finded_index_pos = findValueBy(pos.value, posField.name.text, "name");

         if(finded_index_branch >= 0 && finded_index_pos >= 0) {
            axios.post<PosResponse>(`${ getServer.value }/pos`, {
               id: pos.value[finded_index_pos].id,
               name: pos.value[finded_index_pos].name,
               machine_id: posField.machine_id.text,
               mac_address: posField.mac_address.text,
               id_branch: pos.value[finded_index_pos].id_branch
            }).then((response) => {
               if(response) {
                  if(response.data.data) {
                     const data = response.data.data;
                     const new_branch:BranchStore = {
                       id: Number(branch.value[finded_index_branch].id),
                       name: branch.value[finded_index_branch].name,
                       telephone: branch.value[finded_index_branch].telephone,
                       address: branch.value[finded_index_branch].address
                     };
                     const new_pos:PosStore = {
                       id: Number(data.id),
                       name: data.name
                     };

                     localStorage.setItem("branch", JSON.stringify(new_branch));
                     localStorage.setItem("pos", JSON.stringify(new_pos));
                     store.commit("SET_BRANCH_DATA", new_branch);
                     store.commit("SET_POS_DATA", new_pos);

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
         } else {
            if(finded_index_branch < 0 && finded_index_pos < 0) {
               Swal.fire({
                  title: "Error",
                  text: "You must select branch & pos to continue",
                  icon: "error"
               });
            } else if(finded_index_branch < 0) {
               Swal.fire({
                  title: "Error",
                  text: "You must select a branch to continue",
                  icon: "error"
               });
            } else if(finded_index_pos < 0) {
               Swal.fire({
                  title: "Error",
                  text: "You must select a pos to continue",
                  icon: "error"
               });
            }
         }
      };
      const getPosByBranch = (id_branch:number) => {
         // Get poss
         const finded_index = findValueBy(branch.value, branchField.name.text, "name");
         clearPos();

         if(finded_index >= 0) {
            axios.get<PossResponse>(`${ getServer.value }/pos/find`, {
               params: {
                  field: "id_branch",
                  query: id_branch
               }
            }).then((response) => {
               if(response) {
                  if(response.data.data) {
                     const data = response.data.data;
                     let formatted_data:Array<Pos> = [];

                     for(let i = 0; i < data.length; i++) {
                        const pos = format_pos(data[i]);
                        if(pos)
                           formatted_data.push(pos);
                        posOptions.value.push(data[i].name);
                        posFilteredOptions.value.push(data[i].name);
                     }
                     pos.value = formatted_data;
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
         }
      };
      const clearPos = () => {
         pos.value = [];
         posOptions.value = [];
         posFilteredOptions.value = [];
         posField.name.text = "";
         posField.machine_id.text = "";
         posField.mac_address.text = "";
      }
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
      const posFilter = (value:string, update:Function) => {
         if(value === "") {
            update(() => {
               posOptions.value = posFilteredOptions.value;
            });
            return;
         }
         update(() => {
            const needle = value.toLowerCase();
            posOptions.value = posFilteredOptions.value.filter(tmp_value => tmp_value.toLowerCase().indexOf(needle) > -1);
         });
      };

      /////////////////
      // Blur Events //
      const onBranchNameBlur = () => {
         let value = branchField.name.text;
         validateBranchName(value);
      };
      const onPosNameBlur = () => {
         let value = posField.name.text;
         validatePosName(value);
      };
      //////////////////
      // Input Events //
      const onBranchNameInput = () => {
         let value = branchField.name.text;
         validateBranchName(value);
      };
      const onPosNameInput = () => {
         let value = posField.name.text;
         validatePosName(value);
      };
      ////////////////////
      // Select Events //
      const onBranchNameUpdate = () => {
         let value = branchField.name.text;
         validateBranchName(value);

         const finded_index = findValueBy(branch.value, value, "name");
         if(finded_index >= 0) {
            branchField.telephone.text = branch.value[finded_index].telephone;
            branchField.address.text = branch.value[finded_index].address;
            getPosByBranch(branch.value[finded_index].id);
         } else {
            branchField.telephone.text = "";
            branchField.address.text = "";
            clearPos();
         }
      };
      const onPosNameUpdate = () => {
         let value = posField.name.text;
         validatePosName(value);
      };
      ////////////////
      // Validators //
      const validateBranchName = (name:string) => {
         let result = validateField(name);
         branchField.name.error.is_error = result.error;
         branchField.name.error.message = result.message;
         return result.error;
      };
      const validatePosName = (name:string) => {
         let result = validateField(name);
         posField.name.error.is_error = result.error;
         posField.name.error.message = result.message;
         return result.error;
      };

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });

      return {
         branchOptions,
         branchField,
         branchFilter,
         posOptions,
         posField,
         posFilter,
         onBranchNameBlur,
         onBranchNameInput,
         onBranchNameUpdate,
         onPosNameBlur,
         onPosNameInput,
         onPosNameUpdate,
         onSelect
      };
   }
});
</script>

<style lang="sass" scoped></style>
