import axios from "@/plugins/axios";
import { BranchStore } from "@/interfaces/store";
import { BranchOneResponse } from '@/interfaces/branch/branch';

export const beforeEnterGuard = async(to, _, next) => {
   const branch:BranchStore = JSON.parse(localStorage.getItem("branch") || `{
      "id": -1,
      "name": "",
      "telephone": "",
      "address": ""
   }`);

   if(branch.id > 0) {
      try {
         await axios.get<BranchOneResponse>(`branch/v3/select-one.php?id=${ branch.id }`);
      } catch (error) {
         if(to.name !== "branch-disabled")
            next({ name: "branch-disabled" });
            return;
      }
   }
   next();
};

export const findValueBy = (all_data, value, key) => {
   let finded_index = -1;
   for(let i = 0; i < all_data.length; i++) {
      const curr_product = all_data[i];
      if(curr_product[key] == value) {
         finded_index = i;
         break;
      }
   }
   return finded_index;
};

export const getFormattedDate = (date:Date) => {
   let day:number|string = date.getDate();
   let month:number|string = (date.getMonth() + 1);
   const year:number|string = date.getFullYear();
   if(day < 10)
      day = "0" + day;
   if(month < 10)
      month = "0" + month;
   return year + "-" + month + "-" + day;
};

export const getFormattedDateString = (date:string, type:number=0, format:number=0, time=false) => {
   let new_date = date;
   if(new_date) {
      const splitted_date = date.split("-");
      const splitted_time = date.split(" ");
      if(splitted_date.length === 3) {
         let day:number|string = parseInt(splitted_date[2]);
         let month:number|string = parseInt(splitted_date[1]);
         const year:number = parseInt(splitted_date[0]);

         if(day < 10)
            day = "0" + day;

         if(type === 0) {
            switch(month) {
               case 1: month = "January"; break;
               case 2: month = "February"; break;
               case 3: month = "March"; break;
               case 4: month = "April"; break;
               case 5: month = "May"; break;
               case 6: month = "June"; break;
               case 7: month = "July"; break;
               case 8: month = "August"; break;
               case 9: month = "September"; break;
               case 10: month = "October"; break;
               case 11: month = "November"; break;
               case 12: month = "December"; break;
            }
         } else {
            if(month < 10)
               month = "0" + month;
         }

         if(format === 0)
            new_date = day + "/" + month + "/" + year;
         else if(format === 1)
            new_date = year + "-" + month + "-" + day;

         if(time) {
            const time = splitted_time[1];
            new_date += " ";
            new_date += time;
         }
      }
   } else {
      new_date = "----";
   }
   return new_date;
};

export const formatEmail = (value:string) => {
   return String(value)
      .toLowerCase()
      .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

// export const enterKeyNavigation = (e:KeyboardEvent, inputAfter:string, inputBefore:string) => {
//    if(e.keyCode === 13) {
//       if(e.shiftKey) {
//          if(inputBefore) {
//             const input = document.getElementById(inputBefore) as any;
//             input.focus();
//          }
//       } else {
//          const input = document.getElementById(inputAfter) as any;
//          input.focus();
//       }
//    }
// };

export const validateField = (value:string, newValidation?:Function|any) => {
   const result = {
      error: false,
      message: ""
   };

   if(value === "" || value === null) {
      result.error = true;
      result.message = "This field is required";
   } else {
      result.error = false;
      result.message = "";
   }

   if(!result.error && typeof(newValidation) == "function") {
      const message_error = newValidation();
      if(message_error) {
         result.error = true;
         result.message = message_error;
      }
   }

   return result;
};

// export const setField = (isError:boolean, field:string, dataKey:string, message:string) => {
//    this[dataKey][field].error.is_error = isError;
//    if(isError)
//       if(message)
//          this[dataKey][field].error.message = message;
//       else
//          this[dataKey][field].error.message = "This field is required";
//    else
//       this[dataKey][field].error.message = "";
// };
