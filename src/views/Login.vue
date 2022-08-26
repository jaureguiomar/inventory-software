<template lang="pug">
   div.login
      div.login-container
         h1.title.mb-2 Inventory System
         h2.subtitle.mb-4 Welcome back
         input(class="form-control mb-2" type="text" placeholder="Username / email")
         input(class="form-control mb-4" type="password" placeholder="Password")
         button(class="btn btn-primary" @click="onLogin") Login
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
   name: "login-component",
   methods: {
      onLogin() {
         this.$store.commit("SET_LOGGUED_IN_DATA", true);
         this.$router.push({ name: "home" });
      }
   }
});
</script>

<style lang="sass" scoped>
   .login
      width: 100%
      height: 100vh
      background: #5cdb94
      .login-container
         display: block
         margin: 0 auto
         width: 500px
         height: auto
         position: relative
         top: 50%
         transform: translateY(-50%)
         text-align: center
         border: 1px solid #ccc
         padding: 60px 40px
         background: #edf5e1
         border-radius: 10px
         box-shadow: 5px 5px #379683
         color: #05386b
         .title
            font-size: 45px
            font-weight: bold
         .subtitle
            font-size: 37px
</style>
