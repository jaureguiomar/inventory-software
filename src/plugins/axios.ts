import Vue from "vue";
import axios from "axios";

const api = axios.create({
   baseURL: "http://127.0.0.1/vue-typescript-full-sample/",
   timeout: 10000
});

Vue.prototype.$http = api;
