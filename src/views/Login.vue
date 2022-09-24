<template>
   <div class="login">
      <div class="login-container">
         <h1 class="title q-mt-none q-mb-none">Inventory System</h1>
         <h2 class="subtitle q-mt-none q-mb-md">Welcome back</h2>
         <q-input
            v-model="email"
            label="Username / Email"
            type="text"
            class="q-mb-md"
            @keypress.enter="onEmailKeyup"
         >
         </q-input>
         <q-input
            v-model="password"
            label="Password"
            type="password"
            class="q-mb-xl"
            @keypress.enter="onPasswordKeyup"
         >
         </q-input>
         <q-btn
            color="primary"
            label="Login"
            @click="onLogin"
         >
         </q-btn>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { key } from "@/plugins/store";

export default defineComponent({
   name: "login-component",
   setup() {
      const store = useStore(key);
      const router = useRouter();
      const email = ref("");
      const password = ref("");

      const onEmailKeyup = () => {
         onLogin();
      };
      const onPasswordKeyup = () => {
         onLogin();
      };
      const onLogin = () => {
         localStorage.setItem("session", JSON.stringify({
            loggued_in: true
         }));
         store.commit("SET_LOGGUED_IN_DATA", true);
         router.push({ name: "home" });
      }

      return {
         email,
         password,
         onEmailKeyup,
         onPasswordKeyup,
         onLogin
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
            h1
               margin: 0
               padding: 0
         .subtitle
            font-size: 37px
            h2
               margin: 0
               padding: 0

   @media screen and (max-width: 560px)
      .login
         .login-container
            width: calc(100% - 20px)
</style>
