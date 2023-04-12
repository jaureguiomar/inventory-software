import { ipcMain } from "electron";
import mysql from "mysql";
import { mysql_connection } from "@/background/mysql/connection";
import { parseStringField } from "@/background/mysql/functions";
import { delete_table, update_sync_unsync_data } from "@/background/mysql/queries/global";
import { get_user_roles_unsync } from "@/background/mysql/queries/user-role";
import { insert_branch } from "@/background/mysql/queries/branch";
import { get_users_unsync } from "@/background/mysql/queries/user";
import { get_categories_unsync } from "@/background/mysql/queries/category";
import { get_products_unsync } from "@/background/mysql/queries/product";
import { get_sales_unsync } from "@/background/mysql/queries/sale";
import { get_sale_products_unsync } from "@/background/mysql/queries/sale-product";
import { get_suppliers_unsync } from "@/background/mysql/queries/supplier";
import { get_clients_unsync } from "@/background/mysql/queries/client";
import { UserRoleMySQL } from "@/types/user-role";
import { UserMySQL } from "@/types/user";
import { CategoryMySQL } from "@/types/category";
import { ProductMySQL } from "@/types/product";
import { SaleMySQL } from "@/types/sale";
import { SaleProductMySQL } from "@/types/sale-product";
import { SupplierMySQL } from "@/types/supplier";
import { ClientMySQL } from "@/types/client";
import "@/background/mysql/events/activity-log";
import "@/background/mysql/events/activity-log-access";
import "@/background/mysql/events/activity-log-operation";
import "@/background/mysql/events/branch";
import "@/background/mysql/events/cash-cutoff";
import "@/background/mysql/events/category";
import "@/background/mysql/events/client";
import "@/background/mysql/events/pos";
import "@/background/mysql/events/product";
import "@/background/mysql/events/product";
import "@/background/mysql/events/sale-product";
import "@/background/mysql/events/supplier";
import "@/background/mysql/events/user";
import "@/background/mysql/events/user-role";
import "@/background/mysql/events/user-role-permission";

