<template lang="pug">
   transition-group(name="list" tag="div")
      div(v-if="!loaded" key="loader" class="spinner-loader")
         div(class="spinner-loader-container")
            div(class="spinner-ripple-loader")
               div(class="spinner-ripple-loader-container")
                  div
                  div

      div.main-container(v-if="loaded" key="content")
         Banner
         Menu
            template(#left-content)
               p {{ $t("category.window.delete.title") }}
            template(#subtitle) {{ $t("category.window.delete.subtitle") }}
         Content
            template(#content)
               div(v-if="id > 0" class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("category.window.field.id") }}:
                  div(class="col-sm-2")
                     input(
                        v-model="id"
                        type="text"
                        class="form-control"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("category.window.field.name") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="name"
                        type="text"
                        class="form-control counter"
                        placeholder="Enter first name"
                        disabled
                     )
               div.text-center
                  button( type="submit" class="btn btn-danger text-center mr-2" @click="onDelete") {{ $t("category.window.delete.button.delete") }}
                  button(type="clear" class="btn btn-info text-center" @click="onClose") {{ $t("category.window.button.close") }}
</template>

<script lang="ts">
import Vue from "vue";
import mixins from "vue-typed-mixins";
import defaultMixin from "../../plugins/mixins";
import { Props, IPCParams } from "../../interfaces/category/category-delete";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default mixins(defaultMixin).extend({
   name: "category-delete-component",
   mixins: [defaultMixin],
   components: {
      Banner,
      Menu,
      Content
   },
   data() {
      return {
         id: -1,
         name: "",
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("category-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         if(data.data) {
            vue_this.name = data.data.name;
         }
         vue_this.loaded = true;
      });
   },
   methods: {
      async onDelete() {
         let response = await Vue.prototype.$http.delete("category/v3/delete.php", {
            params: {
               field: "id",
               data: this.id
            },
         });
         if(response) {
            if(response.data.error.is_error) {
               this.$fire({
                  title: "Error",
                  text: this.$t("global.default_error") as string,
                  type: "error"
               });
               return;
            }
         } else {
            this.$fire({
               title: "Error",
               text: this.$t("global.default_error") as string,
               type: "error"
            });
            return;
         }

         const vue_this = this;
         window.api.send("category-module-window-dialog", {
            type: "delete",
            message: "The category has been deleted properly"
         });
         window.api.receive("category-module-window-dialog-reply", () => {
            window.api.send("category-module-window-close", {
               id: vue_this.id,
               data: null,
               result: "success",
               type: "delete"
            });
         });
      },
      onClose() {
         window.api.send("category-module-window-close", {
            id: this.id,
            data: null,
            result: "closed",
            type: "delete"
         });
      },
   }
});
</script>

<style lang="sass" scoped>
   @import "../../assets/scss/loader.scss"
</style>
