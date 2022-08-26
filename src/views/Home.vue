<template lang="pug">
   div.main-container
      Banner
      MenuHome
      Content
         template(#content)
            div.indicators
               div.indicator-item
                  div.indicator-left
                     a(href="#_")
                        font-awesome-icon(icon="fa-solid fa-arrows-rotate" size="4x")
                  div.indicator-right
                     h4 Data
                     h6 Description about this data
               div.indicator-item
                  div.indicator-left
                     a(href="#_")
                        font-awesome-icon(icon="fa-solid fa-arrows-rotate" size="4x")
                  div.indicator-right
                     h4 Data
                     h6 Description about this data
               div.indicator-item
                  div.indicator-left
                     a(href="#_")
                        font-awesome-icon(icon="fa-solid fa-arrows-rotate" size="4x")
                  div.indicator-right
                     h4 Data
                     h6 Description about this data
               div.indicator-item
                  div.indicator-left
                     a(href="#_")
                        font-awesome-icon(icon="fa-solid fa-arrows-rotate" size="4x")
                  div.indicator-right
                     h4 Data
                     h6 Description about this data

      Content
         template(#content)
            h1 Charts here!
</template>

<script lang="ts">
import Vue from "vue";
import Banner from "../views/layout/Banner.vue";
import Content from "../views/layout/Content.vue";
import MenuHome from "../views/layout/MenuHome.vue";

export default Vue.extend({
   name: "home-component",
   components: {
      Banner,
      Content,
      MenuHome
   }
});
</script>

<style lang="sass" scoped>
   .indicators
      width: 100%
      height: auto
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .indicator-item
         display: flex
         flex-direction: row
         align-items: center
         justify-content: space-between
         border: 1px solid #379683
         padding: 30px
         // width: calc(25% - 40px)
         width: 300px
         background: #5cdb94
         border-radius: 10px
         color: white
         .indicator-left
            margin-right: 20px
            a
               svg
                  color: white
         .indicator-right
               h4
                  margin: 0
                  padding: 0
                  font-weight: bold
                  font-size: 30px
               h6
                  margin: 0
                  padding: 0
</style>
