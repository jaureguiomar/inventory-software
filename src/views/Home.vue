<template lang="pug">
   //- div
   //-    div.home-container
   //-       h1 Menu
   //-       div.home-row
   //-          div.home-item
   //-             router-link(to="/client")
   //-                <font-awesome-icon icon="fa-solid fa-users" size="4x" />
   //-          div.home-item
   //-             router-link(to="/supplier")
   //-                <font-awesome-icon icon="fa-solid fa-users" size="4x" />
   //-          div.home-item
   //-             router-link(to="/product")
   //-                <font-awesome-icon icon="fa-solid fa-users" size="4x" />

   div.main-container
      Banner
      //- MenuHome
      Content
         template(#content)
            b-row
               b-col(lg="6" class="mb-2")
                  router-link(to="/client")
                     <font-awesome-icon icon="fa-solid fa-users" size="4x" />
                  router-link(to="/supplier")
                     <font-awesome-icon icon="fa-solid fa-users" size="4x" />
                  router-link(to="/product")
                     <font-awesome-icon icon="fa-solid fa-users" size="4x" />
                  h1 Content here!
</template>

<script lang="ts">
import Vue from "vue";
import Banner from "../views/layout/Banner.vue";
import Content from "../views/layout/Content.vue";

export default Vue.extend({
   name: "home-component",
   components: {
      Banner,
      Content
   }
});
</script>

<style lang="sass" scoped>
   // .home-container
   //    width: 100%
   //    height: 100vh
   //    display: flex
   //    flex-direction: column
   //    align-items: center
   //    justify-content: center
   //    h1
   //       margin-bottom: 20px
   //    .home-row
   //       display: flex
   //       flex-direction: row
   //       align-items: center
   //       justify-content: space-between
   //       &:not(:last-child)
   //          margin-bottom: 20px
   //       .home-item
   //          width: auto
   //          height: auto
   //          border: 1px solid #ccc
   //          text-align: center
   //          border-radius: 5px
   //          &:not(:last-child)
   //             margin-right: 20px
   //          a
   //             svg
   //                padding: 20px
   //                color: orange
   //                &:hover
   //                   background: orange
   //                   color: white
</style>
