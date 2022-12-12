<template>
   <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
         <q-card-section>
            <div class="row items-center no-wrap">
               <div class="col-md-12 col-12 text-center">
                  <q-input
                     v-model="field.code.text"
                     :label="t('product.window.field.code') + ':'"
                     type="text"
                     bottom-slots
                     :error="field.code.error.is_error"
                     :error-message="field.code.error.message"
                     @blur="onCodeBlur"
                     @keyup="onCodeKeyup"
                  >
                  </q-input>
               </div>
            </div>
         </q-card-section>

         <q-card-actions align="right">
            <q-btn
               class="q-mr-xs"
               color="negative"
               label="Cancelar"
               @click="onDialogCancel"
            />
            <q-btn
               color="primary"
               :label="(type === 'add') ? 'Add' : 'Update'"
               :disable="field.code.error.is_error"
               @click="onCodeAdd"
            />
         </q-card-actions>
      </q-card>
   </q-dialog>
</template>

<script lang="ts">
import { reactive, onMounted, getCurrentInstance } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n/index";
import { validateField } from "@/plugins/mixins/general";
import { InputFieldString } from "@/types/general";

interface ProductCodeField {
   code: InputFieldString;
}

export default {
   props: {
      type: {
         type: String,
         required: true
      }
   },
   emits: [
      ...useDialogPluginComponent.emits
   ],
   setup() {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
      const _instance = getCurrentInstance();
      const barcodeScanner = _instance?.appContext.app.config.globalProperties.$barcodeScanner;
      const { t } = useI18n();
      const field = reactive<ProductCodeField>({
         code: {
            text: "",
            max_text: 100,
            error: {
               is_error: false,
               message: ""
            }
         }
      });

      onMounted(() => {
         let value = field.code.text;
         validateCode(value);
         barcodeScanner.init(onBarcodeScanned);
      });

      const onCodeAdd = () => {
         onDialogOK(field.code.text);
      };
      const onBarcodeScanned = (barcode:string) => {
         field.code.text = barcode;
         validateCode(field.code.text);
      };

      /////////////////
      // Blur Events //
      const onCodeBlur = () => {
         let value = field.code.text;
         validateCode(value);
      };
      /////////////////////
      // Keypress Events //
      const onCodeKeyup = () => {
         let value = field.code.text;
         validateCode(value);
      };
      ////////////////
      // Validators //
      const validateCode = (code:string) => {
         let result = validateField(code, () => {
            if(field.code.text.length <= field.code.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         field.code.error.is_error = result.error;
         field.code.error.message = result.message;
         return result.error;
      };

      return {
         t,
         field,
         dialogRef,
         onCodeBlur,
         onCodeKeyup,
         onCodeAdd,
         onDialogHide,
         onDialogCancel
      };
   }
}
</script>
