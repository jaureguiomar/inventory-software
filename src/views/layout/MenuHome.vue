<template>
   <div class="menu-home">
      <router-link to="/sale">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-cart-shopping" size="4x" />
         </div>
         <div class="bottom">Sale</div>
      </router-link>
      <router-link to="/client">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-users" size="4x" />
         </div>
         <div class="bottom">Clients</div>
      </router-link>
      <router-link to="/supplier">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-truck-field" size="4x" />
         </div>
         <div class="bottom">Suppliers</div>
      </router-link>
      <router-link to="/product">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-boxes-stacked" size="4x" />
         </div>
         <div class="bottom">Products</div>
      </router-link>
      <router-link to="/category">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-book" size="4x" />
         </div>
         <div class="bottom">Categories</div>
      </router-link>
      <router-link to="/user">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-user-tie" size="4x" />
         </div>
         <div class="bottom">Users</div>
      </router-link>
      <router-link to="/user-role">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-address-book" size="4x" />
         </div>
         <div class="bottom">Roles</div>
      </router-link>
      <router-link to="/sale-product">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-chart-line" size="4x" />
         </div>
         <div class="bottom">Sales</div>
      </router-link>
      <router-link to="/cash-cutoff">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-cash-register" size="4x" />
         </div>
         <div class="bottom">Cash Cutoff</div>
      </router-link>
      <router-link to="/activity-log">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-history" size="4x" />
         </div>
         <div class="bottom">Activity Log</div>
      </router-link>
      <a class="cursor-pointer" @click="onLogout">
         <div class="top">
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" size="4x" />
         </div>
         <div class="bottom">Logout</div>
      </a>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { key } from "@/plugins/store";
import { SessionStore } from "@/types/store";

export default defineComponent({
   name: "menu-home-component",
   setup() {
      const store = useStore(key);
      const router = useRouter();

      const onLogout = () => {
         const new_session:SessionStore = {
            loggued_in: false,
            user: {
               id: -1,
               username: "",
               email: "",
               first_name: "",
               last_name: "",
               role: {
                  id: -1,
                  name: "",
                  // atributes_1: -1,
                  // atributes_2: -1,
                  // atributes_3: -1,
                  // atributes_4: -1
               }
            }
         }

         localStorage.setItem("session", JSON.stringify(new_session));
         store.commit("SET_SESSION_LOGGUED_IN_DATA", new_session.loggued_in);
         store.commit("SET_SESSION_USER_DATA", new_session.user);
         store.commit("SET_AUTH_TOKEN_DATA", {
            access_token: "",
            refresh_token: "",
            expires_in: -1
         });
         router.push({ name: "login" });
      }

      return {
         onLogout
      };
   }
});
</script>

<style lang="sass" scoped>
   .menu-home
      width: 100%
      height: auto
      display: block
      background: #edf5e1
      padding: 20px 40px
      margin-bottom: 10px
      transition: 0.3s
      overflow-x: auto
      display: flex
      flex-direction: row
      align-items: center
      border-radius: 4px
      color: #000
      background-color: #fff
      box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
      &:hover
         box-shadow: 5px 5px #379683
      a
         display: inline-block
         border: 1px solid #05386b
         text-align: center
         padding: 17px
         color: #05386b
         border-radius: 4px
         transition: 0.3s
         // width: 160px
         box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
         &:hover
            background: #05386b
            color: white
         &:not(:first-child)
            margin-left: 17px
         // .top
         .bottom
            margin: 0
            padding: 0
            margin-top: 10px
            font-size: 21px
            font-weight: bold
</style>
