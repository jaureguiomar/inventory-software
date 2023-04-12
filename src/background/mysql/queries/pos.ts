import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { get_branch_by_id } from "@/background/mysql/queries/branch";
import { Pos, PosMySQL } from "@/types/pos";
import { MySQLDelete } from "@/types/general";
import { Branch } from "@/types/branch";

export const get_poss = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<Pos>>((resolve) => {
      const query = "select * from pos where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<PosMySQL>) => {
         const data:Array<Pos> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const branch:Branch = await get_branch_by_id(connection, rows[i].id_branch);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  name: rows[i].name,
                  machine_id: rows[i].machine_id,
                  mac_address: rows[i].mac_address,
                  id_branch: Number(rows[i].id_branch),
                  branch: branch
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

// export const get_poss_unsync = async(connection:Connection) => {
//    const promise_get_categories = new Promise<Array<PosMySQL>>((resolve) => {
//       const query = "select * from pos where is_sync = 0";
//       connection.query(query, async(error:MysqlError, rows:Array<PosMySQL>) => {
//          const data:Array<PosMySQL> = [];
//          if(!error) {
//             for(let i = 0; i < rows.length; i++) {
//                const branch:Branch = await get_branch_by_id(connection, rows[i].id_branch);
//                data.push({
//                   id: Number(rows[i].id),
//                   is_active: rows[i].is_active,
//                   created: rows[i].created,
//                   updated: rows[i].updated,
//                   name: rows[i].name,
//                   machine_id: rows[i].machine_id,
//                   mac_address: rows[i].mac_address,
//                   id_branch: Number(rows[i].id_branch),
//                   branch: branch
//                });
//             }
//          }
//          resolve(data);
//       });
//    });
//    return await promise_get_categories;
// }

export const get_pos_by_id = async(connection:Connection, id:number) => {
   const promise_get_pos_by_id = new Promise<Pos>((resolve) => {
      const query = "select * from pos where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<PosMySQL>) => {
         let result_pos:Pos = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            machine_id: "",
            mac_address: "",
            id_branch: -1,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_pos = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated),
                  branch: branch
               };
            }
         }
         resolve(result_pos);
      });
   });
   return await promise_get_pos_by_id;
};

// export const get_pos_mysql_by_id = async(connection:Connection, id:number) => {
//    const promise_get_pos_mysql_by_id = new Promise<PosMySQL>((resolve) => {
//       const query = "select * from pos where is_active = 1 and id = " + id;
//       connection.query(query, async(error:MysqlError, rows:Array<PosMySQL>) => {
//          let result_pos:PosMySQL = {
//             id: -1,
//             is_active: -1,
//             created: new Date(),
//             updated: new Date(),
//             name: "",
//             machine_id: "",
//             mac_address: "",
//             id_branch: -1,
//             branch: null
//          };

//          if(!error) {
//             if(rows.length > 0) {
//                const curr_row = rows[0];
//                const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
//                result_pos = {
//                   ...curr_row,
//                   branch: branch
//                };
//             }
//          }
//          resolve(result_pos);
//       });
//    });
//    return await promise_get_pos_mysql_by_id;
// };

export const insert_pos = async(connection:Connection, data:Pos) => {
   const promise_insert_pos = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into pos set ";
      query += "name = '" + data.name + "', ";
      query += "machine_id = '" + data.machine_id + "', ";
      query += "mac_address = '" + data.mac_address + "', ";
      query += "id_branch = " + data.id_branch;

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_pos;
};

export const update_pos = async(connection:Connection, data:PosMySQL) => {
   const promise_update_pos = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update pos set ";
      query += "name = '" + data.name + "', ";
      query += "machine_id = '" + data.machine_id + "', ";
      query += "mac_address = '" + data.mac_address + "', ";
      query += "id_branch = " + data.id_branch + " ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_update_pos;
};

export const delete_pos = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_pos = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update pos set ";
      query += "is_active = 0 ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_delete_pos;
};
