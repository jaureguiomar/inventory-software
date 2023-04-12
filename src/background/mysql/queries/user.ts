import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { get_user_role_by_id } from "@/background/mysql/queries/user-role";
import { get_pos_by_id } from "@/background/mysql/queries/pos";
import { get_branch_by_id } from "@/background/mysql/queries/branch";
import { User, UserMySQL } from "@/types/user";
import { MySQLDelete } from "@/types/general";
import { UserRole } from "@/types/user-role";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";

export const get_users = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<User>>((resolve) => {
      const query = "select * from users where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<UserMySQL>) => {
         const data:Array<User> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const user_role:UserRole = await get_user_role_by_id(connection, rows[i].id_role);
               const user:User = await get_user_by_id(connection, rows[i].id_user);
               const pos:Pos = await get_pos_by_id(connection, rows[i].id_pos);
               const branch:Branch = await get_branch_by_id(connection, rows[i].id_branch);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  username: rows[i].username,
                  email: rows[i].email,
                  password: rows[i].password,
                  first_name: rows[i].first_name,
                  last_name: rows[i].last_name,
                  id_role: Number(rows[i].id_role),
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  role: user_role,
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

export const get_users_unsync = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<UserMySQL>>((resolve) => {
      const query = "select * from users where is_sync = 0";
      connection.query(query, async(error:MysqlError, rows:Array<UserMySQL>) => {
         const data:Array<UserMySQL> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const user_role:UserRole = await get_user_role_by_id(connection, rows[i].id_role);
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
                  username: rows[i].username,
                  email: rows[i].email,
                  password: rows[i].password,
                  first_name: rows[i].first_name,
                  last_name: rows[i].last_name,
                  id_role: Number(rows[i].id_role),
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  role: user_role,
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

export const get_user_by_id = async(connection:Connection, id:number) => {
   const promise_get_user_by_id = new Promise<User>((resolve) => {
      const query = "select * from users where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<UserMySQL>) => {
         let result_user:User = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            username: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            id_role: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            role: null,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];const user_role:UserRole = await get_user_role_by_id(connection, curr_row.id_role);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_user = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated),
                  role: user_role,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_user);
      });
   });
   return await promise_get_user_by_id;
};

export const get_user_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_user_mysql_by_id = new Promise<UserMySQL>((resolve) => {
      const query = "select * from users where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<UserMySQL>) => {
         let result_user:UserMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            username: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            id_role: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            role: null,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const user_role:UserRole = await get_user_role_by_id(connection, curr_row.id_role);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_user = {
                  ...curr_row,
                  role: user_role,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_user);
      });
   });
   return await promise_get_user_mysql_by_id;
};

export const insert_user = async(connection:Connection, data:User) => {
   const promise_insert_user = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into users set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "username = '" + data.username + "', ";
      query += "email = '" + data.email + "', ";
      query += "password = '" + data.password + "', ";
      query += "first_name = '" + data.first_name + "', ";
      query += "last_name = '" + data.last_name + "', ";
      query += "id_role = " + data.id_role + ", ";
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
   return await promise_insert_user;
};

export const update_user = async(connection:Connection, data:UserMySQL) => {
   const promise_update_user = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update users set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "username = '" + data.username + "', ";
      query += "email = '" + data.email + "', ";
      query += "password = '" + data.password + "', ";
      query += "first_name = '" + data.first_name + "', ";
      query += "last_name = '" + data.last_name + "', ";
      query += "id_role = " + data.id_role + ", ";
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
   return await promise_update_user;
};

export const delete_user = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_user = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update users set ";
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
   return await promise_delete_user;
};
