import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { get_user_by_id } from "@/background/mysql/queries/user";
import { get_pos_by_id } from "@/background/mysql/queries/pos";
import { get_branch_by_id } from "@/background/mysql/queries/branch";
import { CashCutoff, CashCutoffMySQL } from "@/types/cash-cutoff";
import { MySQLDelete } from "@/types/general";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
import { CashCutoffType } from "@/types/cash-cutoff-type";
import { get_cash_cutoff_type_by_id } from "./cash-cutoff-type";

export const get_cash_cutoffs = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<CashCutoff>>((resolve) => {
      const query = "select * from cash_cutoff where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<CashCutoffMySQL>) => {
         const data:Array<CashCutoff> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const type:CashCutoffType = await get_cash_cutoff_type_by_id(connection, rows[i].id_type);
               const user_open:User = await get_user_by_id(connection, rows[i].id_user_open);
               const user_close:User = await get_user_by_id(connection, rows[i].id_user_close);
               const pos:Pos = await get_pos_by_id(connection, rows[i].id_pos);
               const branch:Branch = await get_branch_by_id(connection, rows[i].id_branch);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  amount_open: rows[i].amount_open,
                  amount_sale: rows[i].amount_sale,
                  amount_supplier: rows[i].amount_supplier,
                  amount_close: rows[i].amount_close,
                  date_close: rows[i].date_close,
                  id_type: Number(rows[i].id_type),
                  id_user_open: Number(rows[i].id_user_open),
                  id_user_close: Number(rows[i].id_user_close),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  type: type,
                  user_open: user_open,
                  user_close: user_close,
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

export const get_cash_cutoffs_mysql_unsync = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<CashCutoffMySQL>>((resolve) => {
      const query = "select * from cash_cutoff where is_sync = 0";
      connection.query(query, async(error:MysqlError, rows:Array<CashCutoffMySQL>) => {
         const data:Array<CashCutoffMySQL> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const type:CashCutoffType = await get_cash_cutoff_type_by_id(connection, rows[i].id_type);
               const user_open:User = await get_user_by_id(connection, rows[i].id_user_open);
               const user_close:User = await get_user_by_id(connection, rows[i].id_user_close);
               const pos:Pos = await get_pos_by_id(connection, rows[i].id_pos);
               const branch:Branch = await get_branch_by_id(connection, rows[i].id_branch);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  is_sync: Number(rows[i].is_sync),
                  sync_type: rows[i].sync_type,
                  created: rows[i].created,
                  updated: rows[i].updated,
                  amount_open: rows[i].amount_open,
                  amount_sale: rows[i].amount_sale,
                  amount_supplier: rows[i].amount_supplier,
                  amount_close: rows[i].amount_close,
                  date_close: rows[i].date_close,
                  id_type: Number(rows[i].id_type),
                  id_user_open: Number(rows[i].id_user_open),
                  id_user_close: Number(rows[i].id_user_close),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  type: type,
                  user_open: user_open,
                  user_close: user_close,
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

export const get_cash_cutoff_by_id = async(connection:Connection, id:number) => {
   const promise_get_cash_cutoff_by_id = new Promise<CashCutoff>((resolve) => {
      const query = "select * from cash_cutoff where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<CashCutoffMySQL>) => {
         let result_cash_cutoff:CashCutoff = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            amount_open: -1,
            amount_sale: -1,
            amount_supplier: -1,
            amount_close: -1,
            date_close: "",
            id_type: -1,
            id_user_open: -1,
            id_user_close: -1,
            id_pos: -1,
            id_branch: -1,
            type: null,
            user_open: null,
            user_close: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const type:CashCutoffType = await get_cash_cutoff_type_by_id(connection, curr_row.id_type);
               const user_open:User = await get_user_by_id(connection, curr_row.id_user_open);
               const user_close:User = await get_user_by_id(connection, curr_row.id_user_close);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_cash_cutoff = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated),
                  type: type,
                  user_open: user_open,
                  user_close: user_close,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_cash_cutoff);
      });
   });
   return await promise_get_cash_cutoff_by_id;
};

export const get_cash_cutoff_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_cash_cutoff_mysql_by_id = new Promise<CashCutoffMySQL>((resolve) => {
      const query = "select * from cash_cutoff where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<CashCutoffMySQL>) => {
         let result_cash_cutoff:CashCutoffMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            amount_open: -1,
            amount_sale: -1,
            amount_supplier: -1,
            amount_close: -1,
            date_close: "",
            id_type: -1,
            id_user_open: -1,
            id_user_close: -1,
            id_pos: -1,
            id_branch: -1,
            type: null,
            user_open: null,
            user_close: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const type:CashCutoffType = await get_cash_cutoff_type_by_id(connection, curr_row.id_type);
               const user_open:User = await get_user_by_id(connection, curr_row.id_user_open);
               const user_close:User = await get_user_by_id(connection, curr_row.id_user_close);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_cash_cutoff = {
                  ...curr_row,
                  type: type,
                  user_open: user_open,
                  user_close: user_close,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_cash_cutoff);
      });
   });
   return await promise_get_cash_cutoff_mysql_by_id;
};

