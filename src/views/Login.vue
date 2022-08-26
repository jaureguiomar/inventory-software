<template lang="pug">
   div
      h4 Login
      button(@click="something") Click me!
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
   name: "login-component",
   methods: {
      something() {
         this.$store.commit("SET_LOGGUED_IN_DATA", true);
         this.$router.push({ name: "home" });
      }
   }
});
</script>

<style lang="sass" scoped></style>
