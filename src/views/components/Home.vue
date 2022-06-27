<template lang="pug">
   div
      Header
      h1 Home Page
      Footer
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/views/layout/Header.vue";
import Footer from "@/views/layout/Footer.vue";

export default Vue.extend({
   name: "home-component",
   components: {
      Header,
      Footer
   }
});
</script>

<style lang="scss" scoped></style>
