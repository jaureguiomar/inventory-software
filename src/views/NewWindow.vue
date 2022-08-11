<template lang="pug">
   div
      h1 New window
      button(class="btn btn-primary" @click="onClose") Click Me!
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
   name: "new-window-component",
   data() {
      return {};
   },
   methods: {
      onClose() {
         console.log("onClose!");
         window.api.send("new-window-close");
      }
   }
});
</script>

<style lang="sass" scoped></style>
