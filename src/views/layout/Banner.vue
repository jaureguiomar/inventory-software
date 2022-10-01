<template>
   <div class="banner">
      <div class="logo">{{ t("banner.inventory") }}</div>
      <div class="text">{{ t("banner.system") }}</div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n/index";

export default defineComponent({
   name: "banner-component",
   setup() {
      const { t } = useI18n();
      return {
         t
      };
   }
});
</script>

<style lang="sass" scoped>
   .banner
      width: 100%
      height: auto
      display: block
      background: #05386b
      padding: 40px
      display: flex
      flex-direction: row
      align-items: center
      font-size: 26px
      font-weight: bold
      margin-bottom: 10px
      transition: 0.3s
      border-radius: 4px
      color: white
      box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
      &:hover
         box-shadow: 5px 5px #379683
      .logo
         background: #5cdb94
         color: white
         padding: 20px
         border-radius: 10px
         margin-right: 20px
         transition: 0.3s
         &:hover
            cursor: pointer
            background: #05386b

   @media screen and (max-width: 360px)
      .banner
         flex-direction: column
         .logo
            margin: 0
         .text
            margin-top: 10px
</style>
