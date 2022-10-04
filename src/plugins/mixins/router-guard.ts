import { _RouteLocationBase } from "vue-router";
import axios from "@/plugins/axios";
import { BranchStore } from "@/interfaces/store";
import { BranchOneResponse } from "@/interfaces/branch/branch";

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

   if(branch.id > 0) {
      try {
         await axios.get<BranchOneResponse>(`branch/v3/select-one.php?id=${ branch.id }`);
         next();
      } catch (error) {
         if(to.name !== "branch-disabled")
            next({ name: "branch-disabled" });
      }
   }
};
