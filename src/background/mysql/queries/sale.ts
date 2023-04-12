import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { get_cash_cutoff_by_id } from "./cash-cutoff";
import { get_user_by_id } from "@/background/mysql/queries/user";
import { get_pos_by_id } from "@/background/mysql/queries/pos";
import { get_branch_by_id } from "@/background/mysql/queries/branch";
import { Sale, SaleMySQL } from "@/types/sale";
import { MySQLDelete } from "@/types/general";
import { CashCutoff } from "@/types/cash-cutoff";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";

export const get_sales = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<Sale>>((resolve) => {
      const query = "select * from sale where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<SaleMySQL>) => {
         const data:Array<Sale> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const cash_cutoff:CashCutoff = await get_cash_cutoff_by_id(connection, rows[i].id_cash_cutoff);
               const user:User = await get_user_by_id(connection, rows[i].id_user);
               const pos:Pos = await get_pos_by_id(connection, rows[i].id_pos);
               const branch:Branch = await get_branch_by_id(connection, rows[i].id_branch);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  total: Number(rows[i].total),
                  is_supplier: Number(rows[i].is_supplier),
                  id_cash_cutoff: Number(rows[i].id_cash_cutoff),
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  cash_cutoff: cash_cutoff,
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

export const get_sale_by_id = async(connection:Connection, id:number) => {
   const promise_get_sale_by_id = new Promise<Sale>((resolve) => {
      const query = "select * from sale where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<SaleMySQL>) => {
         let result_sale:Sale = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            total: -1,
            is_supplier: -1,
            id_cash_cutoff: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            cash_cutoff: null,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const cash_cutoff:CashCutoff = await get_cash_cutoff_by_id(connection, curr_row.id_cash_cutoff);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_sale = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated),
                  cash_cutoff: cash_cutoff,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_sale);
      });
   });
   return await promise_get_sale_by_id;
};

export const get_sale_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_sale_mysql_by_id = new Promise<SaleMySQL>((resolve) => {
      const query = "select * from sale where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<SaleMySQL>) => {
         let result_sale:SaleMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            total: -1,
            is_supplier: -1,
            id_cash_cutoff: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            cash_cutoff: null,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const cash_cutoff:CashCutoff = await get_cash_cutoff_by_id(connection, curr_row.id_cash_cutoff);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_sale = {
                  ...curr_row,
                  cash_cutoff: cash_cutoff,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_sale);
      });
   });
   return await promise_get_sale_mysql_by_id;
};

export const insert_sale = async(connection:Connection, data:Sale) => {
   const promise_insert_sale = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into sale set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "total = " + data.total + ", ";
      query += "is_supplier = " + data.is_supplier + ", ";
      query += "id_cash_cutoff = " + data.id_cash_cutoff + ", ";
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
   return await promise_insert_sale;
};

export const update_sale = async(connection:Connection, data:SaleMySQL) => {
   const promise_update_sale = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update sale set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "total = " + data.total + ", ";
      query += "is_supplier = " + data.is_supplier + ", ";
      query += "id_cash_cutoff = " + data.id_cash_cutoff + ", ";
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
   return await promise_update_sale;
};

export const delete_sale = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_sale = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update sale set ";
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
   return await promise_delete_sale;
};
