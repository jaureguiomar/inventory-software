import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { get_user_by_id } from "@/background/mysql/user";
import { get_pos_by_id } from "@/background/mysql/pos";
import { get_branch_by_id } from "@/background/mysql/branch";
import { Category, CategoryMySQL } from "@/types/category";
import { MySQLDelete } from "@/types/general";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";

export const get_categories = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<Category>>((resolve) => {
      const query = "select * from category where is_active = 1";
      connection.query(query, async(error:MysqlError, rows:Array<CategoryMySQL>) => {
         const data:Array<Category> = [];
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

export const get_category_by_id = async(connection:Connection, id:number) => {
   const promise_get_category_by_id = new Promise<Category>((resolve) => {
      const query = "select * from category where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<CategoryMySQL>) => {
         let result_category:Category = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            name: "",
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            user: null,
            pos: null,
            branch: {
               id: -1,
               is_active: -1,
               created: "",
               updated: "",
               name: "",
               telephone: "",
               address: ""
            }
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_category = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated),
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_category);
      });
   });
   return await promise_get_category_by_id;
};

export const get_category_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_category_mysql_by_id = new Promise<CategoryMySQL>((resolve) => {
      const query = "select * from category where is_active = 1 and id = " + id;
      connection.query(query, async(error:MysqlError, rows:Array<CategoryMySQL>) => {
         let result_category:CategoryMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            name: "",
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            user: null,
            pos: null,
            branch: {
               id: -1,
               is_active: -1,
               created: "",
               updated: "",
               name: "",
               telephone: "",
               address: ""
            }
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               const user:User = await get_user_by_id(connection, curr_row.id_user);
               const pos:Pos = await get_pos_by_id(connection, curr_row.id_pos);
               const branch:Branch = await get_branch_by_id(connection, curr_row.id_branch);
               result_category = {
                  ...curr_row,
                  user: user,
                  pos: pos,
                  branch: branch
               };
            }
         }
         resolve(result_category);
      });
   });
   return await promise_get_category_mysql_by_id;
};

export const insert_category = async(connection:Connection, data:Category) => {
   const promise_insert_category = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into category set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "name = '" + data.name + "', ";
      query += "id_branch = " + data.id_branch;

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_category;
};

export const update_category = async(connection:Connection, data:CategoryMySQL) => {
   const promise_update_category = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update category set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "name = '" + data.name + "', ";
      query += "id_branch = " + data.id_branch + " ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_update_category;
};

export const delete_category = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_category = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update category set ";
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
   return await promise_delete_category;
};