ipcMain.on("mysql-offline-bakup", async(e, data) => {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";

   // Delete data
   await delete_table(connection, "client");
   await delete_table(connection, "supplier");
   await delete_table(connection, "sale_product");
   await delete_table(connection, "sale");
   await delete_table(connection, "product");
   await delete_table(connection, "category");
   await delete_table(connection, "users");
   await delete_table(connection, "user_role");
   await delete_table(connection, "branch");

   // // Reset auto_increments
   // await reset_auto_increment(connection, "client");
   // await reset_auto_increment(connection, "supplier");
   // await reset_auto_increment(connection, "sale_product");
   // await reset_auto_increment(connection, "sale");
   // await reset_auto_increment(connection, "product");
   // await reset_auto_increment(connection, "category");
   // await reset_auto_increment(connection, "users");
   // await reset_auto_increment(connection, "user_role");
   // await reset_auto_increment(connection, "branch");

   // Add branches
   console.log("############");
   console.log("## Errors ##");
   for(let i = 0; i < data.branch.length; i++) {
      const curr_data = data.branch[i];
      const new_id = await insert_branch(connection, curr_data);
      if(new_id <= 0) {
         console.log("## Branch");
         console.log("data", curr_data);
      }
   }

   // Add user roles
   for(let i = 0; i < data.user_role.length; i++) {
      const curr_data = data.user_role[i];
      query = "";
      query += "insert into user_role set ";
      query += "id = " + curr_data.id + ", ";
      query += "is_sync = 1, ";
      query += "sync_type = null, ";
      query += "name = '" + curr_data.name + "', ";
      query += "id_branch = " + curr_data.id_branch;

      connection.query(query, function(error, rows) {
         console.log("###############");
         console.log("## User Role ##");
         console.log("error", error);
         console.log("rows", rows);
      });
   }

   // Add users
   for(let i = 0; i < data.user.length; i++) {
      const curr_data = data.user[i];
      query = "";
      query += "insert into users set ";
      query += "id = " + curr_data.id + ", ";
      query += "is_sync = 1, ";
      query += "sync_type = null, ";
      query += "username = '" + curr_data.username + "', ";
      query += "email = '" + curr_data.email + "', ";
      query += "password = '" + curr_data.password + "', ";
      query += "first_name = '" + curr_data.first_name + "', ";
      query += "last_name = '" + curr_data.last_name + "', ";
      query += "id_role = " + curr_data.id_role + ", ";
      query += "id_branch = " + curr_data.id_branch;

      connection.query(query, function(error, rows) {
         console.log("##########");
         console.log("## User ##");
         console.log("error", error);
         console.log("rows", rows);
      });
   }

   // Add categories
   for(let i = 0; i < data.category.length; i++) {
      const curr_data = data.category[i];
      query = "";
      query += "insert into category set ";
      query += "id = " + curr_data.id + ", ";
      query += "is_sync = 1, ";
      query += "sync_type = null, ";
      query += "name = '" + curr_data.name + "', ";
      query += "id_branch = " + curr_data.id_branch;

      connection.query(query, function(error, rows) {
         console.log("##############");
         console.log("## Category ##");
         console.log("error", error);
         console.log("rows", rows);
      });
   }

   // Add products
   for(let i = 0; i < data.product.length; i++) {
      const curr_data = data.product[i];
      query = "";
      query += "insert into product set ";
      query += "id = " + curr_data.id + ", ";
      query += "is_sync = 1, ";
      query += "sync_type = null, ";
      // query += "is_favorite = " + curr_data.is_favorite + ", ";
      query += "code = " + parseStringField(curr_data.code) + ", ";
      query += "name = '" + curr_data.name + "', ";
      query += "description = " + parseStringField(curr_data.description) + ", ";
      query += "buy_price = '" + curr_data.buy_price + "', ";
      query += "sale_price = '" + curr_data.sale_price + "', ";
      query += "quantity = " + curr_data.quantity + ", ";
      query += "id_category = " + curr_data.id_category + ", ";
      query += "id_branch = " + curr_data.id_branch;

      connection.query(query, function(error, rows) {
         console.log("#############");
         console.log("## Product ##");
         console.log("error", error);
         console.log("rows", rows);
      });
   }

   // Add sales
   for(let i = 0; i < data.sale.length; i++) {
      const curr_data = data.sale[i];
      query = "";
      query += "insert into sale set ";
      query += "id = " + curr_data.id + ", ";
      query += "is_sync = 1, ";
      query += "sync_type = null, ";
      query += "total = " + curr_data.total + ", ";
      query += "id_branch = " + curr_data.id_branch;

      connection.query(query, function(error, rows) {
         console.log("##########");
         console.log("## Sale ##");
         console.log("error", error);
         console.log("rows", rows);
      });
   }

   // Add sale products
   for(let i = 0; i < data.sale_product.length; i++) {
      const curr_data = data.sale_product[i];
      query = "";
      query += "insert into sale_product set ";
      query += "id = " + curr_data.id + ", ";
      query += "is_sync = 1, ";
      query += "sync_type = null, ";
      query += "id_sale = " + curr_data.id_sale + ", ";
      query += "id_product = " + curr_data.id_product + ", ";
      query += "quantity = " + curr_data.quantity + ", ";
      query += "id_branch = " + curr_data.id_branch;

      connection.query(query, function(error, rows) {
         console.log("##################");
         console.log("## Sale Product ##");
         console.log("error", error);
         console.log("rows", rows);
      });
   }

   // Add suppliers
   for(let i = 0; i < data.supplier.length; i++) {
      const curr_data = data.supplier[i];
      query = "";
      query += "insert into supplier set ";
      query += "id = " + curr_data.id + ", ";
      query += "is_sync = 1, ";
      query += "sync_type = null, ";
      query += "name = '" + curr_data.name + "', ";
      query += "id_branch = " + curr_data.id_branch;

      connection.query(query, function(error, rows) {
         console.log("##############");
         console.log("## Supplier ##");
         console.log("error", error);
         console.log("rows", rows);
      });
   }

   // Add clients
   for(let i = 0; i < data.client.length; i++) {
      const curr_data = data.client[i];
      query = "";
      query += "insert into client set ";
      query += "id = " + curr_data.id + ", ";
      query += "is_sync = 1, ";
      query += "sync_type = null, ";
      query += "first_name = '" + curr_data.first_name + "', ";
      query += "last_name = '" + curr_data.last_name + "', ";
      query += "address = " + parseStringField(curr_data.address) + ", ";
      query += "cellphone = '" + curr_data.cellphone + "', ";
      query += "cellphone2 = " + parseStringField(curr_data.cellphone2) + ", ";
      query += "email = " + parseStringField(curr_data.email) + ", ";
      query += "id_branch = " + curr_data.id_branch;

      connection.query(query, function(error, rows) {
         console.log("############");
         console.log("## Client ##");
         console.log("error", error);
         console.log("rows", rows);
      });
   }

   connection.end(function() {
      e.sender.send("mysql-offline-bakup-reply");
   });
});

ipcMain.on("mysql-get-unsync-data", async(e) => {
   const connection = mysql.createConnection(mysql_connection);
   let user_role:UserRoleMySQL[] = [];
   let user:UserMySQL[] = [];
   let category:CategoryMySQL[] = [];
   let product:ProductMySQL[] = [];
   let sale:SaleMySQL[] = [];
   let sale_product:SaleProductMySQL[] = [];
   let supplier:SupplierMySQL[] = [];
   let client:ClientMySQL[] = [];

   user_role = await get_user_roles_unsync(connection);
   user = await get_users_unsync(connection);
   category = await get_categories_unsync(connection);
   product = await get_products_unsync(connection);
   sale = await get_sales_unsync(connection);
   sale_product = await get_sale_products_unsync(connection);
   supplier = await get_suppliers_unsync(connection);
   client = await get_clients_unsync(connection);

   e.sender.send("mysql-get-unsync-data-reply", {
      user_role: user_role,
      user: user,
      category: category,
      product: product,
      sale: sale,
      sale_product: sale_product,
      supplier: supplier,
      client: client
   });
});

ipcMain.on("mysql-sync-unsync-data", async(e) => {
   const connection = mysql.createConnection(mysql_connection);
   await update_sync_unsync_data(connection, "client");
   await update_sync_unsync_data(connection, "supplier");
   await update_sync_unsync_data(connection, "sale_product");
   await update_sync_unsync_data(connection, "sale");
   await update_sync_unsync_data(connection, "product");
   await update_sync_unsync_data(connection, "category");
   await update_sync_unsync_data(connection, "users");
   await update_sync_unsync_data(connection, "user_role");
   await update_sync_unsync_data(connection, "branch");
   e.sender.send("mysql-sync-unsync-data-reply");
});
