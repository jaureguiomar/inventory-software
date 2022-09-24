<template>
   <div class="menu">
      <div class="title">
         <div class="left-content">
            <slot name="left-content"></slot>
         </div>
         <div class="right-content">
         <slot name="right-content"></slot>
      </div>
      </div>
      <div class="subtitle">
         <slot name="subtitle"></slot>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
   name: "menu-component",
   setup() {
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
         .left-content
            margin-left: 10px
            display: flex
            flex-direction: row
            align-items: center
            // p
            //    margin: 0
            //    padding: 0
            //    margin-left: 5px
            // a
            //    margin-left: 10px
            //    color: #edf5e1
            //    transition: 0.3s
            //    &:hover
            //       color: #5cdb94
         .right-content
            margin-right: 20px
            // a
            //    color: #edf5e1
            //    transition: 0.3s
            //    &:hover
            //       color: #5cdb94
            //    &:not(:last-child)
            //       margin-right: 20px
      .subtitle
         font-size: 19px
         color: #05386b

   @media screen and (max-width: 360px)
      .menu
         .title
            flex-direction: column
            .left-content
               margin: 0
            .right-content
               margin: 0
</style>
