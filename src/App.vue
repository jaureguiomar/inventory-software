<template>
   <div id="app">
      <router-view></router-view>
   </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { key } from "@/plugins/store";

export default defineComponent({
   name: "App",
   setup() {
      const store = useStore(key);
      onMounted(() => {
         const is_online = window.navigator.onLine;
         store.commit("SET_IS_ONLINE_DATA", is_online);
         window.addEventListener("online", onOnline);
         window.addEventListener("offline", onOffline);
      });
      onUnmounted(() => {
         window.removeEventListener("online", onOnline);
         window.removeEventListener("offline", onOffline);
      });

      const onOnline = () => {
         store.commit("SET_IS_ONLINE_DATA", true);
      };
      const onOffline = () => {
         store.commit("SET_IS_ONLINE_DATA", false);
      };
   }
});
</script>

<style lang="sass" scoped></style>
