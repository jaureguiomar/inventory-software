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
import { defineComponent, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n/index";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store";
import { format_user_role_permission, format_user_role } from "@/plugins/mixins/format";
import { create_activity_log, ACTIVITY_LOG_ACCESS, ACTIVITY_LOG_OPERATION } from "@/plugins/mixins/activity-log";
import { UserAuthResponse } from "@/types/user";
import { SessionStore, UserRoleStore } from "@/types/store";
import { UserRolePermission, UserRolePermissionsResponse } from "@/types/user-role-permission";

export default defineComponent({
   name: "login-component",
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const router = useRouter();
      const email = ref("");
      const password = ref("");
      const userRolePermission = ref<UserRolePermission[]>([]);
      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });

      onMounted(async() => {
         let response = await axios.get<UserRolePermissionsResponse>(`${ getServer.value }/user-role-permission`,
            {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            }
         );
         if(response) {
            if(response.data.data) {
               let formatted_data:UserRolePermission[] = [];
               userRolePermission.value = [];

               for(let i = 0; i < response.data.data.length; i++) {
                  const curr_data = response.data.data[i];
                  const user_role_permission = format_user_role_permission(curr_data);
                  if(user_role_permission)
                     formatted_data.push(user_role_permission);
               }
               userRolePermission.value = formatted_data;
            }
         }
      });

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

         axios.post<UserAuthResponse>(`${ getServer.value }/auth-token/auth`, {
            username: email.value,
            password: password.value
         }).then((response) => {
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  const token = {
                     access_token: response.data.access_token,
                     refresh_token: response.data.refresh_token,
                     expires_in: response.data.expires_in
                  };
                  let formatted_role_store:UserRoleStore|null = null;
                  const curr_role = (data.role) ? data.role : null;

                  if(curr_role) {
                     const user_role = format_user_role(curr_role);
                     if(user_role)
                        formatted_role_store = user_role;
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
                     },
                     permission: userRolePermission.value
                  }

                  create_activity_log({
                     name: "The user has loggued in",
                     extra_data: "",
                     id_operation: ACTIVITY_LOG_ACCESS.LOGIN,
                     id_access: ACTIVITY_LOG_OPERATION.LOGIN,
                     id_user: new_user.user.id,
                     server: getServer.value,
                     access_token: token.access_token
                  });
                  localStorage.setItem("token", JSON.stringify(token));
                  localStorage.setItem("session", JSON.stringify(new_user));
                  store.commit("SET_SESSION_LOGGUED_IN_DATA", true);
                  store.commit("SET_AUTH_TOKEN_DATA", token);
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
