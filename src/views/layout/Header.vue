<template lang="pug">
   div
      h1 Header
</template>

<script>
export default {
   data() {
      return {};
   },
   computed: {
      currRoute() {
         return this.$route.name;
      }
   }
};
</script>

<style lang="scss" scoped></style>
