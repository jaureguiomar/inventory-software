<template lang="pug">
   div.main-container
      Banner
      MenuHome
      Content
         template(#content)
            b-row
               b-col(lg="12" class="mb-2")
                  h1 Content here!
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

<style lang="sass" scoped></style>
