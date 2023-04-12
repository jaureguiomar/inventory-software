import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { ActivityLogOperation, ActivityLogOperationMySQL } from "@/types/activity-log-operation";
import { MySQLDelete } from "@/types/general";

export const get_activity_log_operations = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<ActivityLogOperation>>((resolve) => {
      const query = "select * from activity_log_operation where is_active = 1";
      connection.query(query, function(error:MysqlError, rows:Array<ActivityLogOperationMySQL>) {
         const data:Array<ActivityLogOperation> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  name: rows[i].name
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

export const get_activity_log_operations_mysql_unsync = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<ActivityLogOperationMySQL>>((resolve) => {
      const query = "select * from activity_log_operation where is_sync = 0";
      connection.query(query, function(error:MysqlError, rows:Array<ActivityLogOperationMySQL>) {
         const data:Array<ActivityLogOperationMySQL> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  is_sync: Number(rows[i].is_sync),
                  sync_type: rows[i].sync_type,
                  created: rows[i].created,
                  updated: rows[i].updated,
                  name: rows[i].name
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

export const get_activity_log_operation_by_id = async(connection:Connection, id:number) => {
   const promise_get_activity_log_operation_by_id = new Promise<ActivityLogOperation>((resolve) => {
      const query = "select * from activity_log_operation where is_active = 1 and id = " + id;
      connection.query(query, function(error:MysqlError, rows:Array<ActivityLogOperationMySQL>) {
         let result_activity_log_operation:ActivityLogOperation = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: ""
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               result_activity_log_operation = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated)
               };
            }
         }
         resolve(result_activity_log_operation);
      });
   });
   return await promise_get_activity_log_operation_by_id;
};

export const get_activity_log_operation_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_activity_log_operation_mysql_by_id = new Promise<ActivityLogOperationMySQL>((resolve) => {
      const query = "select * from activity_log_operation where is_active = 1 and id = " + id;
      connection.query(query, function(error:MysqlError, rows:Array<ActivityLogOperationMySQL>) {
         let result_activity_log_operation:ActivityLogOperationMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            name: ""
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               result_activity_log_operation = { ...curr_row };
            }
         }
         resolve(result_activity_log_operation);
      });
   });
   return await promise_get_activity_log_operation_mysql_by_id;
};

export const insert_activity_log_operation = async(connection:Connection, data:ActivityLogOperation) => {
   const promise_insert_activity_log_operation = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into activity_log_operation set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "name = '" + data.name + "'";

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_activity_log_operation;
};

export const update_activity_log_operation = async(connection:Connection, data:ActivityLogOperationMySQL) => {
   const promise_update_activity_log_operation = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update activity_log_operation set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "name = '" + data.name + "' ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_update_activity_log_operation;
};

export const delete_activity_log_operation = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_activity_log_operation = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update activity_log_operation set ";
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
   return await promise_delete_activity_log_operation;
};
