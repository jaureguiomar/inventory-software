import axios from "axios";

export default axios.create({
   baseURL: "http://127.0.0.1/inventory-software-api/api/",
   responseType: "json",
   headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
   },
   timeout: 10000
});
