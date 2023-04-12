import { ipcMain } from "electron";
import mysql from "mysql";
import {
   get_categories, get_category_by_id, get_category_mysql_by_id,
   insert_category, update_category_mysql, delete_category_mysql
} from "@/background/mysql/queries/category";
import { mysql_connection } from "@/background/mysql/connection";
import { get_branch_by_id } from "@/background/mysql/queries/branch";
import { Category } from "@/types/category";
// import { Branch } from "@/types/branch";
import { MySQLOfflineField } from "@/types/general";

ipcMain.on("mysql-get-category", async function(e) {
   console.log("mysql-get-category");
   const connection = mysql.createConnection(mysql_connection);
   const category:Array<Category> = await get_categories(connection);
   for(let i = 0; i < category.length; i++) {
      const branch = await get_branch_by_id(connection, category[i].id_branch);
      category[i].branch = { ...branch };
   }
   console.log("category-length", category.length);
   connection.end();
   e.sender.send("mysql-get-category-reply", category);
});
ipcMain.on("mysql-create-category", async function(e, data) {
   const connection = mysql.createConnection(mysql_connection);
   const new_category_id = await insert_category(connection, data);
   const new_category = await get_category_by_id(connection, new_category_id);
   // const branch = await get_branch_by_id(connection, new_category.id_branch);
   // new_category.branch = { ...branch };
   console.log("new_category", new_category);
   connection.end();
   e.sender.send("mysql-create-category-reply", new_category);
});
ipcMain.on("mysql-update-category", async function(e, data) {
   const connection = mysql.createConnection(mysql_connection);
   let category:Category = {
      id: -1,
      is_active: -1,
      created: "",
      updated: "",
      name: "",
      id_user: 0,
      id_pos: 0,
      id_branch: -1,
      user: null,
      pos: null,
      branch: null
   };
   // let branch:Branch = {
   //    id: -1,
   //    is_active: -1,
   //    created: "",
   //    updated: "",
   //    name: "",
   //    telephone: "",
   //    address: ""
   // };

   const old_category_mysql_data = await get_category_mysql_by_id(connection, data.id);
   const sync_data:MySQLOfflineField = {
      is_sync: 0,
      sync_type: "update"
   };
   if(old_category_mysql_data.is_sync === 0 && old_category_mysql_data.sync_type === "add")
      sync_data.sync_type = "add";

   const is_ok = await update_category_mysql(connection, {
      ...data,
      ...sync_data
   });
   if(is_ok) {
      category = await get_category_by_id(connection, data.id);
      // branch = await get_branch_by_id(connection, data.id_branch);
      // category.branch = { ...branch };
      console.log("category", category);
   }
   connection.end();
   e.sender.send("mysql-update-category-reply", category);
});
ipcMain.on("mysql-delete-category", async function(e, id) {
   const connection = mysql.createConnection(mysql_connection);
   const old_category_mysql_data = await get_category_mysql_by_id(connection, id);
   const sync_data:MySQLOfflineField = {
      is_sync: 0,
      sync_type: "delete"
   };
   if(old_category_mysql_data.is_sync === 0 && old_category_mysql_data.sync_type === "add")
      sync_data.is_sync = 1;

   const is_ok = await delete_category_mysql(connection, {
      id: id,
      ...sync_data
   });
   connection.end();
   e.sender.send("mysql-delete-category-reply", is_ok);
});
