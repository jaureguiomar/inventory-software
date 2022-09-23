<template>
   <div class="main-container">
      <Banner />
      <MenuHome />
      <Content>
         <template #content>
            <div class="indicators">
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
            </div>
         </template>
      </Content>
      <Content>
         <template #content>
            <h2 class="q-ma-none">Charts here!</h2>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Banner from "../views/layout/Banner.vue";
import Content from "../views/layout/Content.vue";
import MenuHome from "../views/layout/MenuHome.vue";

export default defineComponent({
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
