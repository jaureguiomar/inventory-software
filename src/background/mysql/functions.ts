export const parseStringField = (value:string) => {
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
