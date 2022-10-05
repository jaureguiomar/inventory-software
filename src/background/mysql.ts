import { ipcMain } from "electron";
import mysql, { MysqlError } from "mysql";

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
   query = "alter table client auto_increment = 1";
   connection.query(query);
   query = "alter table supplier auto_increment = 1";
   connection.query(query);
   query = "alter table sale_product auto_increment = 1";
   connection.query(query);
   query = "alter table sale auto_increment = 1";
   connection.query(query);
   query = "alter table product auto_increment = 1";
   connection.query(query);
   query = "alter table category auto_increment = 1";
   connection.query(query);
   query = "alter table users auto_increment = 1";
   connection.query(query);
   query = "alter table user_role auto_increment = 1";
   connection.query(query);
   query = "alter table branch auto_increment = 1";
   connection.query(query);

   // Add branches
   for(let i = 0; i < data.branch.length; i++) {
      const curr_data = data.branch[i];
      query = "";
      query += "insert into branch set ";
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
   let branch = [];
   let user_role = [];
   let user = [];
   let category = [];
   let product = [];
   let sale = [];
   let sale_product = [];
   let supplier = [];
   let client = [];
   let query = "";

   query = "select * from branch where is_sync = 0";
   connection.query(query, function(error, rows) {
      if(!error)
         branch = rows;

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
                                    branch: branch,
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
});

// ipcMain.on("mysql-sync-offline-data", function() {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";

//    // Delete data
//    query = "update sale set is_sync = 1";
//    connection.query(query, function(error, result) {
//       console.log("##########");
//       console.log("## Sale ##");
//       console.log("error", error);
//       console.log("result", result);
//    });

//    query = "update money_movements set is_sync = 1";
//    connection.query(query, function(error, result) {
//       console.log("####################");
//       console.log("## Money Movement ##");
//       console.log("error", error);
//       console.log("result", result);
//    });
// });

// ipcMain.on("mysql-get-pos-profile", function(e) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let row_result = [];

//    query = "select * from pos_profile limit 1";
//    connection.query(query, function(error, rows) {
//       if(!error)
//          if(rows.length > 0)
//          row_result = rows[0];
//    });

//    connection.end(function() {
//       e.sender.send("mysql-get-pos-profile-reply", row_result);
//    });
// });

// ipcMain.on("mysql-get-items", function(e) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let row_result = [];

//    query = "select * from items";
//    connection.query(query, function(error, rows) {
//       if(!error)
//          row_result = rows;
//    });

//    connection.end(function() {
//       e.sender.send("mysql-get-items-reply", row_result);
//    });
// });

// ipcMain.on("mysql-get-sales", function(e, date) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let row_result = [];

//    query += "select * from sale ";
//    query += "where posting_date ";
//    query += "between '" + date.initial_date + "' and '" + date.final_date + "' ";
//    query += "order by posting_date desc";
//    connection.query(query, function(error, rows) {
//       if(!error)
//          row_result = rows;
//    });

//    connection.end(function() {
//       e.sender.send("mysql-get-sales-reply", row_result);
//    });
// });

// ipcMain.on("mysql-get-unsync-sales", function(e) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let row_result = [];

//    query += "select * from sale where is_sync = 0";
//    connection.query(query, function(error, rows) {
//       if(!error)
//          row_result = rows;
//    });

//    connection.end(function() {
//       e.sender.send("mysql-get-unsync-sales-reply", row_result);
//    });
// });

// ipcMain.on("mysql-get-sale-by-id", function(e, sale_id) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let row_result = [];

//    query += "select * from sale ";
//    query += "where id = " + sale_id;
//    connection.query(query, function(error, rows) {
//       if(!error)
//          if(rows.length > 0)
//             row_result = rows[0];
//    });

//    connection.end(function() {
//       e.sender.send("mysql-get-sale-by-id-reply", row_result);
//    });
// });

// ipcMain.on("mysql-get-money-movements", function(e, date) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let row_result = [];

//    query += "select * from money_movements ";
//    query += "where posting_date ";
//    query += "between '" + date.initial_date + "' and '" + date.final_date + "' ";
//    query += "order by posting_date desc";
//    connection.query(query, function(error, rows) {
//       if(!error)
//          row_result = rows;
//    });

//    connection.end(function() {
//       e.sender.send("mysql-get-money-movements-reply", row_result);
//    });
// });

// ipcMain.on("mysql-get-unsync-money-movements", function(e) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let row_result = [];

//    query += "select * from money_movements where is_sync = 0";
//    connection.query(query, function(error, rows) {
//       if(!error)
//          row_result = rows;
//    });

//    connection.end(function() {
//       e.sender.send("mysql-get-unsync-money-movements-reply", row_result);
//    });
// });

// ipcMain.on("mysql-process-sale", function(e, sale) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let query_error:MysqlError|null = null;
//    let query_result = null;

//    query += "insert into sale set ";
//    query += "is_sync = " + sale.is_sync + ", ";
//    // query += "name = '" + sale.name + "', ";
//    query += "items = '" + sale.items + "', ";
//    query += "payments = '" + sale.payments + "', ";
//    query += "pos_profile = '" + sale.pos_profile + "', ";
//    query += "branch = '" + sale.branch + "', ";
//    query += "posting_date = '" + sale.posting_date + "', ";
//    query += "posting_time = '" + sale.posting_time + "', ";
//    query += "total = '" + sale.total + "', ";
//    query += "owner = '" + sale.username + "'";

//    connection.query(query, function(error, row) {
//       query_error = error;
//       query_result = row;
//    });

//    connection.end(function() {
//       e.sender.send("mysql-process-sale-reply", {
//          error: query_error,
//          result: query_result
//       });
//    });
// });

// ipcMain.on("mysql-process-money-movement", function(e, money_movement) {
//    const connection = mysql.createConnection(mysql_connection);
//    let query = "";
//    let query_error:MysqlError|null = null;

//    query += "insert into money_movements set ";
//    query += "pos_profile = '" + money_movement.pos_profile + "', ";
//    query += "branch = '" + money_movement.branch + "', ";
//    query += "description = '" + money_movement.description + "', ";
//    query += "total = '" + money_movement.total + "', ";
//    query += "posting_date = '" + money_movement.posting_date + "', ";
//    query += "move_type = '" + money_movement.move_type + "'";

//    connection.query(query, function(error) {
//       query_error = error;
//    });

//    connection.end(function() {
//       e.sender.send("mysql-process-money-movement-reply", query_error);
//    });
// });

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
