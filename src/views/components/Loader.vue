<template>
   <div v-if="!loaded" class="spinner-loader">
      <div class="spinner-loader-container">
         <div class="spinner-ripple-loader">
            <div class="spinner-ripple-loader-container">
               <div></div>
               <div></div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
   name: "Loader",
   props: {
      loaded: {
         type: Boolean,
         required: true
      }
   }
});
</script>

<style lang="sass" scoped>
   @import "../../assets/scss/loader.scss"
</style>
