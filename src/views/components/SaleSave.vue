<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-12">
            <h6 class="text-center q-ma-none">Save Sale dialog</h6>
            <q-input
               v-model="sale_name"
               label="Sale Name:"
               type="text"
            >
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="q-mb-md" color="negative" label="Cancel" @click="onDialogCancel" />
        <q-btn class="q-mb-md" color="primary" label="Save" @click="onSaveSale" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref } from "vue";
import { useDialogPluginComponent } from "quasar";

export default {
   emits: [
      ...useDialogPluginComponent.emits
   ],
   setup () {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
      const sale_name = ref("");

      const onSaveSale = () => {
         onDialogOK(sale_name.value);
      };

      return {
         sale_name,
         dialogRef,
         onSaveSale,
         onDialogHide,
         onDialogCancel
      };
   }
}
</script>
