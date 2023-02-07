import { Connection, MysqlError } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { Branch, BranchMySQL } from "@/types/branch";

export const get_branch_by_id = async(connection:Connection, id:number) => {
   const promise_get_branch_by_id = new Promise<Branch>((resolve) => {
      const query = "select * from branch where is_active = 1 and id = " + id;
      connection.query(query, function(error:MysqlError, rows:Array<BranchMySQL>) {
         let result_branch:Branch = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            telephone: "",
            address: ""
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               result_branch = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated)
               };
            }
         }
         resolve(result_branch);
      });
   });
   return await promise_get_branch_by_id;
};
