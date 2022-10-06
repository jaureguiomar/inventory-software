import { ipcMain } from "electron";
import mysql, { MysqlError } from "mysql";
import { Category } from "@/interfaces/category/category";
import { Branch } from "@/interfaces/branch/branch";
import {} from "./functions";

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

ipcMain.on("mysql-get-category", async function(e) {
   const connection = mysql.createConnection(mysql_connection);
   const promise_get_category = new Promise<Array<Category>>((resolve) => {
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
                  id_branch: Number(rows[i].id_branch),
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
               });
            }
         }
         resolve(data);
      });
   });
   const get_branch_by_id = async(id:number) => {
      const promise_get_branch = new Promise<Branch>((resolve) => {
         const query = "select * from branch where id = " + id;
         connection.query(query, function(error, rows) {
            let result_branch:Branch = {
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

            if(!error) {
               if(rows.length > 0) {
                  const curr_row = rows[0];
                  result_branch = {
                     ...curr_row,
                     created: parseDate(curr_row.created),
                     updated: parseDate(curr_row.updated)
                  };
               }
            }
            resolve(result_branch);
         });
      });
      return await promise_get_branch;
   };

   const category_data:Array<Category> = await promise_get_category;
   for(let i = 0; i < category_data.length; i++) {
      const branch_data = await get_branch_by_id(category_data[i].id_branch);
      category_data[i].branch = { ...branch_data };
   }
   e.sender.send("mysql-get-category-reply", category_data);
});
ipcMain.on("mysql-create-category", async function(e, data) {
   const connection = mysql.createConnection(mysql_connection);
   const insert_category = async(data:Category) => {
      const promise_insert_branch = new Promise<number>((resolve) => {
         let query = "";
         query += "insert into category set ";
         query += "is_sync = 0, ";
         query += "sync_type = 'add', ";
         query += "name = '" + data.name + "', ";
         query += "id_branch = " + data.id_branch;

         connection.query(query, function(error, result) {
            let new_id:number = -1;
            if(!error)
               new_id = result.insertId;
            resolve(new_id);
         });
      });
      return await promise_insert_branch;
   };
   const get_category_by_id = async(id:number) => {
      const promise_get_branch = new Promise<Category>((resolve) => {
         const query = "select * from category where id = " + id;
         connection.query(query, function(error, rows) {
            let result_category:Category = {
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

            if(!error) {
               if(rows.length > 0) {
                  const curr_row = rows[0];
                  result_category = {
                     ...curr_row,
                     created: parseDate(curr_row.created),
                     updated: parseDate(curr_row.updated),
                     branch: {
                        ...curr_row.branch,
                        created: parseDate(curr_row.branch.created),
                        updated: parseDate(curr_row.branch.updated),
                     }
                  };
               }
            }
            resolve(result_category);
         });
      });
      return await promise_get_branch;
   };
   const get_branch_by_id = async(id:number) => {
      const promise_get_branch = new Promise<Branch>((resolve) => {
         const query = "select * from branch where id = " + id;
         connection.query(query, function(error, rows) {
            let result_branch:Branch = {
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

            if(!error) {
               if(rows.length > 0) {
                  const curr_row = rows[0];
                  result_branch = {
                     ...curr_row,
                     created: parseDate(curr_row.created),
                     updated: parseDate(curr_row.updated)
                  };
               }
            }
            resolve(result_branch);
         });
      });
      return await promise_get_branch;
   };

   const new_category_id = await insert_category(data);
   const new_category_data = await get_category_by_id(new_category_id);
   const branch_data = await get_branch_by_id(new_category_data.id_branch);
   new_category_data.branch = { ...branch_data };
   e.sender.send("mysql-create-category-reply", new_category_data);
});
ipcMain.on("mysql-update-category", async function(e, data) {
   const connection = mysql.createConnection(mysql_connection);
   const update_category = async(data:Category) => {
      const promise_insert_branch = new Promise<boolean>((resolve) => {
         let query = "";
         query += "update category set ";
         query += "is_sync = 0, ";
         query += "sync_type = 'update', ";
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
      return await promise_insert_branch;
   };
   const get_category_by_id = async(id:number) => {
      const promise_get_branch = new Promise<Category>((resolve) => {
         const query = "select * from category where id = " + id;
         connection.query(query, function(error, rows) {
            let result_category:Category = {
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

            if(!error) {
               if(rows.length > 0) {
                  const curr_row = rows[0];
                  result_category = {
                     ...curr_row,
                     created: parseDate(curr_row.created),
                     updated: parseDate(curr_row.updated),
                     branch: {
                        ...curr_row.branch,
                        created: parseDate(curr_row.branch.created),
                        updated: parseDate(curr_row.branch.updated),
                     }
                  };
               }
            }
            resolve(result_category);
         });
      });
      return await promise_get_branch;
   };
   const get_branch_by_id = async(id:number) => {
      const promise_get_branch = new Promise<Branch>((resolve) => {
         const query = "select * from branch where id = " + id;
         connection.query(query, function(error, rows) {
            let result_branch:Branch = {
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

            if(!error) {
               if(rows.length > 0) {
                  const curr_row = rows[0];
                  result_branch = {
                     ...curr_row,
                     created: parseDate(curr_row.created),
                     updated: parseDate(curr_row.updated)
                  };
               }
            }
            resolve(result_branch);
         });
      });
      return await promise_get_branch;
   };

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
   const is_ok = await update_category(data);
   if(is_ok) {
      new_category_data = await get_category_by_id(data.id);
      branch_data = await get_branch_by_id(data.id_branch);
      new_category_data.branch = { ...branch_data };
   }
   e.sender.send("mysql-update-category-reply", new_category_data);
});
ipcMain.on("mysql-delete-category", async function(e, id) {
   const connection = mysql.createConnection(mysql_connection);
   const delete_category = async(id:number) => {
      const promise_insert_branch = new Promise<boolean>((resolve) => {
         let query = "";
         query += "update category set ";
         query += "is_active = 0, ";
         query += "is_sync = 0, ";
         query += "sync_type = 'delete' ";
         query += "where id = " + id;

         connection.query(query, function(error, result) {
            let is_ok = true;
            if(error)
               is_ok = false;
            resolve(is_ok);
         });
      });
      return await promise_insert_branch;
   };

   const is_ok = await delete_category(id);
   e.sender.send("mysql-delete-category-reply", is_ok);
});

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
