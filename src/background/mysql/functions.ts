export const parseStringField = (value:string|null) => {
   if(!value)
      return null;
   return "'" + value + "'";
};

export const parseDate = (date:Date) => {
   const year:number = date.getFullYear();
   let month:string|number = date.getMonth() + 1;
   let day:string|number = date.getDate();
   if(month < 10)
      month = "0" + month;
   if(day < 10)
      day = "0" + day;
   return year + "-" + month + "-" + day;
}

export const formattedStringDateToDate = (date:string) => {
   const splitted_date = date.split(" ");
   let new_date = new Date();
   if(splitted_date.length === 1) {
      const left_date = splitted_date[0];
      const splitted_left_date = left_date.split("/");
      if(splitted_left_date.length === 3) {
         const day = splitted_left_date[0];
         const month = splitted_left_date[1];
         const year = splitted_left_date[2];
         new_date = new Date(month + " " + day + " " + year);
      }
   } else if(splitted_date.length === 2) {
      const left_date = splitted_date[0];
      const right_date = splitted_date[1];
      const splitted_left_date = left_date.split("/");

      if(splitted_left_date.length === 3) {
         if(splitted_left_date.length === 3) {
            const day = splitted_left_date[0];
            const month = splitted_left_date[1];
            const year = splitted_left_date[2];
            new_date = new Date(month + " " + day + " " + year + " " + right_date);
         }
      }
   }
   return new_date;
}
