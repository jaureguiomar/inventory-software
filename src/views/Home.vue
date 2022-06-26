<template lang="pug">
   div
      div.home-container
         h1 Menu
         div.home-row
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
         div.home-row
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
         div.home-row
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
            div.home-item
               router-link(to="/clients")
                  <font-awesome-icon icon="fa-solid fa-users" size="4x" />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
   name: "home-component"
});
</script>

<style lang="sass" scoped>
   .home-container
      width: 100%
      height: 100vh
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      h1
         margin-bottom: 20px
      .home-row
         display: flex
         flex-direction: row
         align-items: center
         justify-content: space-between
         &:not(:last-child)
            margin-bottom: 20px
         .home-item
            width: auto
            height: auto
            border: 1px solid #ccc
            text-align: center
            border-radius: 5px
            &:not(:last-child)
               margin-right: 20px
            a
               svg
                  padding: 20px
                  color: orange
                  &:hover
                     background: orange
                     color: white
</style>
