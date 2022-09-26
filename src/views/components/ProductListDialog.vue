<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col text-center">
            <h1>Dialog here!</h1>
            <!-- <h5 class="text-left q-ma-none q-mb-md">
              {{ (type === "update") ? "Editar registro" : "Eliminar registro" }}
            </h5>

            <q-img
              :src="image"
              style="height: 140px; max-width: 150px"
              class="rounded-borders q-mb-lg"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  Cannot load image
                </div>
              </template>
            </q-img>

            <div v-if="type === 'update'">
              <q-input
                v-model="compTitle"
                class="q-mb-sm"
                :label="inputTitle"
                filled
                dense
              >
              </q-input>
              <q-input
                v-model="compSubtitle"
                type="textarea"
                :label="inputSubtitle"
                filled
                dense
                autogrow
              >
              </q-input>
            </div>
            <div v-else>
              <h5 class="q-ma-none">Titulo</h5>
              <p class="q-ma-none">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga neque possimus ipsum quam quod magnam culpa eius veritatis. Vitae provident distinctio.
              </p>
            </div> -->
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="q-mb-md" color="primary" label="Cancelar" @click="onDialogCancel" />
        <q-btn class="q-mb-md" color="primary" label="Editar" @click="customOkClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
// import { ref } from "vue";
export default {
   props: {
      // products: {
      //    type: Array,
      //    required: true
      // }
   },
   emits: [
      ...useDialogPluginComponent.emits
   ],
   setup (props) {
      // const compTitle = ref(props.title)
      // const compSubtitle = ref(props.subtitle)
      console.log("props", props);
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

      const customOkClick = () => {
         onDialogOK();
         // onDialogOK({
         //    title: compTitle.value,
         //    subtitle: compSubtitle.value
         // });
      }
      const customRemoveClick = () => {
         onDialogOK()
      }

      return {
      // compTitle,
      // compSubtitle,
      dialogRef,
      onDialogHide,
      customOkClick,
      customRemoveClick,
      onDialogCancel
      }
   }
}
</script>
