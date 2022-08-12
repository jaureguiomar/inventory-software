<template lang="pug">
   div
      div.main-container
         div.banner
            div.logo Inventory
            div.text System
         div.menu
            div.title Add Client
            div.subtitle The clients that will be added for the use of the system
         div.content
            div.border-top
            div.content-container
               div(class="form-group row")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
               div(class="form-group row")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
               div(class="form-group row")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
               div(class="form-group row")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
               div(class="form-group row mb-4")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
                  label(for="staticEmail" class="col-sm-2 col-form-label") Email
                  div(class="col-sm-4")
                     input(type="text" class="form-control")
               div.text-center
                  button(type="submit" class="btn btn-primary text-center mr-2") Sign in
                  button(type="clear" class="btn btn-danger text-center mr-2") Clear
                  button(type="clear" class="btn btn-info text-center" @click="onClose") Other
</template>

<script lang="ts">
import Vue from "vue";

// interface IPCParams {
//    data1: string;
//    data2: string;
//    data3: string;
// }

export default Vue.extend({
   name: "new-window-component",
   data() {
      return {};
   },
   // created() {
   //    window.api.receive("new-window-reply", (data:IPCParams) => {
   //       console.log("data", data);
   //    });
   // },
   methods: {
      onClose() {
         window.api.send("client-add-update-window-close");
      }
   }
});
</script>

<style lang="sass" scoped>
   .main-container
      width: 100%
      height: 100vh
      display: block
      padding: 16px
      background: #edf5e1
      .banner
         width: 100%
         height: auto
         display: block
         background: #05386b
         color: #edf5e1
         padding: 40px
         border-radius: 10px
         display: flex
         flex-direction: row
         align-items: center
         font-size: 26px
         font-weight: bold
         margin-bottom: 10px
         transition: 0.3s
         &:hover
            box-shadow: 5px 5px #379683
         .logo
            background: #5cdb94
            color: #edf5e1
            padding: 20px
            border-radius: 10px
            margin-right: 20px
            transition: 0.3s
            &:hover
               cursor: pointer
               background: #05386b
      .menu
         width: 100%
         height: auto
         display: block
         background: #5cdb94
         border-radius: 10px
         padding: 20px 40px
         margin-bottom: 10px
         transition: 0.3s
         &:hover
            box-shadow: 5px 5px #8ee4af
         .title
            font-size: 26px
            font-weight: bold
            color: #edf5e1
            border-radius: 4px
            transition: 0.3s
            background: linear-gradient(to left, #5cdb94 50%, #05386b 50%) right
            background-size: 200%
            transition: .5s ease-out
            &:hover
               background-position: left
         .subtitle
            font-size: 19px
            color: #edf5e1
      .content
         width: 100%
         height: auto
         display: block
         background: #5cdb94
         border-radius: 10px
         transition: 0.3s
         &:hover
            box-shadow: 5px 5px #8ee4af
         label
            color: #edf5e1
            font-weight: bold
         .border-top
            background: #05386b
            height: 20px
            border-start-start-radius: 10px
            border-start-end-radius: 10px
         .content-container
            padding: 20px 36px
</style>
