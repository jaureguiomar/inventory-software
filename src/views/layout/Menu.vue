<template lang="pug">
   div.menu
      div.title
         div.left-content {{ title }}
         div.right-content
            slot(name="right-content")
      div.subtitle {{ subtitle }}
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
   name: "menu-component",
   props: {
      title: {
         type: String,
         required: true
      },
      subtitle: {
         type: String,
         required: true
      }
   },
   data() {
      return {};
   }
});
</script>

<style lang="sass" scoped>
   .menu
      width: 100%
      height: auto
      display: block
      background: #edf5e1
      border-radius: 10px
      padding: 20px 40px
      margin-bottom: 10px
      transition: 0.3s
      &:hover
         box-shadow: 5px 5px #379683
      .title
         font-size: 26px
         font-weight: bold
         color: #edf5e1
         border-radius: 4px
         transition: 0.3s
         background: linear-gradient(to left, #5cdb94 50%, #05386b 50%) right
         background-size: 200%
         transition: .5s ease-out
         display: flex
         flex-direction: row
         align-items: center
         justify-content: space-between
         &:hover
            background-position: left
         // .left-content
         .right-content
            margin-right: 20px
            a
               color: #edf5e1
               transition: 0.3s
               &:hover
                  color: #5cdb94
               &:not(:last-child)
                  margin-right: 20px
      .subtitle
         font-size: 19px
         color: #05386b
</style>
