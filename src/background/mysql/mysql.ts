import { ipcMain } from "electron";
import mysql from "mysql";
import {
   get_categories, get_category_by_id, get_category_mysql_by_id,
   insert_category, update_category, delete_category
} from "@/background/mysql/category";
import { get_branch_by_id } from '@/background/mysql/branch';
import { parseStringField } from "@/background/mysql/functions";
import { Category } from "@/types/category";
import { Branch } from "@/types/branch";
import { MySQLOfflineField } from "@/types/general";

const mysql_connection = {
   host: "localhost",
   user: "root",
   password: "12345",
   database: "inventory_system_local",
   port: 3306
};

ipcMain.on("mysql-offline-bakup", function(e, data) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";

   // Delete data
   query = "delete from client";
   connection.query(query);
   query = "delete from supplier";
   connection.query(query);
   query = "delete from sale_product";
   connection.query(query);
   query = "delete from sale";
   connection.query(query);
   query = "delete from product";
   connection.query(query);
   query = "delete from category";
   connection.query(query);
   query = "delete from users";
   connection.query(query);
   query = "delete from user_role";
   connection.query(query);
   query = "delete from branch";
   connection.query(query);

   // Reset auto_increments
   // query = "alter table client auto_increment = 1";
   // connection.query(query);
   // query = "alter table supplier auto_increment = 1";
   // connection.query(query);
   // query = "alter table sale_product auto_increment = 1";
   // connection.query(query);
   // query = "alter table sale auto_increment = 1";
   // connection.query(query);
   // query = "alter table product auto_increment = 1";
   // connection.query(query);
   // query = "alter table category auto_increment = 1";
   // connection.query(query);
   // query = "alter table users auto_increment = 1";
   // connection.query(query);
   // query = "alter table user_role auto_increment = 1";
   // connection.query(query);
   // query = "alter table branch auto_increment = 1";
   // connection.query(query);

   // Add branches
   for(let i = 0; i < data.branch.length; i++) {
      const curr_data = data.branch[i];
      query = "";
      query += "insert into branch set ";
      query += "id = " + curr_data.id + ", ";
      query += "name = '" + curr_data.name + "', ";
      query += "telephone = " + parseStringField(curr_data.telephone) + ", ";
      query += "address = " + parseStringField(curr_data.address) + ", ";
      query += "machine_id = " + parseStringField(curr_data.machine_id) + ", ";
      query += "mac_address = " + parseStringField(curr_data.mac_address);

      connection.query(query, function(error, rows) {
         console.log("############");
         console.log("## Branch ##");
         console.log("error", error);
         console.log("rows", rows);
      });
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

ipcMain.on("mysql-get-unsync-data", function(e) {
   const connection = mysql.createConnection(mysql_connection);
   let user_role = [];
   let user = [];
   let category = [];
   let product = [];
   let sale = [];
   let sale_product = [];
   let supplier = [];
   let client = [];
   let query = "";

   query = "select * from user_role where is_sync = 0";
   connection.query(query, function(error, rows) {
      if(!error)
         user_role = rows;

      query = "select * from users where is_sync = 0";
      connection.query(query, function(error, rows) {
         if(!error)
            user = rows;

         query = "select * from category where is_sync = 0";
         connection.query(query, function(error, rows) {
            if(!error)
               category = rows;

            query = "select * from product where is_sync = 0";
            connection.query(query, function(error, rows) {
               if(!error)
                  product = rows;

               query = "select * from sale where is_sync = 0";
               connection.query(query, function(error, rows) {
                  if(!error)
                     sale = rows;

                  query = "select * from sale_product where is_sync = 0";
                  connection.query(query, function(error, rows) {
                     if(!error)
                        sale_product = rows;

                     query = "select * from supplier where is_sync = 0";
                     connection.query(query, function(error, rows) {
                        if(!error)
                           supplier = rows;

                        query = "select * from client where is_sync = 0";
                        connection.query(query, function(error, rows) {
                           if(!error)
                              client = rows;

                           connection.end(function() {
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
                        });
                     });
                  });
               });
            });
         });
      });
   });
});

ipcMain.on("mysql-sync-unsync-data", function(e) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";

   // Sync data
   query = "update client set is_sync = 1, sync_type = null";
   connection.query(query);
   query = "update supplier set is_sync = 1, sync_type = null";
   connection.query(query);
   query = "update sale_product set is_sync = 1, sync_type = null";
   connection.query(query);
   query = "update sale set is_sync = 1, sync_type = null";
   connection.query(query);
   query = "update product set is_sync = 1, sync_type = null";
   connection.query(query);
   query = "update category set is_sync = 1, sync_type = null";
   connection.query(query);
   query = "update users set is_sync = 1, sync_type = null";
   connection.query(query);
   query = "update user_role set is_sync = 1, sync_type = null";
   connection.query(query);

   e.sender.send("mysql-sync-unsync-data-reply");
});

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
      id_branch: -1,
      branch: {
         id: -1,
         is_active: -1,
         created: "",
         updated: "",
         name: "",
         telephone: "",
         address: "",
         machine_id: "",
         mac_address: ""
      }
   };
   let branch_data:Branch = {
      id: -1,
      is_active: -1,
      created: "",
      updated: "",
      name: "",
      telephone: "",
      address: "",
      machine_id: "",
      mac_address: ""
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
