import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { get_sale_by_id } from "@/background/mysql/queries/sale";
import { get_product_by_id } from "@/background/mysql/queries/product";
import { get_user_by_id } from "@/background/mysql/queries/user";
import { get_pos_by_id } from "@/background/mysql/queries/pos";
import { get_branch_by_id } from "@/background/mysql/queries/branch";
import { SaleProduct, SaleProductMySQL } from "@/types/sale-product";
import { MySQLDelete } from "@/types/general";
import { Sale } from "@/types/sale";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";

export const get_sale_products = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<SaleProductMySQL>>((resolve) => {
      const query = "select * from sale_product where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<SaleProductMySQL>) => {
         const data:Array<SaleProductMySQL> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const sale:Sale = await get_sale_by_id(connection, rows[i].id_sale);
               const product:Product = await get_product_by_id(connection, rows[i].id_product);
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
                  quantity: Number(rows[i].quantity),
                  id_sale: Number(rows[i].id_sale),
                  id_product: Number(rows[i].id_product),
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  sale: sale,
                  product: product,
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

export const get_sale_products_mysql_unsync = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<SaleProductMySQL>>((resolve) => {
      const query = "select * from sale_product where is_sync = 0";
      connection.query(query, async(error:MysqlError, rows:Array<SaleProductMySQL>) => {
         const data:Array<SaleProductMySQL> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const sale:Sale = await get_sale_by_id(connection, rows[i].id_sale);
               const product:Product = await get_product_by_id(connection, rows[i].id_product);
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
                  quantity: Number(rows[i].quantity),
                  id_sale: Number(rows[i].id_sale),
                  id_product: Number(rows[i].id_product),
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  sale: sale,
                  product: product,
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

export const get_sale_product_by_id = async(connection:Connection, id:number) => {
   const promise_get_sale_product_by_id = new Promise<SaleProduct>((resolve) => {
      const query = "select * from sale_product where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<SaleProductMySQL>) => {
         let result_sale_product:SaleProduct = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            quantity: -1,
            id_sale: -1,
            id_product: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            sale: null,
            product: null,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const sale:Sale = await get_sale_by_id(connection, curr_row.id_sale);
               const product:Product = await get_product_by_id(connection, curr_row.id_product);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_sale_product = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated),
                  sale: sale,
                  product: product,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_sale_product);
      });
   });
   return await promise_get_sale_product_by_id;
};

export const get_sale_product_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_sale_product_mysql_by_id = new Promise<SaleProductMySQL>((resolve) => {
      const query = "select * from sale_product where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<SaleProductMySQL>) => {
         let result_sale_product:SaleProductMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            quantity: -1,
            id_sale: -1,
            id_product: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            sale: null,
            product: null,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const sale:Sale = await get_sale_by_id(connection, curr_row.id_sale);
               const product:Product = await get_product_by_id(connection, curr_row.id_product);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_sale_product = {
                  ...curr_row,
                  sale: sale,
                  product: product,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_sale_product);
      });
   });
   return await promise_get_sale_product_mysql_by_id;
};

export const insert_sale_product = async(connection:Connection, data:SaleProduct) => {
   const promise_insert_sale_product = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into sale_product set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "quantity = " + data.quantity + ", ";
      query += "id_sale = " + data.id_sale + ", ";
      query += "id_product = " + data.id_product + ", ";
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
   return await promise_insert_sale_product;
};

export const update_sale_product = async(connection:Connection, data:SaleProductMySQL) => {
   const promise_update_sale_product = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update sale_product set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "quantity = " + data.quantity + ", ";
      query += "id_sale = " + data.id_sale + ", ";
      query += "id_product = " + data.id_product + ", ";
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
   return await promise_update_sale_product;
};

export const delete_sale_product = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_sale_product = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update sale_product set ";
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
   return await promise_delete_sale_product;
};
