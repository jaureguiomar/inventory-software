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
               <p>{{ content.title }}</p>
            </template>
            <template #subtitle>{{ content.description }}</template>
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
                     <input id="name" v-model="data.name.text" v-focus="v-focus" class="form-control counter" type="text" placeholder="Enter name" :class="{ 'is-invalid': data.name.error.is_error }" @blur="onNameBlur" @keyup="onNameKeyup" />
                     <div v-if="data.name.error.is_error" class="invalid-feedback text-left">{{ data.name.error.message }}</div>
                     <BadgeCounter :value="data.name.text" :maxText="data.name.max_text" :isError="data.name.error.is_error"></BadgeCounter>
                  </div>
               </div>
               <div class="text-center">
                  <button
                     id="add-update-button"
                     class="btn btn-primary text-center mr-2"
                     type="submit"
                     @click="onAddUpdate"
                  >
                     {{ (id <= 0) ? $t("supplier.window.add.button.add") : $t("supplier.window.update.button.update") }}
                  </button>
                  <button
                     class="btn btn-danger text-center mr-2"
                     type="clear"
                     @click="onClear"
                  >
                     {{ $t("supplier.window.button.clear") }}
                  </button>
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
import Vue, { defineComponent } from "vue";
import mixins from "vue-typed-mixins";
import defaultMixin from "../../plugins/mixins";
import { Props, IPCParams, AxiosResponse, Supplier } from "../../interfaces/supplier/supplier-add-update";
import Banner from "../../views/layout/Banner.vue";
import Menu from "../../views/layout/Menu.vue";
import Content from "../../views/layout/Content.vue";
import BadgeCounter from "../../views/components/BadgeCounter.vue";

export default defineComponent({
   name: "supplier-add-update-component",
   components: {
      Banner,
      Menu,
      Content,
      BadgeCounter
   },
   mixins: [defaultMixin],
   data() {
      return {
         id: -1,
         type: "",
         content: {
            title: "",
            description: ""
         },
         data: {
            name: {
               text: "",
               max_text: 70,
               error: {
                  is_error: false,
                  message: ""
               }
            }
         },
         loaded: false
      } as Props;
   },
   created() {
      const vue_this = this;
      window.api.receive("supplier-module-window-reply", (data:IPCParams) => {
         vue_this.id = data.id;
         vue_this.type = data.type;
         vue_this.content = data.content;
         if(data.data)
            vue_this.data.name.text = data.data.name;
         vue_this.loaded = true;
      });
   },
   methods: {
      async onAddUpdate() {
         this.data.name.text = this.data.name.text.trim();
         let name = this.data.name.text;
         let error_name = false;

         error_name = this.validateName(name);
         if(error_name)
            return;

         let data:Supplier|null = null;
         if(this.id <= 0) {
            let response:AxiosResponse = await Vue.prototype.$http.put("supplier/v3/create.php", {
               name: this.data.name.text
            });
            if(response) {
               if(!response.data.error.is_error) {
                  data = response.data.data.data;
               } else {
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
         } else {
            let response:AxiosResponse = await Vue.prototype.$http.post("supplier/v3/update.php", {
               id: this.id,
               name: this.data.name.text,
            });
            if(response) {
               if(!response.data.error.is_error) {
                  data = response.data.data.data;
               } else {
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
         }

         const vue_this = this;
         let message = "";
         if(this.type === "add")
            message = "The supplier has been added properly";
         else if(this.type === "update")
            message = "The supplier has been updated properly";

         window.api.send("supplier-module-window-dialog", {
            type: this.type,
            message: message
         });
         window.api.receive("supplier-module-window-dialog-reply", () => {
            window.api.send("supplier-module-window-close", {
               id: vue_this.id,
               data: data,
               result: "success",
               type: vue_this.type
            });
         });
      },
      onClear() {
         this.clearForm();
      },
      onClose() {
         const vue_this = this;
         window.api.send("supplier-module-window-close", {
            id: this.id,
            data: null,
            result: "closed",
            type: vue_this.type
         });
      },
      clearForm() {
         this.data.name.text = "";
         this.data.name.error.is_error = false;
         this.data.name.error.message = "";
      },
      /////////////////
      // Blur Events //
      onNameBlur() {
         let value = this.data.name.text;
         this.validateName(value);
      },
      /////////////////////
      // Keypress Events //
      onNameKeyup(e) {
         let value = this.data.name.text;
         this.validateName(value);
         this.enterKeyNavigation(e, "add-update-button", "");
      },
      ////////////////
      // Validators //
      validateName(name:string) {
         let error = false;
         error = this.validateField(name, "name", "data", () => {
            if(this.data.name.text.length <= this.data.name.max_text)
               return null;
            return "This field has exceeded the length limit";
         });
         return error;
      },
      ///////////////
      // Functions //
      enterKeyNavigation(e, inputAfter:string, inputBefore:string) {
         if(e.keyCode === 13) {
            if(e.shiftKey) {
               if(inputBefore) {
                  const input = document.getElementById(inputBefore) as any;
                  input.focus();
               }
            } else {
               const input = document.getElementById(inputAfter) as any;
               input.focus();
            }
         }
      }
   }
});
</script>

<style lang="sass" scoped>
   @import "../../assets/scss/loader.scss"
</style>
