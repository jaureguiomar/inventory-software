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
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { UserResponse } from "@/interfaces/user/user";
import { SessionStore, UserRoleStore } from "@/interfaces/store";

export default defineComponent({
   name: "login-component",
   setup() {
      const { t } = useI18n();
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
         if(!email.value || !password.value) {
            Swal.fire({
               title: "Error",
               text: "You must enter data to log in",
               icon: "error"
            });
            return;
         }

         axios.post<UserResponse>(`${ getServer.value }/user/v3/login.php`, {
            username: email.value,
            password: password.value
         }).then((response) => {
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data.data;
                  let formatted_role_store:UserRoleStore|null = null;
                  const curr_role = (data.role) ? data.role : null;

                  if(curr_role) {
                     formatted_role_store = {
                        id: Number(curr_role.id),
                        name: curr_role.name
                     };
                  }

                  const new_user:SessionStore = {
                     loggued_in: true,
                     user: {
                        id: data.id,
                        username: data.username,
                        email: data.email,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        role: formatted_role_store
                     }
                  }
                  localStorage.setItem("session", JSON.stringify(new_user));
                  store.commit("SET_SESSION_LOGGUED_IN_DATA", true);
                  router.push({ name: "home" });
               } else {
                  Swal.fire({
                     title: "Error",
                     text: "Invalid user credentials",
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         }).catch(() => {
            Swal.fire({
               title: "Error",
               text: t("global.default_error"),
               icon: "error"
            });
         });
      }

      const getServer = computed(() => {
         return store.getters["getServer"];
      });

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
         transition: 0.3s
         color: #05386b
         border-radius: 4px
         background: #fff
         box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
         &:hover
            box-shadow: 5px 5px #379683
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
