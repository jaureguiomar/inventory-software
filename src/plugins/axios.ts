import axios from "axios";

const server = localStorage.getItem("server");
export default axios.create({
   baseURL: `${ server }/inventory-software-api/api/`,
   responseType: "json",
   headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
   },
   timeout: 10000
});
