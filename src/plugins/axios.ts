import Vue from "vue";
import axios from "axios";

const api = axios.create({
   baseURL: "http://127.0.0.1/inventory-software-api/api/",
   responseType: "json",
   headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
   },
   timeout: 10000
});

Vue.prototype.$http = api;
