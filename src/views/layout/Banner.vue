<template>
   <div class="banner">
      <div class="logo">{{ t("banner.inventory") }}</div>
      <div class="text">{{ t("banner.system") }}</div>

      <div v-if="getSessionLogguedIn" class="branch-data">
         <div class="branch-data-title">
            <strong>{{ getBranch.name }}</strong>
         </div>
         -
         {{ getBranch.address }} ({{ getBranch.telephone }})
      </div>
      <div v-if="getSessionLogguedIn" class="user-data">
         <strong>Cajero:</strong>
         {{ getSessionUser.first_name + " " + getSessionUser.last_name }}
      </div>
      <div v-if="getPos" class="pos-data">
         <strong>Caja:</strong>
         {{ getPos.name }}
      </div>
      <div v-if="getSessionLogguedIn" class="system-data">
         <span class="q-mr-sm">Inventory Software v0.1.0</span>
         <span :style="[getIsOnline ? { color: '#5cdb94' } : { color: '#C10015' }]">({{ (getIsOnline) ? "Online" : "Offline" }})</span>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
import { key } from "@/plugins/store";

export default defineComponent({
   name: "banner-component",
   setup() {
      const { t } = useI18n();
      const store = useStore(key);

      const getIsOnline = computed(() => {
         return store.getters["getIsOnline"];
      });
      const getBranch = computed(() => {
         return store.getters["getBranch"];
      });
      const getPos = computed(() => {
         return store.getters["getPos"];
      });
      const getSessionLogguedIn = computed(() => {
         return store.getters["getSessionLogguedIn"];
      });
      const getSessionUser = computed(() => {
         return store.getters["getSessionUser"];
      });

      return {
         t,
         getIsOnline,
         getBranch,
         getPos,
         getSessionLogguedIn,
         getSessionUser
      };
   }
});
</script>

<style lang="sass" scoped>
   .banner
      width: 100%
      height: auto
      display: block
      background: #05386b
      padding: 40px
      display: flex
      flex-direction: row
      align-items: center
      font-size: 26px
      font-weight: bold
      margin-bottom: 10px
      transition: 0.3s
      border-radius: 4px
      color: white
      box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
      &:hover
         box-shadow: 5px 5px #379683
      .logo
         background: #5cdb94
         color: white
         padding: 20px
         border-radius: 10px
         margin-right: 20px
         transition: 0.3s
         &:hover
            cursor: pointer
            background: #05386b
      .branch-data
         position: absolute
         right: 34px
         top: 30px
         color: white
         font-size: 16px
         .branch-data-title
            font-size: 24px
            display: inline-block
      .user-data
         position: absolute
         right: 34px
         top: 70px
         color: white
         font-size: 16px
         font-weight: normal
      .pos-data
         position: absolute
         right: 34px
         top: 107px
         color: white
         font-size: 16px
         font-weight: normal
      .system-data
         position: absolute
         right: 34px
         top: 137px
         color: white
         font-size: 16px
         font-weight: normal

   @media screen and (max-width: 1000px)
      .banner
         flex-direction: column
         text-align: center
         .logo
            margin: 0
         .text
            margin-top: 10px
         .branch-data
            position: relative
            top: 0
            right: 0
         .user-data
            position: relative
            top: 0
            right: 0
            margin-bottom: 7px
         .pos-data
            position: relative
            top: 0
            right: 0
            margin-bottom: 7px
         .system-data
            position: relative
            top: 0
            right: 0
</style>
