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
               p {{ $t("client.window.see.title") }}
            template(#subtitle) {{ $t("client.window.see.subtitle") }}
         Content
            template(#content)
               div(v-if="id > 0" class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("client.window.field.id") }}:
                  div(class="col-sm-2")
                     input(
                        v-model="id"
                        type="text"
                        class="form-control"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("client.window.field.first_name") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="first_name"
                        type="text"
                        class="form-control counter"
                        placeholder="Enter first name"
                        disabled
                     )
                  label(class="col-sm-2 col-form-label") {{ $t("client.window.field.last_name") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="last_name"
                        type="text"
                        class="form-control"
                        placeholder="Enter last name"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("client.window.field.address") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="address"
                        type="text"
                        class="form-control"
                        placeholder="Enter address"
                        disabled
                     )
                  label(class="col-sm-2 col-form-label") {{ $t("client.window.field.cellphone") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="cellphone"
                        type="text"
                        class="form-control"
                        placeholder="Enter cellphone"
                        disabled
                     )
               div(class="form-group row")
                  label(class="col-sm-2 col-form-label") {{ $t("client.window.field.cellphone2") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="cellphone2"
                        type="text"
                        class="form-control"
                        placeholder="Enter cellphone 2"
                        disabled
                     )
                  label(class="col-sm-2 col-form-label") {{ $t("client.window.field.email") }}:
                  div(class="col-sm-4")
                     input(
                        v-model="email"
                        type="text"
                        class="form-control"
                        placeholder="Enter email"
                        disabled
                     )
               div.text-center
                  button(type="clear" class="btn btn-info text-center" @click="onClose") {{ $t("client.window.button.close") }}
</template>

<script lang="ts">
import mixins from "vue-typed-mixins";
import defaultMixin from "../../plugins/mixins";
import { Props, IPCParams } from "../../interfaces/client/client-see";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";

export default mixins(defaultMixin).extend({
   name: "client-see-component",
   mixins: [defaultMixin],
   components: {
      Banner,
      Menu,
      Content
   },
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
