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
                  input-debounce="0"
                  label="Username:"
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
               v-ripple="(lastCashCutoff.id_type !== 1) ? true : false"
               :class="[
                  (lastCashCutoff.id_type === -1)
                     ? 'cursor-pointer q-hoverable'
                     : (lastCashCutoff.id_type === 1)
                        ? 'bg-primary text-white'
                        : (lastCashCutoff.id_type === 2)
                        ? 'cursor-pointer q-hoverable'
                        : ''
               ]"
               bordered
               @click="onOpenCashCutOff"
            >
               <q-card-section class="text-center">
                  <font-awesome-icon icon="fa-solid fa-cash-register" size="2x" />
                  <p class="q-ma-none">
                     <strong>Open</strong>
                     Cash Cut Off
                  </p>
                  <p
                     v-if="lastCashCutoff.id_type === 1"
                     class="q-ma-none"
                  >
                     <strong>(Active)</strong>
                  </p>
               </q-card-section>
            </q-card>
            </div>
            <div class="col-5">
            <q-card
               v-ripple="(lastCashCutoff.id_type === 1) ? true : false"
               :class="[
                  (lastCashCutoff.id_type === -1)
                     ? 'bg-warning text-white'
                     : (lastCashCutoff.id_type === 1)
                        ? 'cursor-pointer q-hoverable'
                        : (lastCashCutoff.id_type === 2)
                        ? 'bg-primary text-white'
                        : ''
               ]"
               bordered
               @click="onCloseCashCutOff"
            >
               <q-card-section class="text-center">
                  <font-awesome-icon icon="fa-solid fa-cash-register" size="2x" />
                  <p class="q-ma-none">
                     <strong>Close</strong>
                     Cash Cut Off
                  </p>
                  <p
                     v-if="lastCashCutoff.id_type === 2"
                     class="q-ma-none"
                  >
                     <strong>(Active)</strong>
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
import { ref, reactive, computed, onMounted } from "vue";
import { useDialogPluginComponent } from "quasar";
import { format_user } from "@/plugins/mixins/format";
import { fd_data_user, fd_data_cash_cutoff } from "@/plugins/mixins/format-display-data";
import { findValueBy, validateField } from "@/plugins/mixins/general";
import { key } from "@/plugins/store";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { User, UsersResponse } from "@/types/user";
import { CashCutoff, CashCutoffOneResponse, CashCutoffResponse } from "@/types/cash-cutoff";
import { SaleProductsM2MResponse } from "@/types/sale-product";
import { format_cash_cutoff } from '../../plugins/mixins/format';

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
      const allUsers = ref<User[]>([]);
      const allUsersOptions = ref<string[]>([]);
      const allUsersFilteredOptions = ref<string[]>([]);
      const lastCashCutoff = reactive<CashCutoff>({
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         amount_open: -1,
         amount_sale: -1,
         amount_supplier: -1,
         amount_close: -1,
         date_close: "",
         id_type: -1,
         id_user_open: -1,
         id_user_close: -1,
         id_pos: -1,
         id_branch: -1,
         type: null,
         user_open: null,
         user_close: null,
         pos: null,
         branch: null
      });
      const getServer = computed(() => {
         return store.getters["getServer"];
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

      onMounted(() => {
         axios.post<CashCutoffOneResponse>(`${ getServer.value }/cash-cutoff/last`,
            {
               id_pos: getPosId.value,
               id_branch: getBranchId.value
            },
            {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  if(data) {
                     const cash_cutoff = format_cash_cutoff(data, fd_data_cash_cutoff);
                     if(cash_cutoff)
                        Object.assign(lastCashCutoff, cash_cutoff);
                  }
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

         axios.get<UsersResponse>(`${ getServer.value }/user`,
            {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         ).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<User> = [];
                  let formatted_data_input:Array<string> = [];

                  for(let i = 0; i < data.length; i++) {
                     const user = format_user(data[i], fd_data_user);
                     if(user)
                        formatted_data.push(user);
                     formatted_data_input.push(data[i].username);
                  }
                  allUsersOptions.value = formatted_data_input;
                  allUsersFilteredOptions.value = formatted_data_input;
                  allUsers.value = formatted_data;
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
      const onProcessCashCutOff = async(type:string) => {
         if(field.amount.text)
            field.amount.text = field.amount.text.trim();
         if(field.username)
            field.username.text = field.username.text.trim();

         let amount:string = field.amount.text;
         let username:string = field.username.text;
         let error_amount:boolean = false;
         let error_username:boolean = false;
         let error_id_user:boolean = false;
         const log_data = {
            text: "",
            data: {},
            id_operation: -1,
            id_access: -1
         };

         error_amount = validateAmount(amount);
         error_username = validateUsername(username);
         const finded_index = findValueBy(allUsers.value, username, "username");
         if(finded_index < 0)
            error_id_user = true;

         if(error_amount || error_username || error_id_user)
            return false;

         if(type === "open") {
            log_data.text = "opened";
            try {
               let response = await axios.put<CashCutoffResponse>(`${ getServer.value }/cash-cutoff`,
                  {
                     amount_open: field.amount.text,
                     id_type: 1,
                     id_user_open: allUsers.value[finded_index].id,
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
                  if(response.data.data) {
                     log_data.data = response.data.data;
                     log_data.id_operation = ACTIVITY_LOG_OPERATION.CASH_CUTOFF_SALE;
                     log_data.id_access = ACTIVITY_LOG_ACCESS.ADD;
                  } else {
                     return false;
                  }
               } else {
                  return false;
               }
            } catch (error) {
               return false;
            }
         } else if(type === "close") {
            let amount_sale:number|string = 0;
            let amount_supplier:number|string = 0;
            log_data.text = "closed";

            try {
               let response = await axios.get<SaleProductsM2MResponse>(`${ getServer.value }/sale-product/find-m2m`,
                  {
                     params: {
                        field: "id_cash_cutoff",
                        query: lastCashCutoff.id
                     },
                     headers: {
                        "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                     }
                  }
               );
               if(response) {
                  if(response.data.data) {
                     const data = response.data.data;
                     for(let i = 0; i < data.length; i++) {
                        const curr_sale = data[i];
                        if(curr_sale.is_supplier === 0)
                           amount_sale += parseFloat(curr_sale.total.toString());
                        else
                           amount_supplier += parseFloat(curr_sale.total.toString());
                     }
                     amount_sale = amount_sale.toFixed(2);
                     amount_supplier = amount_supplier.toFixed(2);

                     log_data.data = response.data.data;
                     log_data.id_operation = ACTIVITY_LOG_OPERATION.CASH_CUTOFF_SALE;
                     log_data.id_access = ACTIVITY_LOG_ACCESS.UPDATE;
                  } else {
                     return false;
                  }
               } else {
                  return false;
               }
            } catch (error) {
               return false;
            }

            try {
               let response = await axios.post<CashCutoffResponse>(`${ getServer.value }/cash-cutoff`,
                  {
                     id: lastCashCutoff.id,
                     amount_open: lastCashCutoff.amount_open,
                     amount_sale: amount_sale,
                     amount_supplier: amount_supplier,
                     amount_close: field.amount.text,
                     date_close: null,
                     id_type: 2,
                     id_user_open: lastCashCutoff.id_user_open,
                     id_user_close: allUsers.value[finded_index].id,
                     id_pos: lastCashCutoff.id_pos,
                     id_branch: lastCashCutoff.id_branch
                  },
                  {
                     headers: {
                        "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                     }
                  }
               );
               if(response) {
                  if(!response.data.data)
                     return false;
               } else {
                  return false;
               }
            } catch (error) {
               return false;
            }
         }

         create_activity_log({
            name: `The user has ${ log_data.text } a cash cutoff item`,
            extra_data: JSON.stringify(log_data.data),
            id_operation: log_data.id_operation,
            id_access: log_data.id_access,
            id_user: getSessionUserId.value,
            server: getServer.value,
            access_token: getAuthToken.value.access_token
         });
         return true;
      };
      const onOpenCashCutOff = async() => {
         if(lastCashCutoff.id_type !== 1)
            if(await onProcessCashCutOff("open"))
               onDialogOK();
      };
      const onCloseCashCutOff = async() => {
         if(lastCashCutoff.id_type === 1)
            if(await onProcessCashCutOff("close"))
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

      return {
         field,
         allUsersOptions,
         lastCashCutoff,
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
