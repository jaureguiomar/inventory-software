<template lang="pug">
   div#app
      router-view
</template>

<script lang="ts">
import Vue from "vue";
import Home from "@/views/components/Home.vue";

// interface Something {
//    data1: string;
// }

export default Vue.extend({
   name: "App",
   components: {
      Home
   }
});
</script>

<style lang="scss" scoped></style>
