<template>
   <div class="menu-home">
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
      <a href="#_" @click="onLogout">
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

export default defineComponent({
   name: "menu-home-component",
   setup() {
      const store = useStore(key);
      const router = useRouter();

      const onLogout = () => {
         localStorage.setItem("session", JSON.stringify({
            loggued_in: false
         }));
         store.commit("SET_LOGGUED_IN_DATA", false);
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
      border-radius: 10px
      padding: 20px 40px
      margin-bottom: 10px
      transition: 0.3s
      overflow-x: auto
      display: flex
      flex-direction: row
      align-items: center
      a
         display: inline-block
         border: 1px solid #05386b
         text-align: center
         padding: 17px
         color: #05386b
         border-radius: 17px
         transition: 0.3s
         // width: 160px
         &:hover
            background: #05386b
            color: #5cdb94
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
