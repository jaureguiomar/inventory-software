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
