<template lang="pug">
   div.menu-home
      router-link(to="/client")
         div.top
            <font-awesome-icon icon="fa-solid fa-users" size="4x" />
         div.bottom Clients
      router-link(to="/supplier")
         div.top
            <font-awesome-icon icon="fa-solid fa-truck-field" size="4x" />
         div.bottom Suppliers
      router-link(to="/product")
         div.top
            <font-awesome-icon icon="fa-solid fa-boxes-stacked" size="4x" />
         div.bottom Products
      router-link(to="/category")
         div.top
            <font-awesome-icon icon="fa-solid fa-book" size="4x" />
         div.bottom Categories
      a(href="#_")
         div.top
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" size="4x" />
         div.bottom Exit
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
   name: "menu-home-component",
   data() {
      return {};
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
