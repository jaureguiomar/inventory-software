import { ipcMain } from "electron";
import mysql, { MysqlError } from "mysql";

const mysql_connection = {
   host: "localhost",
   user: "root",
   password: "12345",
   database: "point_of_sale",
   port: 3310
};

ipcMain.on("mysql-items-bakup", function(e, data) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";

   // Delete data
   query = "delete from pos_profile";
   connection.query(query);
   query = "delete from items";
   connection.query(query);

   // Add pos profile
   query = "";
   query += "insert into pos_profile set ";
   query += "name = '" + data.pos_profile.name + "', ";
   query += "warehouse = '" + data.pos_profile.warehouse + "', ";
   query += "branch = '" + data.pos_profile.branch + "', ";
   query += "payments = '" + JSON.stringify(data.pos_profile.payments) + "', ";
   query += "pin_access = '" + JSON.stringify(data.pos_profile.pin_access) + "', ";
   query += "banners = '" + JSON.stringify(data.pos_profile.banners) + "', ";
   query += "favorites = '" + JSON.stringify(data.pos_profile.favorites) + "', ";
   query += "user = '" + data.username + "'";

   connection.query(query, function(error, rows) {
      console.log("#################");
      console.log("## Pos Profile ##");
      console.log("error", error);
      console.log("rows", rows);
   });

   // Add items
   for(let i = 0; i < data.items.length; i++) {
      const curr_item = data.items[i];
      query = "";
      query += "insert into items set ";
      query += "item_code = '" + curr_item.item_code + "', ";
      query += "item_name = '" + curr_item.item_name + "', ";
      query += "brand = '" + curr_item.brand + "', ";
      query += "item_group = '" + curr_item.item_group + "', ";
      query += "price_list_rate = '" + curr_item.price_list_rate + "', ";
      query += "stock_num = '" + curr_item.stock_uom + "', ";
      query += "actual_qty = '" + curr_item.actual_qty + "', ";
      query += "in_stock_item = " + curr_item.is_stock_item;

      connection.query(query, function(error, rows) {
         console.log("############");
         console.log("## Items ##");
         console.log("error", error);
         console.log("rows", rows);
      });
   }

   connection.end(function() {
      e.sender.send("mysql-items-bakup-reply");
   });
});

ipcMain.on("mysql-sync-offline-data", function() {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";

   // Delete data
   query = "update sale set is_sync = 1";
   connection.query(query, function(error, result) {
      console.log("##########");
      console.log("## Sale ##");
      console.log("error", error);
      console.log("result", result);
   });

   query = "update money_movements set is_sync = 1";
   connection.query(query, function(error, result) {
      console.log("####################");
      console.log("## Money Movement ##");
      console.log("error", error);
      console.log("result", result);
   });
});

ipcMain.on("mysql-get-pos-profile", function(e) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let row_result = [];

   query = "select * from pos_profile limit 1";
   connection.query(query, function(error, rows) {
      if(!error)
         if(rows.length > 0)
         row_result = rows[0];
   });

   connection.end(function() {
      e.sender.send("mysql-get-pos-profile-reply", row_result);
   });
});

ipcMain.on("mysql-get-items", function(e) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let row_result = [];

   query = "select * from items";
   connection.query(query, function(error, rows) {
      if(!error)
         row_result = rows;
   });

   connection.end(function() {
      e.sender.send("mysql-get-items-reply", row_result);
   });
});

ipcMain.on("mysql-get-sales", function(e, date) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let row_result = [];

   query += "select * from sale ";
   query += "where posting_date ";
   query += "between '" + date.initial_date + "' and '" + date.final_date + "' ";
   query += "order by posting_date desc";
   connection.query(query, function(error, rows) {
      if(!error)
         row_result = rows;
   });

   connection.end(function() {
      e.sender.send("mysql-get-sales-reply", row_result);
   });
});

ipcMain.on("mysql-get-unsync-sales", function(e) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let row_result = [];

   query += "select * from sale where is_sync = 0";
   connection.query(query, function(error, rows) {
      if(!error)
         row_result = rows;
   });

   connection.end(function() {
      e.sender.send("mysql-get-unsync-sales-reply", row_result);
   });
});

