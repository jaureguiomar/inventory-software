import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { CashCutoffType, CashCutoffTypeMySQL } from "@/types/cash-cutoff-type";
import { MySQLDelete } from "@/types/general";

export const get_cash_cutoff_types = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<CashCutoffType>>((resolve) => {
      const query = "select * from cash_cutoff_type where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<CashCutoffTypeMySQL>) => {
         const data:Array<CashCutoffType> = [];
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

export const get_cash_cutoff_types_mysql_unsync = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<CashCutoffTypeMySQL>>((resolve) => {
      const query = "select * from cash_cutoff_type where is_sync = 0";
      connection.query(query, async(error:MysqlError, rows:Array<CashCutoffTypeMySQL>) => {
         const data:Array<CashCutoffTypeMySQL> = [];
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

export const get_cash_cutoff_type_by_id = async(connection:Connection, id:number) => {
   const promise_get_cash_cutoff_type_by_id = new Promise<CashCutoffType>((resolve) => {
      const query = "select * from cash_cutoff_type where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<CashCutoffTypeMySQL>) => {
         let result_cash_cutoff_type:CashCutoffType = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: ""
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               result_cash_cutoff_type = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated)
               };
            }
         }
         resolve(result_cash_cutoff_type);
      });
   });
   return await promise_get_cash_cutoff_type_by_id;
};

export const get_cash_cutoff_type_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_cash_cutoff_type_mysql_by_id = new Promise<CashCutoffTypeMySQL>((resolve) => {
      const query = "select * from cash_cutoff_type where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<CashCutoffTypeMySQL>) => {
         let result_cash_cutoff_type:CashCutoffTypeMySQL = {
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
               result_cash_cutoff_type = { ...curr_row };
            }
         }
         resolve(result_cash_cutoff_type);
      });
   });
   return await promise_get_cash_cutoff_type_mysql_by_id;
};

export const insert_cash_cutoff_type = async(connection:Connection, data:CashCutoffType) => {
   const promise_insert_cash_cutoff_type = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into cash_cutoff_type set ";
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
   return await promise_insert_cash_cutoff_type;
};

export const insert_cash_cutoff_type_mysql = async(connection:Connection, data:CashCutoffTypeMySQL) => {
   const promise_insert_cash_cutoff_type = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into cash_cutoff_type set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = " + ((data.sync_type) ? `'${ data.sync_type }'` : "null") + ", ";
      query += "name = '" + data.name + "'";

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_cash_cutoff_type;
};

export const update_cash_cutoff_type_mysql = async(connection:Connection, data:CashCutoffTypeMySQL) => {
   const promise_update_cash_cutoff_type = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update cash_cutoff_type set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = " + ((data.sync_type) ? `'${ data.sync_type }'` : "null") + ", ";
      query += "name = '" + data.name + "'";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_update_cash_cutoff_type;
};

export const delete_cash_cutoff_type_mysql = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_cash_cutoff_type = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update cash_cutoff_type set ";
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
   return await promise_delete_cash_cutoff_type;
};
