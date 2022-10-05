import { ipcMain } from "electron";
import mysql, { MysqlError } from "mysql";
import { Category } from "@/interfaces/category/category";

const mysql_connection = {
   host: "localhost",
   user: "root",
   password: "12345",
   database: "inventory_system_local",
   port: 3310
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

ipcMain.on("mysql-get-category-data", function(e) {
   const connection = mysql.createConnection(mysql_connection);
   const query = "select * from category where is_active = 1";

   connection.query(query, function(error, rows) {
      const data:Array<Category> = [];
      if(!error) {
         for(let i = 0; i < rows.length; i++) {
            data.push({
               id: Number(rows[i].id),
               is_active: rows[i].is_active,
               created: parseDate(rows[i].created),
               updated: parseDate(rows[i].updated),
               name: rows[i].name,
               id_branch: Number(rows[i].id_branch)
            });
         }
      }
      e.sender.send("mysql-get-category-data-reply", data);
   });
});

// ipcMain.on("mysql-process-login", function(e, data) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let query_error:MysqlError|null = null;
//    let query_result = [];

//    if(data.success) {
//       query = "";
//       query += "select * from users where ";
//       query += "username = '" + data.username + "'";
//       connection.query(query, function(error, row) {
//          query_error = error;
//          query_result = row;

//          if(!query_error) {
//          if(query_result.length <= 0) {
//             query = "";
//             query += "insert into users set ";
//             query += "username = '" + data.username + "', ";
//             query += "password = '" + data.password + "'";
//             connection.query(query, function(error, row) {
//                query_error = error;
//                query_result = row;

//                connection.end(function() {
//                   e.sender.send("mysql-process-login-reply", {
//                      error: query_error,
//                      result: query_result
//                   });
//                });
//             });
//          } else {
//             query = "";
//             query += "update users set ";
//             query += "password = '" + data.password + "' ";
//             query += "where username = '" + data.username + "'";
//             connection.query(query, function(error, row) {
//                query_error = error;
//                query_result = row;

//                connection.end(function() {
//                   e.sender.send("mysql-process-login-reply", {
//                      error: query_error,
//                      result: query_result
//                   });
//                });
//             });
//          }
//          }
//       });
//    } else {
//       query = "";
//       query += "select * from users where ";
//       query += "username = '" + data.username + "' and ";
//       query += "password = '" + data.password + "'";
//       connection.query(query, function(error, row) {
//          query_error = error;
//          query_result = row;

//          connection.end(function() {
//             e.sender.send("mysql-process-login-reply", {
//                error: query_error,
//                result: query_result
//             });
//          });
//       });
//    }
// });

const parseStringField = (value:string) => {
   if(!value)
      return null;
   return "'" + value + "'";
};

const parseDate = (date:Date) => {
   const year:number = date.getFullYear();
   let month:string|number = date.getMonth() + 1;
   let day:string|number = date.getDate();

   if(month < 10)
      month = "0" + month;
   if(day < 10)
      day = "0" + day;

   return year + "-" + month + "-" + day;
}
