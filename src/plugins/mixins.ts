const formMixin = {
   // data() {
   //    return {
   //    }
   // },
   // created() {
   // },
   methods: {
      ///////////////
      // Functions //
      setField(isError:boolean, field:string, dataKey:string, message:string) {
         this[dataKey].details[field].error.is_error = isError;
         if(isError)
            if(message)
               this[dataKey].details[field].error.message = message;
            else
               this[dataKey].details[field].error.message = "This field is required";
         else
            this[dataKey].details[field].error.message = "";
      },
      validateField(value:string, field:string, dataKey:string, newValidation:Function|any) {
         let is_error = false;

         if(value === "") {
            this[dataKey].details[field].error.is_error = true;
            this[dataKey].details[field].error.message = "This field is required";
            is_error = true;
         } else {
            this[dataKey].details[field].error.is_error = false;
            this[dataKey].details[field].error.message = "";
         }

         if(!is_error && typeof(newValidation) == "function") {
            const message_error = newValidation();
            if(message_error) {
               this[dataKey].details[field].error.is_error = true;
               this[dataKey].details[field].error.message = message_error;
               is_error = true;
            }
         }

         return is_error;
      },
      setMembersAlert(isError:boolean, message:string, dataKey:string) {
         this[dataKey].members.alert.is_error = isError;
         this[dataKey].members.alert.message = message;
      }
      // getNowDate() {
      //    const now_date = new Date();
      //    const day = String(now_date.getDate()).padStart(2, "0");
      //    const month = String(now_date.getMonth() + 1).padStart(2, "0");
      //    const year = now_date.getFullYear();
      //    const today = year + "-" + month + "-" + day;
      //    return today;
      // }
   }
};

////////////////////////////
// Sample Usage in Script //
// import mySampleMixin from "@/plugins/mixins";
// export default {
//    mixins: [ mySampleMixin ],
// }

export default sampleMixin;