export const insert_cash_cutoff = async(connection:Connection, data:CashCutoff) => {
   const promise_insert_cash_cutoff = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into cash_cutoff set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "amount_open = " + data.amount_open + ", ";
      query += "amount_sale = " + data.amount_sale + ", ";
      query += "amount_supplier = " + data.amount_supplier + ", ";
      query += "amount_close = " + data.amount_close + ", ";
      query += "date_close = '" + data.date_close + "', ";
      query += "id_type = " + data.id_type + ", ";
      query += "id_user_open = " + data.id_user_open + ", ";
      query += "id_user_close = " + data.id_user_close + ", ";
      query += "id_pos = " + data.id_pos + ", ";
      query += "id_branch = " + data.id_branch;

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_cash_cutoff;
};

export const insert_cash_cutoff_mysql = async(connection:Connection, data:CashCutoffMySQL) => {
   const promise_insert_cash_cutoff = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into cash_cutoff set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = " + ((data.sync_type) ? `'${ data.sync_type }'` : "null") + ", ";
      query += "amount_open = " + data.amount_open + ", ";
      query += "amount_sale = " + data.amount_sale + ", ";
      query += "amount_supplier = " + data.amount_supplier + ", ";
      query += "amount_close = " + data.amount_close + ", ";
      query += "date_close = '" + data.date_close + "', ";
      query += "id_type = " + data.id_type + ", ";
      query += "id_user_open = " + data.id_user_open + ", ";
      query += "id_user_close = " + data.id_user_close + ", ";
      query += "id_pos = " + data.id_pos + ", ";
      query += "id_branch = " + data.id_branch;

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_cash_cutoff;
};

export const update_cash_cutoff_mysql = async(connection:Connection, data:CashCutoffMySQL) => {
   const promise_update_cash_cutoff = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update cash_cutoff set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = " + ((data.sync_type) ? `'${ data.sync_type }'` : "null") + ", ";
      query += "amount_open = " + data.amount_open + ", ";
      query += "amount_sale = " + data.amount_sale + ", ";
      query += "amount_supplier = " + data.amount_supplier + ", ";
      query += "amount_close = " + data.amount_close + ", ";
      query += "date_close = '" + data.date_close + "', ";
      query += "id_type = " + data.id_type + ", ";
      query += "id_user_open = " + data.id_user_open + ", ";
      query += "id_user_close = " + data.id_user_close + ", ";
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
   return await promise_update_cash_cutoff;
};

export const delete_cash_cutoff_mysql = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_cash_cutoff = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update cash_cutoff set ";
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
   return await promise_delete_cash_cutoff;
};
