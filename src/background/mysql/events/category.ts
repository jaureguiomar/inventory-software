import { ipcMain } from "electron";
import mysql from "mysql";
import {
   get_categories, get_category_by_id, get_category_mysql_by_id,
   insert_category, update_category, delete_category
} from "@/background/mysql/queries/category";
import { mysql_connection } from "@/background/mysql/connection";
import { get_branch_by_id } from "@/background/mysql/queries/branch";
import { Category } from "@/types/category";
import { Branch } from "@/types/branch";
import { MySQLOfflineField } from "@/types/general";

ipcMain.on("mysql-get-category", async function(e) {
   const connection = mysql.createConnection(mysql_connection);
   const category_data:Array<Category> = await get_categories(connection);
   for(let i = 0; i < category_data.length; i++) {
      const branch_data = await get_branch_by_id(connection, category_data[i].id_branch);
      category_data[i].branch = { ...branch_data };
   }
   connection.end();
   e.sender.send("mysql-get-category-reply", category_data);
});
ipcMain.on("mysql-create-category", async function(e, data) {
   const connection = mysql.createConnection(mysql_connection);
   const new_category_id = await insert_category(connection, data);
   const new_category_data = await get_category_by_id(connection, new_category_id);
   const branch_data = await get_branch_by_id(connection, new_category_data.id_branch);
   new_category_data.branch = { ...branch_data };
   connection.end();
   e.sender.send("mysql-create-category-reply", new_category_data);
});
ipcMain.on("mysql-update-category", async function(e, data) {
   const connection = mysql.createConnection(mysql_connection);
   let new_category_data:Category = {
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
   let branch_data:Branch = {
      id: -1,
      is_active: -1,
      created: "",
      updated: "",
      name: "",
      telephone: "",
      address: ""
   };

   const old_category_mysql_data = await get_category_mysql_by_id(connection, data.id);
   const sync_data:MySQLOfflineField = {
      is_sync: 0,
      sync_type: "update"
   };
   if(old_category_mysql_data.is_sync === 0 && old_category_mysql_data.sync_type === "add")
      sync_data.sync_type = "add";

   const is_ok = await update_category(connection, {
      ...data,
      ...sync_data
   });
   if(is_ok) {
      new_category_data = await get_category_by_id(connection, data.id);
      branch_data = await get_branch_by_id(connection, data.id_branch);
      new_category_data.branch = { ...branch_data };
   }
   connection.end();
   e.sender.send("mysql-update-category-reply", new_category_data);
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

   const is_ok = await delete_category(connection, {
      id: id,
      ...sync_data
   });
   connection.end();
   e.sender.send("mysql-delete-category-reply", is_ok);
});
