import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { UserRolePermission, UserRolePermissionMySQL } from "@/types/user-role-permission";
import { MySQLDelete } from "@/types/general";

export const get_user_role_permissions = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<UserRolePermission>>((resolve) => {
      const query = "select * from user_role_permission where is_active = 1";
      connection.query(query, function(error:MysqlError, rows:Array<UserRolePermissionMySQL>) {
         const data:Array<UserRolePermission> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  name: rows[i].name,
                  shortname: rows[i].shortname,
                  description: rows[i].description,
                  attr_value: rows[i].attr_value,
                  attr_level: Number(rows[i].attr_level)
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

export const get_user_role_permission_by_id = async(connection:Connection, id:number) => {
   const promise_get_user_role_permission_by_id = new Promise<UserRolePermission>((resolve) => {
      const query = "select * from user_role_permission where is_active = 1 and id = " + id;
      connection.query(query, function(error:MysqlError, rows:Array<UserRolePermissionMySQL>) {
         let result_user_role_permission:UserRolePermission = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            shortname: "",
            description: "",
            attr_value: "",
            attr_level: -1
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               result_user_role_permission = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated)
               };
            }
         }
         resolve(result_user_role_permission);
      });
   });
   return await promise_get_user_role_permission_by_id;
};

export const get_user_role_permission_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_user_role_permission_mysql_by_id = new Promise<UserRolePermissionMySQL>((resolve) => {
      const query = "select * from user_role_permission where is_active = 1 and id = " + id;
      connection.query(query, function(error:MysqlError, rows:Array<UserRolePermissionMySQL>) {
         let result_user_role_permission:UserRolePermissionMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            name: "",
            shortname: "",
            description: "",
            attr_value: "",
            attr_level: -1
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               result_user_role_permission = { ...curr_row };
            }
         }
         resolve(result_user_role_permission);
      });
   });
   return await promise_get_user_role_permission_mysql_by_id;
};

export const insert_user_role_permission = async(connection:Connection, data:UserRolePermission) => {
   const promise_insert_user_role_permission = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into user_role_permission set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "name = '" + data.name + "', ";
      query += "shortname = '" + data.shortname + "', ";
      query += "description = '" + data.description + "', ";
      query += "attr_value = '" + data.attr_value + "', ";
      query += "attr_level = " + data.attr_level;

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_user_role_permission;
};

export const update_user_role_permission = async(connection:Connection, data:UserRolePermissionMySQL) => {
   const promise_update_user_role_permission = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update user_role_permission set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "name = '" + data.name + "', ";
      query += "shortname = '" + data.shortname + "', ";
      query += "description = '" + data.description + "', ";
      query += "attr_value = '" + data.attr_value + "', ";
      query += "attr_level = " + data.attr_level + " ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_update_user_role_permission;
};

export const delete_user_role_permission = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_user_role_permission = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update user_role_permission set ";
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
   return await promise_delete_user_role_permission;
};
