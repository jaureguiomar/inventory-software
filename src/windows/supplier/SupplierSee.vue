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
               <p>{{ $t("supplier.window.see.title") }}</p>
            </template>
            <template #subtitle>{{ $t("supplier.window.see.subtitle") }}</template>
         </Menu>
         <Content>
            <template #content>
               <div v-if="id &gt; 0" class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("supplier.window.field.id") }}:</label>
                  <div class="col-sm-2">
                     <input v-model="id" class="form-control" type="text" disabled="disabled" />
                  </div>
               </div>
               <div class="form-group row">
                  <label class="col-sm-2 col-form-label">{{ $t("supplier.window.field.name") }}:</label>
                  <div class="col-sm-4">
                     <input v-model="name" class="form-control counter" type="text" placeholder="Enter first name" disabled="disabled" />
                  </div>
               </div>
               <div class="text-center">
                  <button
                     class="btn btn-info text-center"
                     type="clear"
                     @click="onClose"
                  >
                     {{ $t("supplier.window.button.close") }}
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
import { Props, IPCParams } from "../../interfaces/supplier/supplier-see";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default defineComponent({
   name: "supplier-see-component",
   components: {
      Banner,
      Menu,
      Content
   },
   mixins: [defaultMixin],
   data() {
      return {
         id: -1,
         name: "",
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("supplier-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         if(data.data) {
            vue_this.name = data.data.name;
         }
         vue_this.loaded = true;
      });
   },
   methods: {
      onClose() {
         window.api.send("supplier-module-window-close", {
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
