<template>
   <div>
      <h1>Header</h1>
   </div>
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
