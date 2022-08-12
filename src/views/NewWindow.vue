<template lang="pug">
   div
      div.row(style="margin: 0;")
         h1 New window
         button(class="btn btn-primary" @click="onClose") Click Me!
      div.row(style="margin: 0;")
         div.col-md-12
            input(type="text" placeholder="Something")
</template>

<script lang="ts">
import Vue from "vue";

// interface IPCParams {
//    data1: string;
//    data2: string;
//    data3: string;
// }

export default Vue.extend({
   name: "new-window-component",
   data() {
      return {};
   },
   // created() {
   //    window.api.receive("new-window-reply", (data:IPCParams) => {
   //       console.log("data", data);
   //    });
   // },
   methods: {
      onClose() {
         window.api.send("new-window-close");
      }
   }
});
</script>

<style lang="sass" scoped></style>
