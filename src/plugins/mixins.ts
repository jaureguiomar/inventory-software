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

export const enterKeyNavigation = (e:KeyboardEvent, inputAfter:string, inputBefore:string) => {
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
};

export const validateField = (value:string, field:string, dataKey:string, newValidation:Function|any) => {
   let is_error = false;

   if(value === "") {
      [dataKey][field].error.is_error = true;
      [dataKey][field].error.message = "This field is required";
      is_error = true;
   } else {
      [dataKey][field].error.is_error = false;
      [dataKey][field].error.message = "";
   }

   if(!is_error && typeof(newValidation) == "function") {
      const message_error = newValidation();
      if(message_error) {
         [dataKey][field].error.is_error = true;
         [dataKey][field].error.message = message_error;
         is_error = true;
      }
   }

   return is_error;
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

// export const validateField = (value:string, field:string, dataKey:string, newValidation:Function|any) => {
//    let is_error = false;

//    if(value === "") {
//       this[dataKey][field].error.is_error = true;
//       this[dataKey][field].error.message = "This field is required";
//       is_error = true;
//    } else {
//       this[dataKey][field].error.is_error = false;
//       this[dataKey][field].error.message = "";
//    }

//    if(!is_error && typeof(newValidation) == "function") {
//       const message_error = newValidation();
//       if(message_error) {
//          this[dataKey][field].error.is_error = true;
//          this[dataKey][field].error.message = message_error;
//          is_error = true;
//       }
//    }

//    return is_error;
// };
