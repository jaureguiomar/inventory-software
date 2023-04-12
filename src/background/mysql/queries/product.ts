import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { get_category_by_id } from "@/background/mysql/queries/category";
import { get_user_by_id } from "@/background/mysql/queries/user";
import { get_pos_by_id } from "@/background/mysql/queries/pos";
import { get_branch_by_id } from "@/background/mysql/queries/branch";
import { Product, ProductMySQL } from "@/types/product";
import { MySQLDelete } from "@/types/general";
import { Category } from "@/types/category";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";

export const get_products = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<Product>>((resolve) => {
      const query = "select * from product where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<ProductMySQL>) => {
         const data:Array<Product> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const category:Category = await get_category_by_id(connection, rows[i].id_category);
               const user:User = await get_user_by_id(connection, rows[i].id_user);
               const pos:Pos = await get_pos_by_id(connection, rows[i].id_pos);
               const branch:Branch = await get_branch_by_id(connection, rows[i].id_branch);
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  is_favorite: Number(rows[i].is_favorite),
                  code: rows[i].code,
                  name: rows[i].name,
                  description: null,
                  buy_price: Number(rows[i].buy_price),
                  sale_price: Number(rows[i].sale_price),
                  quantity: Number(rows[i].quantity),
                  id_category: Number(rows[i].id_category),
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  category: category,
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

export const get_products_unsync = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<ProductMySQL>>((resolve) => {
      const query = "select * from product where is_sync = 0";
      connection.query(query, async(error:MysqlError, rows:Array<ProductMySQL>) => {
         const data:Array<ProductMySQL> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               const category:Category = await get_category_by_id(connection, rows[i].id_category);
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
                  is_favorite: Number(rows[i].is_favorite),
                  code: rows[i].code,
                  name: rows[i].name,
                  description: null,
                  buy_price: Number(rows[i].buy_price),
                  sale_price: Number(rows[i].sale_price),
                  quantity: Number(rows[i].quantity),
                  id_category: Number(rows[i].id_category),
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  category: category,
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

export const get_product_by_id = async(connection:Connection, id:number) => {
   const promise_get_product_by_id = new Promise<Product>((resolve) => {
      const query = "select * from product where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<ProductMySQL>) => {
         let result_product:Product = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            is_favorite: -1,
            code: "",
            name: "",
            description: "",
            buy_price: -1,
            sale_price: -1,
            quantity: -1,
            id_category: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            category: null,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const category:Category = await get_category_by_id(connection, curr_row.id_category);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_product = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated),
                  category: category,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_product);
      });
   });
   return await promise_get_product_by_id;
};

export const get_product_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_product_mysql_by_id = new Promise<ProductMySQL>((resolve) => {
      const query = "select * from product where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<ProductMySQL>) => {
         let result_product:ProductMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            is_favorite: -1,
            code: "",
            name: "",
            description: "",
            buy_price: -1,
            sale_price: -1,
            quantity: -1,
            id_category: -1,
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            category: null,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const category:Category = await get_category_by_id(connection, curr_row.id_category);
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_product = {
                  ...curr_row,
                  category: category,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_product);
      });
   });
   return await promise_get_product_mysql_by_id;
};

export const insert_product = async(connection:Connection, data:Product) => {
   const promise_insert_product = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into product set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "is_favorite = '" + data.is_favorite + "', ";
      query += "code = '" + data.code + "', ";
      query += "name = '" + data.name + "', ";
      query += "description = '" + data.description + "', ";
      query += "buy_price = " + data.buy_price + ", ";
      query += "sale_price = " + data.sale_price + ", ";
      query += "quantity = " + data.quantity + ", ";
      query += "id_category = " + data.id_category + ", ";
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
   return await promise_insert_product;
};

export const update_product = async(connection:Connection, data:ProductMySQL) => {
   const promise_update_product = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update product set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "is_favorite = '" + data.is_favorite + "', ";
      query += "code = '" + data.code + "', ";
      query += "name = '" + data.name + "', ";
      query += "description = '" + data.description + "', ";
      query += "buy_price = " + data.buy_price + ", ";
      query += "sale_price = " + data.sale_price + ", ";
      query += "quantity = " + data.quantity + ", ";
      query += "id_category = " + data.id_category + ", ";
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
   return await promise_update_product;
};

export const delete_product = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_product = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update product set ";
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
   return await promise_delete_product;
};
