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
               p {{ $t("product.window.see.title") }}
            template(#subtitle) {{ $t("product.window.see.subtitle") }}
         Content
            template(#content)
               div(v-if="id > 0" class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("product.window.field.id") }}:
                  div(class="col-sm-2")
                     input(
                        v-model="id"
                        type="text"
                        class="form-control"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("product.window.field.code") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="code"
                        type="text"
                        class="form-control counter"
                        placeholder="Enter code"
                        disabled
                     )
                  label(class="col-sm-2 col-form-label") {{ $t("product.window.field.name") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="name"
                        type="text"
                        class="form-control"
                        placeholder="Enter name"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("product.window.field.description") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="description"
                        type="text"
                        class="form-control"
                        placeholder="Enter description"
                        disabled
                     )
                  label(class="col-sm-2 col-form-label") {{ $t("product.window.field.buy_price") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="buy_price"
                        type="text"
                        class="form-control"
                        placeholder="Enter buy price"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("product.window.field.sale_price") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="sale_price"
                        type="text"
                        class="form-control"
                        placeholder="Enter sale price"
                        disabled
                     )
                  label(class="col-sm-2 col-form-label") {{ $t("product.window.field.quantity") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="quantity"
                        type="text"
                        class="form-control"
                        placeholder="Enter quantity"
                        disabled
                     )
               div.text-center
                  button(type="clear" class="btn btn-info text-center" @click="onClose") {{ $t("product.window.button.close") }}
</template>

<script lang="ts">
import mixins from "vue-typed-mixins";
import defaultMixin from "../../plugins/mixins";
import { Props, IPCParams } from "../../interfaces/product/product-see";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default mixins(defaultMixin).extend({
   name: "product-see-component",
   mixins: [defaultMixin],
   components: {
      Banner,
      Menu,
      Content
   },
   data() {
      return {
         id: -1,
         code: "",
         name: "",
         description: "",
         buy_price: "",
         sale_price: "",
         quantity: "",
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("product-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         if(data.data) {
            vue_this.code = data.data.code;
            vue_this.name = data.data.name;
            vue_this.description = data.data.description;
            vue_this.buy_price = data.data.buy_price;
            vue_this.sale_price = data.data.sale_price;
            vue_this.quantity = data.data.quantity.toString();
         }
         vue_this.loaded = true;
      });
   },
   methods: {
      onClose() {
         window.api.send("product-module-window-close", {
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
