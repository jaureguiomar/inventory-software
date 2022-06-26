<template lang="pug">
   div
      router-link(to="/")
         <font-awesome-icon icon="fa-solid fa-arrow-left" size="2x" />
      h1 Clients
</template>

<script lang="ts">
import Vue from "vue";
// import Header from "@/views/layout/Header.vue";
// import Footer from "@/views/layout/Footer.vue";

export default Vue.extend({
   name: "home-component",
   // components: {
   //    Header,
   //    Footer
   // }
});
</script>

<style lang="sass" scoped></style>
