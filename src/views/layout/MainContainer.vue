<template lang="pug">
   div.main-container
      Banner
      Menu
      slot(name="content")
</template>

<script lang="ts">
import Vue from "vue";
import Banner from "../layout/Banner.vue";
import Menu from "../layout/Menu.vue";

export default Vue.extend({
   name: "main-container-component",
   components: {
      Banner,
      Menu
   },
   data() {
      return {};
   }
});
</script>

<style lang="sass" scoped>
   .main-container
      width: 100%
      height: 100vh
      display: block
      padding: 16px
      background: #5cdb94
</style>
