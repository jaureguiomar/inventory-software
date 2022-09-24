<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">Sale</p>
         </template>
         <template #subtitle>
            Sales that the user will do in the system
         </template>
      </Menu>

      <Content>
         <template #content>
            <h1>Sales</h1>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "sale-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      return {};
   }
});
</script>

<style lang="sass" scoped></style>
