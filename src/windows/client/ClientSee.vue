<template>
   <transition-group name="list" tag="div">
      <div v-if="!loaded" key="loader" class="spinner-loader">
         <div class="spinner-loader-container">
            <div class="spinner-ripple-loader">
               <div class="spinner-ripple-loader-container">
                  <div></div>
                  <div></div>
               </div>
            </div>
         </div>
      </div>

      <div v-if="loaded" key="content" class="main-container">
         <Banner />
         <Menu>
            <template #left-content>
               <p>{{ $t("client.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ $t("client.window.see.subtitle") }}</template>
         </Menu>
         <Content>
            <template #content>
               <div v-if="id &gt; 0" class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.id") }}:</label>
                  <div class="col-sm-2">
                     <input v-model="id" class="form-control" type="text" disabled="disabled" />
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.first_name") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="first_name" class="form-control counter" type="text" placeholder="Enter first name" disabled="disabled" />
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.last_name") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="last_name" class="form-control" type="text" placeholder="Enter last name" disabled="disabled" />
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.address") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="address" class="form-control" type="text" placeholder="Enter address" disabled="disabled" />
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.cellphone") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="cellphone" class="form-control" type="text" placeholder="Enter cellphone" disabled="disabled" />
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.cellphone2") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="cellphone2" class="form-control" type="text" placeholder="Enter cellphone 2" disabled="disabled" />
                  </div>
                  <label class="col-sm-2 col-form-label">{{ $t("client.window.field.email") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="email" class="form-control" type="text" placeholder="Enter email" disabled="disabled" />
                  </div>
               </div>
               <div class="text-center">
                  <button
                     class="btn btn-info text-center"
                     type="clear"
                     @click="onClose"
                  >
                     {{ $t("client.window.button.close") }}
                  </button>
               </div>
            </template>
         </Content>
      </div>
   </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mixins from "vue-typed-mixins";
import defaultMixin from "../../plugins/mixins";
import { Props, IPCParams } from "../../interfaces/client/client-see";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default defineComponent({
   name: "client-see-component",
   components: {
      Banner,
      Menu,
      Content
   },
   mixins: [defaultMixin],
   data() {
      return {
         id: -1,
         first_name: "",
         last_name: "",
         address: "",
         cellphone: "",
         cellphone2: "",
         email: "",
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("client-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         if(data.data) {
            vue_this.first_name = data.data.first_name;
            vue_this.last_name = data.data.last_name;
            vue_this.address = data.data.address;
            vue_this.cellphone = data.data.cellphone;
            vue_this.cellphone2 = (data.data.cellphone2) ? data.data.cellphone2 : "";
            vue_this.email = data.data.email;
         }
         vue_this.loaded = true;
      });
   },
   methods: {
      onClose() {
         window.api.send("client-module-window-close", {
            id: this.id,
            data: null,
            result: "closed",
            type: "see"
         });
      }
   }
});
</script>

<style lang="sass" scoped>
   @import "../../assets/scss/loader.scss"
</style>
