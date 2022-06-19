import Vue from "vue";

Vue.filter("curString", function (value, maxLength) {
   if(value.length > maxLength)
      return value.slice(0, maxLength).concat('...');
   else
      return value;
});
