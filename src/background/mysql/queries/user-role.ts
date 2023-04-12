import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { get_user_by_id } from "@/background/mysql/queries/user";
import { get_pos_by_id } from "@/background/mysql/queries/pos";
import { get_branch_by_id } from "@/background/mysql/queries/branch";
import { UserRole, UserRoleMySQL } from "@/types/user-role";
import { MySQLDelete } from "@/types/general";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";

export const get_user_roles = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<UserRole>>((resolve) => {
      const query = "select * from user_role where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<UserRoleMySQL>) => {
         const data:Array<UserRole> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const user:User = await get_user_by_id(connection, rows[i].id_user);
               const pos:Pos = await get_pos_by_id(connection, rows[i].id_pos);
               const branch:Branch = await get_branch_by_id(connection, rows[i].id_branch);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  name: rows[i].name,
                  atributes_1: Number(rows[i].atributes_1),
                  atributes_2: Number(rows[i].atributes_2),
                  atributes_3: Number(rows[i].atributes_3),
                  atributes_4: Number(rows[i].atributes_4),
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  user: user,
                  pos: pos,
                  branch: branch
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

export const get_user_roles_mysql_unsync = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<UserRoleMySQL>>((resolve) => {
      const query = "select * from user_role where is_sync = 0";
      connection.query(query, async(error:MysqlError, rows:Array<UserRoleMySQL>) => {
         const data:Array<UserRoleMySQL> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const user:User = await get_user_by_id(connection, rows[i].id_user);
               const pos:Pos = await get_pos_by_id(connection, rows[i].id_pos);
               const branch:Branch = await get_branch_by_id(connection, rows[i].id_branch);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  is_sync: Number(rows[i].is_sync),
                  sync_type: rows[i].sync_type,
                  created: rows[i].created,
                  updated: rows[i].updated,
                  name: rows[i].name,
                  atributes_1: Number(rows[i].atributes_1),
                  atributes_2: Number(rows[i].atributes_2),
                  atributes_3: Number(rows[i].atributes_3),
                  atributes_4: Number(rows[i].atributes_4),
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  user: user,
                  pos: pos,
                  branch: branch
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

export const get_user_role_by_id = async(connection:Connection, id:number) => {
   const promise_get_user_role_by_id = new Promise<UserRole>((resolve) => {
      const query = "select * from user_role where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<UserRoleMySQL>) => {
         let result_user_role:UserRole = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            atributes_1: -1,
            atributes_2: -1,
            atributes_3: -1,
            atributes_4: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_user_role = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated),
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_user_role);
      });
   });
   return await promise_get_user_role_by_id;
};

export const get_user_role_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_user_role_mysql_by_id = new Promise<UserRoleMySQL>((resolve) => {
      const query = "select * from user_role where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<UserRoleMySQL>) => {
         let result_user_role:UserRoleMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            name: "",
            atributes_1: -1,
            atributes_2: -1,
            atributes_3: -1,
            atributes_4: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_user_role = {
                  ...curr_row,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_user_role);
      });
   });
   return await promise_get_user_role_mysql_by_id;
};

export const insert_user_role = async(connection:Connection, data:UserRole) => {
   const promise_insert_user_role = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into user_role set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "name = '" + data.name + "', ";
      query += "atributes_1 = " + data.atributes_1 + ", ";
      query += "atributes_2 = " + data.atributes_2 + ", ";
      query += "atributes_3 = " + data.atributes_3 + ", ";
      query += "atributes_4 = " + data.atributes_4 + ", ";
      query += "id_user = " + data.id_user + ", ";
      query += "id_pos = " + data.id_pos + ", ";
      query += "id_branch = " + data.id_branch;

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_user_role;
};

export const insert_user_role_mysql = async(connection:Connection, data:UserRoleMySQL) => {
   const promise_insert_user_role = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into user_role set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "name = '" + data.name + "', ";
      query += "atributes_1 = " + data.atributes_1 + ", ";
      query += "atributes_2 = " + data.atributes_2 + ", ";
      query += "atributes_3 = " + data.atributes_3 + ", ";
      query += "atributes_4 = " + data.atributes_4 + ", ";
      query += "id_user = " + data.id_user + ", ";
      query += "id_pos = " + data.id_pos + ", ";
      query += "id_branch = " + data.id_branch;

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_user_role;
};

export const update_user_role_mysql = async(connection:Connection, data:UserRoleMySQL) => {
   const promise_update_user_role = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update user_role set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "name = '" + data.name + "', ";
      query += "atributes_1 = " + data.atributes_1 + ", ";
      query += "atributes_2 = " + data.atributes_2 + ", ";
      query += "atributes_3 = " + data.atributes_3 + ", ";
      query += "atributes_4 = " + data.atributes_4 + ", ";
      query += "id_user = " + data.id_user + ", ";
      query += "id_pos = " + data.id_pos + ", ";
      query += "id_branch = " + data.id_branch + " ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_update_user_role;
};

export const delete_user_role_mysql = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_user_role = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update user_role set ";
      query += "is_active = 0, ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "' ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_delete_user_role;
};
