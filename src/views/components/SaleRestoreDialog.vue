<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-12">
            <h6 class="text-center q-mt-none q-mb-md">Restore Sale dialog</h6>

            <q-list bordered separator>
               <q-item
                  v-for="tmp_saved_sale in getSaleSavedSales"
                  :key="tmp_saved_sale.id"
                  v-ripple
                  clickable
                  @click="onRestoreSale(tmp_saved_sale)"
               >
                  <q-item-section>
                     <q-item-label>
                        <strong>
                           {{ tmp_saved_sale.name }}
                        </strong>
                     </q-item-label>
                     <!-- <q-item-label caption>{{ tmp_saved_sale.description }}</q-item-label> -->
                  </q-item-section>
               </q-item>
            </q-list>
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
import { ref, computed } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useStore } from "vuex";
import { key } from "@/plugins/store";
import { SaleContentStore } from "@/interfaces/store";

export default {
   emits: [
      ...useDialogPluginComponent.emits
   ],
   setup () {
      const store = useStore(key);
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
      const sale_name = ref("");

      const onRestoreSale = (restored_sale:SaleContentStore) => {
         onDialogOK(restored_sale);
      };

      const getSaleSavedSales = computed(() => {
         return store.getters["getSaleSavedSales"];
      });

      return {
         sale_name,
         getSaleSavedSales,
         dialogRef,
         onRestoreSale,
         onDialogHide,
         onDialogCancel
      };
   }
}
</script>
