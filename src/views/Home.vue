<template>
   <div>
      <HeaderElem />
      <h1>Index page</h1>
      <FooterElem />
   </div>
</template>

<script>
import compHeader from "@/views/layout/Header.vue";
import compFooter from "@/views/layout/Footer.vue";

export default {
   components: {
      HeaderElem: compHeader,
      FooterElem: compFooter,
   },
   data() {
      return {};
   }
};
</script>

<style lang="scss" scoped></style>
