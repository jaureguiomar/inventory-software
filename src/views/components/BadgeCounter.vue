<template lang="pug">
   span(
      class="badge text-counter"
      :class="{ 'badge-primary': value.length <= maxText, 'badge-danger': value.length > maxText, 'error': isError }"
   ) {{ value.length }}/{{ maxText }}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
   name: "App",
   props: {
      value: {
         type: String,
         required: true
      },
      maxText: {
         type: Number,
         required: true
      },
      isError: {
         type: Boolean,
         required: true
      }
   }
});
</script>

<style lang="sass" scoped></style>
