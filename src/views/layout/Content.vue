<template>
   <div class="content">
      <div class="border-top"></div>
      <div class="content-container">
         <slot name="content"></slot>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
   name: "content-component",
   setup() {
      return {};
   }
});
</script>

<style lang="sass" scoped>
   .content
      width: 100%
      height: auto
      display: block
      background: #edf5e1
      border-radius: 10px
      transition: 0.3s
      margin-bottom: 10px
      &:hover
         box-shadow: 5px 5px #379683
      label
         color: #05386b
         font-weight: bold
      .border-top
         background: #05386b
         height: 20px
         border-start-start-radius: 10px
         border-start-end-radius: 10px
      .content-container
         padding: 40px 36px
</style>
