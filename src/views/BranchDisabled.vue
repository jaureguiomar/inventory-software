<template>
   <div class="main-container">
      <Banner />

      <Menu>
         <template #left-content>
            <p class="q-ma-none">System message</p>
         </template>
         <template #subtitle>
            Opps... It seems that this system has been disabled
         </template>
      </Menu>

      <Content>
         <template #content>
            <h3 class="q-ma-none">Contact me for more information about this message</h3>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "@/views/layout/Menu.vue";
import Banner from "@/views/layout/Banner.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "branch-disabled-component",
   components: {
      Menu,
      Banner,
      Content
   },
   setup() {
      return {};
   }
});
</script>

<style lang="sass" scoped></style>