ipcMain.on("mysql-get-sale-by-id", function(e, sale_id) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let row_result = [];

   query += "select * from sale ";
   query += "where id = " + sale_id;
   connection.query(query, function(error, rows) {
      if(!error)
         if(rows.length > 0)
            row_result = rows[0];
   });

   connection.end(function() {
      e.sender.send("mysql-get-sale-by-id-reply", row_result);
   });
});

ipcMain.on("mysql-get-money-movements", function(e, date) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let row_result = [];

   query += "select * from money_movements ";
   query += "where posting_date ";
   query += "between '" + date.initial_date + "' and '" + date.final_date + "' ";
   query += "order by posting_date desc";
   connection.query(query, function(error, rows) {
      if(!error)
         row_result = rows;
   });

   connection.end(function() {
      e.sender.send("mysql-get-money-movements-reply", row_result);
   });
});

ipcMain.on("mysql-get-unsync-money-movements", function(e) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let row_result = [];

   query += "select * from money_movements where is_sync = 0";
   connection.query(query, function(error, rows) {
      if(!error)
         row_result = rows;
   });

   connection.end(function() {
      e.sender.send("mysql-get-unsync-money-movements-reply", row_result);
   });
});

ipcMain.on("mysql-process-sale", function(e, sale) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let query_error:MysqlError|null = null;
   let query_result = null;

   query += "insert into sale set ";
   query += "is_sync = " + sale.is_sync + ", ";
   // query += "name = '" + sale.name + "', ";
   query += "items = '" + sale.items + "', ";
   query += "payments = '" + sale.payments + "', ";
   query += "pos_profile = '" + sale.pos_profile + "', ";
   query += "branch = '" + sale.branch + "', ";
   query += "posting_date = '" + sale.posting_date + "', ";
   query += "posting_time = '" + sale.posting_time + "', ";
   query += "total = '" + sale.total + "', ";
   query += "owner = '" + sale.username + "'";

   connection.query(query, function(error, row) {
      query_error = error;
      query_result = row;
   });

   connection.end(function() {
      e.sender.send("mysql-process-sale-reply", {
         error: query_error,
         result: query_result
      });
   });
});

ipcMain.on("mysql-process-money-movement", function(e, money_movement) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let query_error:MysqlError|null = null;

   query += "insert into money_movements set ";
   query += "pos_profile = '" + money_movement.pos_profile + "', ";
   query += "branch = '" + money_movement.branch + "', ";
   query += "description = '" + money_movement.description + "', ";
   query += "total = '" + money_movement.total + "', ";
   query += "posting_date = '" + money_movement.posting_date + "', ";
   query += "move_type = '" + money_movement.move_type + "'";

   connection.query(query, function(error) {
      query_error = error;
   });

   connection.end(function() {
      e.sender.send("mysql-process-money-movement-reply", query_error);
   });
});

ipcMain.on("mysql-process-login", function(e, data) {
   const connection = mysql.createConnection(mysql_connection);
   let query = "";
   let query_error:MysqlError|null = null;
   let query_result = [];

   if(data.success) {
      query = "";
      query += "select * from users where ";
      query += "username = '" + data.username + "'";
      connection.query(query, function(error, row) {
         query_error = error;
         query_result = row;

         if(!query_error) {
         if(query_result.length <= 0) {
            query = "";
            query += "insert into users set ";
            query += "username = '" + data.username + "', ";
            query += "password = '" + data.password + "'";
            connection.query(query, function(error, row) {
               query_error = error;
               query_result = row;

               connection.end(function() {
                  e.sender.send("mysql-process-login-reply", {
                     error: query_error,
                     result: query_result
                  });
               });
            });
         } else {
            query = "";
            query += "update users set ";
            query += "password = '" + data.password + "' ";
            query += "where username = '" + data.username + "'";
            connection.query(query, function(error, row) {
               query_error = error;
               query_result = row;

               connection.end(function() {
                  e.sender.send("mysql-process-login-reply", {
                     error: query_error,
                     result: query_result
                  });
               });
            });
         }
         }
      });
   } else {
      query = "";
      query += "select * from users where ";
      query += "username = '" + data.username + "' and ";
      query += "password = '" + data.password + "'";
      connection.query(query, function(error, row) {
         query_error = error;
         query_result = row;

         connection.end(function() {
            e.sender.send("mysql-process-login-reply", {
               error: query_error,
               result: query_result
            });
         });
      });
   }
});
