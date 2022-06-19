const sampleMixin = {
   methods: {
      sampleFunction() {},
   },
   mutation: {},
   data() {
      return {
         testVariable: "Some value",
      };
   }
};

////////////////////////////
// Sample Usage in Script //
// import mySampleMixin from "@/plugins/mixins";
// export default {
//    mixins: [ mySampleMixin ],
// }

export default sampleMixin;
