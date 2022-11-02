<template>
   <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
      <q-card-section>
         <div class="row">
            <div class="col-12">
               <h6 class="text-center q-mt-none q-mb-md">Cash Cut Off</h6>
            </div>
         </div>
         <div class="row items-center justify-center q-mb-md">
            <div class="col-5 text-center">
               <q-input
                  v-model="field.amount.text"
                  label="Amount:"
                  type="text"
                  :error="field.amount.error.is_error"
                  :error-message="field.amount.error.message"
                  @blur="onAmountBlur"
               >
                  <template #prepend>
                     <font-awesome-icon icon="fa-solid fa-money-bill" />
                  </template>
               </q-input>
            </div>
         </div>
         <div class="row items-center justify-center q-mb-md">
            <div class="col-7 text-center">
               <q-select
                  v-model="field.username.text"
                  use-input
                  dense
                  input-debounce="0"
                  label="Username"
                  :options="allUsersOptions"
                  behavior="menu"
                  style="max-width: 260px;"
                  :error="field.username.error.is_error"
                  :error-message="field.username.error.message"
                  @filter="onUserFilter"
                  @blur="onUserBlur"
               >
                  <template #no-option>
                     <q-item>
                        <q-item-section class="text-grey">
                        No results
                        </q-item-section>
                     </q-item>
                  </template>
                  <template #prepend>
                     <font-awesome-icon icon="fa-solid fa-user" />
                  </template>
               </q-select>
            </div>
         </div>
         <div class="row justify-around items-center no-wrap">
            <div class="col-5">
            <q-card
               v-ripple
               class="cursor-pointer q-hoverable bg-primary text-white"
               bordered
               @click="onOpenCashCutOff"
            >
               <q-card-section class="text-center">
                  <font-awesome-icon icon="fa-solid fa-cash-register" size="2x" />
                  <p class="q-ma-none">
                     <strong>Open</strong>
                     Cash Cut Off
                  </p>
               </q-card-section>
            </q-card>
            </div>
            <div class="col-5">
            <q-card
               v-ripple
               class="cursor-pointer q-hoverable"
               bordered
               @click="onCloseCashCutOff"
            >
               <q-card-section class="text-center">
                  <font-awesome-icon icon="fa-solid fa-cash-register" size="2x" />
                  <p class="q-ma-none">
                     <strong>Close</strong>
                     Cash Cut Off
                  </p>
               </q-card-section>
            </q-card>
            </div>
         </div>
      </q-card-section>

      <q-card-actions align="right">
         <q-btn class="q-mb-md" color="negative" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import axios from "axios";
// import Swal from "sweetalert2";
// import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import { ref, computed, onMounted, reactive } from "vue";
import { useDialogPluginComponent } from "quasar";
import { format_branch, format_pos, format_user, format_user_role } from "@/plugins/mixins/format";
import { key } from "@/plugins/store";
import { UserRole } from "@/interfaces/user-role/user-role";
import { User, UsersResponse } from "@/interfaces/user/user";
import { Pos } from "@/interfaces/pos/pos";
import { Branch } from "@/interfaces/branch/branch";
import { validateField } from "@/plugins/mixins/general";

export default {
   emits: [
      ...useDialogPluginComponent.emits
   ],
   setup () {
      // const { t } = useI18n();
      const store = useStore(key);
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
      const field = reactive({
         amount: {
            text: "",
            error: {
               is_error: false,
               message: ""
            }
         },
         username: {
            text: "",
            error: {
               is_error: false,
               message: ""
            }
         }
      });
      const allUsersOptions = ref<string[]>([]);
      const allUsersFilteredOptions = ref<string[]>([]);

      onMounted(() => {
         axios.get<UsersResponse>(`${ getServer.value }/user/v3/select-all.php`)
            .then((response) => {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data.data;
                     let formatted_users:Array<User> = [];
                     let formatted_users_input:Array<string> = [];

                     for(let i = 0; i < data.length; i++) {
                        const formatted_role:UserRole|null = format_user_role(data[i].role);
                        const formatted_user:User|null = format_user(data[i].user);
                        const formatted_pos:Pos|null = format_pos(data[i].pos);
                        const formatted_branch:Branch|null = format_branch(data[i].branch);

                        formatted_users.push({
                           id: Number(data[i].id),
                           is_active: Number(data[i].is_active),
                           created: data[i].created,
                           updated: data[i].updated,
                           username: data[i].username,
                           email: data[i].email,
                           password: data[i].password,
                           first_name: data[i].first_name,
                           last_name: data[i].last_name,
                           id_role: Number(data[i].id_role),
                           id_user: Number(data[i].id_branch),
                           id_pos: Number(data[i].id_branch),
                           id_branch: Number(data[i].id_branch),
                           role: formatted_role,
                           user: formatted_user,
                           pos: formatted_pos,
                           branch: formatted_branch
                        });
                        formatted_users_input.push(data[i].username);
                     }
                     allUsersOptions.value = formatted_users_input;
                     allUsersFilteredOptions.value = formatted_users_input;
                  } else {
                     // Swal.fire({
                     //    title: "Error",
                     //    text: t("global.default_error"),
                     //    icon: "error"
                     // });
                  }
               } else {
                  // Swal.fire({
                  //    title: "Error",
                  //    text: t("global.default_error"),
                  //    icon: "error"
                  // });
               }
            }).catch(() => {
               // Swal.fire({
               //    title: "Error",
               //    text: t("global.default_error"),
               //    icon: "error"
               // });
            });
      });

      const onAmountBlur = () => {
         let amount_value:string|number = parseFloat(field.amount.text);
         if(isNaN(amount_value))
            amount_value = "0.00"
         else
            amount_value = amount_value.toFixed(2);
         field.amount.text = amount_value;
         validateAmount(field.amount.text);
      };
      const onUserFilter = (value:string, update:Function) => {
         if(value === "") {
            update(() => {
               allUsersOptions.value = allUsersFilteredOptions.value;
            });
            return;
         }
         update(() => {
            const needle = value.toLowerCase();
            allUsersOptions.value = allUsersFilteredOptions.value.filter((tmp_value:string) => tmp_value.toLowerCase().indexOf(needle) > -1);
         });
      };
      const onUserBlur = () => {
         validateUsername(field.username.text);
      };
      const onOpenCashCutOff = () => {
         onDialogOK();
      };
      const onCloseCashCutOff = () => {
         onDialogOK();
      };
      ////////////////
      // Validators //
      const validateAmount = (amount:string) => {
         let result = validateField(amount, () => {
            if(field.amount.text !== "0.00")
               return null;
            return "This field needs a value greather than 0.";
         });
         field.amount.error.is_error = result.error;
         field.amount.error.message = result.message;
         return result.error;
      };
      const validateUsername = (username:string) => {
         let result = validateField(username);
         field.username.error.is_error = result.error;
         field.username.error.message = result.message;
         return result.error;
      };

      const getServer = computed(() => {
         return store.getters["getServer"];
      });

      return {
         field,
         allUsersOptions,
         dialogRef,
         onAmountBlur,
         onUserFilter,
         onUserBlur,
         onOpenCashCutOff,
         onCloseCashCutOff,
         onDialogHide,
         onDialogCancel
      };
   }
}
</script>
