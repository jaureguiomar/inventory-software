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
               p {{ $t("category.window.see.title") }}
            template(#subtitle) {{ $t("category.window.see.subtitle") }}
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
                  button(type="clear" class="btn btn-info text-center" @click="onClose") {{ $t("category.window.button.close") }}
</template>

<script lang="ts">
import mixins from "vue-typed-mixins";
import defaultMixin from "../../plugins/mixins";
import { Props, IPCParams } from "../../interfaces/category/category-see";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default mixins(defaultMixin).extend({
   name: "category-see-component",
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
      onClose() {
         window.api.send("category-module-window-close", {
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
