import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { get_activity_log_operation_by_id } from "@/background/mysql/queries/activity-log-operation";
import { get_activity_log_access_by_id } from "@/background/mysql/queries/activity-log-access";
import { get_user_by_id } from "@/background/mysql/queries/user";
import { ActivityLog, ActivityLogMySQL } from "@/types/activity-log";
import { MySQLDelete } from "@/types/general";
import { ActivityLogOperation } from "@/types/activity-log-operation";
import { ActivityLogAccess } from "@/types/activity-log-access";
import { User } from "@/types/user";

export const get_activity_logs = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<ActivityLog>>((resolve) => {
      const query = "select * from activity_log where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<ActivityLogMySQL>) => {
         const data:Array<ActivityLog> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const activity_log_operation:ActivityLogOperation = await get_activity_log_operation_by_id(connection, rows[i].id_operation);
               const activity_log_access:ActivityLogAccess = await get_activity_log_access_by_id(connection, rows[i].id_access);
               const user:User = await get_user_by_id(connection, rows[i].id_user);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  name: rows[i].name,
                  extra_data: rows[i].extra_data,
                  id_operation: Number(rows[i].id_operation),
                  id_access: Number(rows[i].id_access),
                  id_user: Number(rows[i].id_user),
                  operation: activity_log_operation,
                  access: activity_log_access,
                  user: user
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

export const get_activity_logs_unsync = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<ActivityLogMySQL>>((resolve) => {
      const query = "select * from activity_log where is_sync = 0";
      connection.query(query, async(error:MysqlError, rows:Array<ActivityLogMySQL>) => {
         const data:Array<ActivityLogMySQL> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const activity_log_operation:ActivityLogOperation = await get_activity_log_operation_by_id(connection, rows[i].id_operation);
               const activity_log_access:ActivityLogAccess = await get_activity_log_access_by_id(connection, rows[i].id_access);
               const user:User = await get_user_by_id(connection, rows[i].id_user);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  is_sync: Number(rows[i].is_sync),
                  sync_type: rows[i].sync_type,
                  created: rows[i].created,
                  updated: rows[i].updated,
                  name: rows[i].name,
                  extra_data: rows[i].extra_data,
                  id_operation: Number(rows[i].id_operation),
                  id_access: Number(rows[i].id_access),
                  id_user: Number(rows[i].id_user),
                  operation: activity_log_operation,
                  access: activity_log_access,
                  user: user
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

export const get_activity_log_by_id = async(connection:Connection, id:number) => {
   const promise_get_activity_log_by_id = new Promise<ActivityLog>((resolve) => {
      const query = "select * from activity_log where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<ActivityLogMySQL>) => {
         let result_activity_log:ActivityLog = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            extra_data: "",
            id_operation: -1,
            id_access: -1,
            id_user: -1,
            operation: null,
            access: null,
            user: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const activity_log_operation:ActivityLogOperation = await get_activity_log_operation_by_id(connection, curr_row.id_operation);
               const activity_log_access:ActivityLogAccess = await get_activity_log_access_by_id(connection, curr_row.id_access);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               result_activity_log = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated),
                  operation: activity_log_operation,
                  access: activity_log_access,
                  user: user
               };
            }
         }
         resolve(result_activity_log);
      });
   });
   return await promise_get_activity_log_by_id;
};

export const get_activity_log_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_activity_log_mysql_by_id = new Promise<ActivityLogMySQL>((resolve) => {
      const query = "select * from activity_log where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<ActivityLogMySQL>) => {
         let result_activity_log:ActivityLogMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            name: "",
            extra_data: "",
            id_operation: -1,
            id_access: -1,
            id_user: -1,
            operation: null,
            access: null,
            user: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const activity_log_operation:ActivityLogOperation = await get_activity_log_operation_by_id(connection, curr_row.id_operation);
               const activity_log_access:ActivityLogAccess = await get_activity_log_access_by_id(connection, curr_row.id_access);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               result_activity_log = {
                  ...curr_row,
                  operation: activity_log_operation,
                  access: activity_log_access,
                  user: user
               };
            }
         }
         resolve(result_activity_log);
      });
   });
   return await promise_get_activity_log_mysql_by_id;
};

export const insert_activity_log = async(connection:Connection, data:ActivityLog) => {
   const promise_insert_activity_log = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into activity_log set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "name = '" + data.name + "', ";
      query += "extra_data = '" + data.extra_data + "', ";
      query += "id_operation = " + data.id_operation + ", ";
      query += "id_access = " + data.id_access + ", ";
      query += "id_user = " + data.id_user;

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_activity_log;
};

export const update_activity_log = async(connection:Connection, data:ActivityLogMySQL) => {
   const promise_update_activity_log = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update activity_log set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "name = '" + data.name + "', ";
      query += "extra_data = '" + data.extra_data + "', ";
      query += "id_operation = " + data.id_operation + ", ";
      query += "id_access = " + data.id_access + ", ";
      query += "id_user = " + data.id_user + " ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_update_activity_log;
};

export const delete_activity_log = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_activity_log = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update activity_log set ";
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
   return await promise_delete_activity_log;
};
