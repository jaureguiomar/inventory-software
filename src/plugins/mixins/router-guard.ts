import { _RouteLocationBase } from "vue-router";
import axios from "axios";
import { BranchStore } from "@/types/store";
import { BranchOneResponse } from "@/types/branch";
import store from "@/plugins/store";

export const validateBranchSelect = (to:_RouteLocationBase, from:_RouteLocationBase, next:Function) => {
   const branch:BranchStore = JSON.parse(localStorage.getItem("branch") || `{
      "id": -1,
      "name": "",
      "telephone": "",
      "address": ""
   }`);

   if(branch.id <= 0 && to.name !== "branch-select")
      next({ name: "branch-select" });
   else
      next();
};

export const validateBranchActive = async(to:_RouteLocationBase, from:_RouteLocationBase, next:Function) => {
   const branch:BranchStore = JSON.parse(localStorage.getItem("branch") || `{
      "id": -1,
      "name": "",
      "telephone": "",
      "address": ""
   }`);
   if(!store.getters.getServer)
      store.commit("SET_SERVER_DATA", localStorage.getItem("server"));

   if(branch.id > 0) {
      try {
         await axios.get<BranchOneResponse>(`${ store.getters.getServer }/branch/v3/select-one.php?id=${ branch.id }`);
         next();
      } catch (error) {
         if(to.name !== "branch-disabled")
            next({ name: "branch-disabled" });
      }
   }
};
