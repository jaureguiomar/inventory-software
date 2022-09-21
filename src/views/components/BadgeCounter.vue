<template>
   <span
      class="badge text-counter"
      :class="{ 'badge-primary': value.length <= maxText, 'badge-danger': value.length > maxText, 'error': isError }"
   >
      {{ value.length }}/{{ maxText }}
   </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
   name: "BadgeCounter",
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
