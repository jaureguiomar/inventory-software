<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-12">
            <h6 class="text-center q-ma-none">Restore Sale dialog</h6>
            <!-- <q-input
               v-model="sale_name"
               label="Sale Name:"
               type="text"
            >
            </q-input> -->

            <div class="row q-mb-md">
               <div class="col-4">
               </div>
               <div class="col-4">
               </div>
               <div class="col-4">
               </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="q-mb-md" color="negative" label="Cancel" @click="onDialogCancel" />
        <q-btn class="q-mb-md" color="primary" label="Save" @click="onRestoreSale" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useStore } from "vuex";
import { key } from "@/plugins/store";

export default {
   emits: [
      ...useDialogPluginComponent.emits
   ],
   setup () {
      const store = useStore(key);
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
      const sale_name = ref("");

      onMounted(() => {
         // if(getSaleProduct.value.length < 0)
      });

      const onRestoreSale = () => {
         store.commit("SET_SALE_PRODUCT_REPLY", []);
         onDialogOK();
      };

      // const getSaleProduct = computed(() => {
      //    return store.getters["getSaleProduct"];
      // });

      // console.log("getSaleProduct", getSaleProduct.value);

      return {
         sale_name,
         dialogRef,
         onRestoreSale,
         onDialogHide,
         onDialogCancel
      };
   }
}
</script>
