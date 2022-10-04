<template>
   <div class="main-container">
      <Banner />
      <MenuHome />
      <Content>
         <template #content>
            <div class="indicators">
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
            </div>
         </template>
      </Content>
      <Content>
         <template #content>
            <h2 class="q-ma-none">Charts here!</h2>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { key } from "@/plugins/store"
import { Branch, BranchesResponse } from "@/interfaces/branch/branch";
import { Client, ClientsResponse } from "@/interfaces/client/client";
import Banner from "@/views/layout/Banner.vue";
import Content from "@/views/layout/Content.vue";
import MenuHome from "@/views/layout/MenuHome.vue";

export default defineComponent({
   name: "home-component",
   components: {
      Banner,
      Content,
      MenuHome
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);

      onMounted(() => {
         const is_online = window.navigator.onLine;
         store.commit("SET_IS_ONLINE_DATA", is_online);

         if(is_online) {
            if(!getAutomaticBakupDone.value) {
               onRefreshBakup();
               store.commit("SET_AUTOMATIC_BAKUP_DONE_DATA", true);
            }
         }

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
      const onRefreshBakup = async() => {
         let branch:Array<Branch> = [];
         let client:Array<Client> = [];

         // Get Branches
         try {
            let response = await axios.get<BranchesResponse>("branch/v3/select-all.php");
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_branches:Array<Branch> = [];
                  for(let i = 0; i < data.length; i++) {
                     formatted_branches.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        name: data[i].name,
                        telephone: data[i].telephone,
                        address: data[i].address,
                        machine_id: data[i].machine_id,
                        mac_address: data[i].mac_address
                     });
                  }
                  branch = formatted_branches;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("branch-error", error);
         }

         // Get Clients
         try {
            let response = await axios.get<ClientsResponse>("client/v3/find.php", {
               params: {
                  type: "id_branch",
                  query: getBranchId.value
               }
            });
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_clients:Array<Client> = [];
                  for(let i = 0; i < data.length; i++) {
                     formatted_clients.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        first_name: data[i].first_name,
                        last_name: data[i].last_name,
                        address: data[i].address,
                        cellphone: data[i].cellphone,
                        cellphone2: data[i].cellphone2,
                        email: data[i].email
                     });
                  }
                  client = formatted_clients;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("client-error", error);
         }

         window.api.send("mysql-bakup", {
            branch: branch,
            user_role: [],
            user: [],
            category: [],
            product: [],
            sale: [],
            sale_product: [],
            supplier: [],
            client: client
         });
         window.api.receive("mysql-bakup-reply", function() {
            Swal.fire({
               title: "Ok",
               text: "Database bakup done successfully",
               icon: "success"
            });
         });

         console.log("onRefreshBakup");
      };

      const getAutomaticBakupDone = computed(() => {
         return store.getters["getAutomaticBakupDone"];
      });
      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
      });
   }
});
</script>

<style lang="sass" scoped>
   .indicators
      width: 100%
      height: auto
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .indicator-item
         display: flex
         flex-direction: row
         align-items: center
         justify-content: space-between
         border: 1px solid #379683
         padding: 30px
         // width: calc(25% - 40px)
         width: 300px
         background: #5cdb94
         border-radius: 10px
         color: white
         .indicator-left
            margin-right: 20px
            a
               svg
                  color: white
         .indicator-right
               h4
                  margin: 0
                  padding: 0
                  font-weight: bold
                  font-size: 30px
               h6
                  margin: 0
                  padding: 0

   @media screen and (max-width: 1340px)
      .indicators
         .indicator-item
            width: 250px
   @media screen and (max-width: 1160px)
      .indicators
         flex-direction: column
         .indicator-item
            width: 70%
            &:not(:last-child)
               margin-bottom: 20px
   @media screen and (max-width: 600px)
      .indicators
         .indicator-item
            width: 100%
</style>
