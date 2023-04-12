import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { Branch, BranchMySQL } from "@/types/branch";
import { MySQLDelete } from "@/types/general";

export const get_branches = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<Branch>>((resolve) => {
      const query = "select * from branch where is_active = 1";
      connection.query(query, function(error:MysqlError, rows:Array<BranchMySQL>) {
         const data:Array<Branch> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  name: rows[i].name,
                  telephone: rows[i].telephone,
                  address: rows[i].address
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

// export const get_branches_unsync = async(connection:Connection) => {
//    const promise_get_categories = new Promise<Array<BranchMySQL>>((resolve) => {
//       const query = "select * from branch where is_sync = 0";
//       connection.query(query, function(error:MysqlError, rows:Array<BranchMySQL>) {
//          const data:Array<BranchMySQL> = [];
//          if(!error) {
//             for(let i = 0; i < rows.length; i++) {
//                data.push({
//                   id: Number(rows[i].id),
//                   is_active: rows[i].is_active,
//                   created: rows[i].created,
//                   updated: rows[i].updated,
//                   name: rows[i].name,
//                   telephone: rows[i].telephone,
//                   address: rows[i].address
//                });
//             }
//          }
//          resolve(data);
//       });
//    });
//    return await promise_get_categories;
// }

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

// export const get_branch_mysql_by_id = async(connection:Connection, id:number) => {
//    const promise_get_branch_mysql_by_id = new Promise<BranchMySQL>((resolve) => {
//       const query = "select * from branch where is_active = 1 and id = " + id;
//       connection.query(query, function(error:MysqlError, rows:Array<BranchMySQL>) {
//          let result_branch:BranchMySQL = {
//             id: -1,
//             is_active: -1,
//             created: new Date(),
//             updated: new Date(),
//             name: "",
//             telephone: "",
//             address: ""
//          };

//          if(!error) {
//             if(rows.length > 0) {
//                const curr_row = rows[0];
//                result_branch = { ...curr_row };
//             }
//          }
//          resolve(result_branch);
//       });
//    });
//    return await promise_get_branch_mysql_by_id;
// };

export const insert_branch = async(connection:Connection, data:Branch) => {
   const promise_insert_branch = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into branch set ";
      query += "name = '" + data.name + "', ";
      query += "telephone = '" + data.telephone + "', ";
      query += "address = '" + data.address + "'";

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_branch;
};

export const update_branch = async(connection:Connection, data:BranchMySQL) => {
   const promise_update_branch = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update branch set ";
      query += "name = '" + data.name + "', ";
      query += "telephone = '" + data.telephone + "', ";
      query += "address = '" + data.address + "' ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_update_branch;
};

export const delete_branch = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_branch = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update branch set ";
      query += "is_active = 0 ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_delete_branch;
};
