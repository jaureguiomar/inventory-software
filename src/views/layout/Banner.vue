<template>
   <div class="banner">
      <div class="logo">{{ $t("banner.inventory") }}</div>
      <div class="text">{{ $t("banner.system") }}</div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
   name: "banner-component",
   setup() {
      return {};
   }
});
</script>

<style lang="sass" scoped>
   .banner
      width: 100%
      height: auto
      display: block
      background: #05386b
      color: #edf5e1
      padding: 40px
      border-radius: 10px
      display: flex
      flex-direction: row
      align-items: center
      font-size: 26px
      font-weight: bold
      margin-bottom: 10px
      transition: 0.3s
      &:hover
         box-shadow: 5px 5px #379683
      .logo
         background: #5cdb94
         color: #edf5e1
         padding: 20px
         border-radius: 10px
         margin-right: 20px
         transition: 0.3s
         &:hover
            cursor: pointer
            background: #05386b
</style>
