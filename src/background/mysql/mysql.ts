import { ipcMain } from "electron";
import mysql from "mysql";
import { mysql_connection } from "@/background/mysql/connection";
import { formattedStringDateToDate } from "@/background/mysql/functions";
import { update_sync_unsync_data, delete_table, reset_auto_increment } from "@/background/mysql/queries/global";
import { get_user_roles_mysql_unsync, insert_user_role_mysql } from "@/background/mysql/queries/user-role";
import { get_users_mysql_unsync, insert_user_mysql } from "@/background/mysql/queries/user";
import { get_categories_mysql_unsync, insert_category_mysql } from "@/background/mysql/queries/category";
import { get_products_mysql_unsync, insert_product_mysql } from "@/background/mysql/queries/product";
import { get_sales_mysql_unsync, insert_sale_mysql } from "@/background/mysql/queries/sale";
import { get_sale_products_mysql_unsync, insert_sale_product_mysql } from "@/background/mysql/queries/sale-product";
import { get_suppliers_mysql_unsync, insert_supplier_mysql } from "@/background/mysql/queries/supplier";
import { get_clients_mysql_unsync, insert_client_mysql } from "@/background/mysql/queries/client";
import { get_user_role_permissions_mysql_unsync, insert_user_role_permission_mysql } from "@/background/mysql/queries/user-role-permission";
import { get_cash_cutoffs_mysql_unsync, insert_cash_cutoff_mysql } from "@/background/mysql/queries/cash-cutoff";
import { get_cash_cutoff_types_mysql_unsync, insert_cash_cutoff_type_mysql } from "@/background/mysql/queries/cash-cutoff-type";
import { get_activity_log_operations_mysql_unsync, insert_activity_log_operation_mysql } from "@/background/mysql/queries/activity-log-operation";
import { get_activity_log_accesses_mysql_unsync, insert_activity_log_access_mysql } from "@/background/mysql/queries/activity-log-access";
import { get_activity_logs_mysql_unsync, insert_activity_log_mysql } from "@/background/mysql/queries/activity-log";
import { get_poss_mysql_unsync, insert_pos } from "@/background/mysql/queries/pos";
import { get_branches_mysql_unsync, insert_branch } from "@/background/mysql/queries/branch";
import { BgOfflineBakup } from "@/types/background";
import { UserRoleMySQL } from "@/types/user-role";
import { UserMySQL } from "@/types/user";
import { CategoryMySQL } from "@/types/category";
import { ProductMySQL } from "@/types/product";
import { SaleMySQL } from "@/types/sale";
import { SaleProductMySQL } from "@/types/sale-product";
import { SupplierMySQL } from "@/types/supplier";
import { ClientMySQL } from "@/types/client";
import { BranchMySQL } from "@/types/branch";
import { PosMySQL } from "@/types/pos";
import { ActivityLogMySQL } from "@/types/activity-log";
import { ActivityLogAccessMySQL } from "@/types/activity-log-access";
import { ActivityLogOperationMySQL } from "@/types/activity-log-operation";
import { CashCutoffMySQL } from "@/types/cash-cutoff";
import { CashCutoffTypeMySQL } from "@/types/cash-cutoff-type";
import { UserRolePermissionMySQL } from "@/types/user-role-permission";
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

ipcMain.on("mysql-offline-bakup", async(e, data:BgOfflineBakup) => {
   const connection = mysql.createConnection(mysql_connection);
   const display_errors = true;

   // Delete data
   await delete_table(connection, "client");
   await delete_table(connection, "supplier");
   await delete_table(connection, "sale_product");
   await delete_table(connection, "sale");
   await delete_table(connection, "product");
   await delete_table(connection, "category");
   await delete_table(connection, "activity_log");
   await delete_table(connection, "activity_log_access");
   await delete_table(connection, "activity_log_operation");
   await delete_table(connection, "auth_token");
   await delete_table(connection, "cash_cutoff");
   await delete_table(connection, "cash_cutoff_type");
   await delete_table(connection, "users");
   await delete_table(connection, "user_role");
   await delete_table(connection, "user_role_permission");
   await delete_table(connection, "pos");
   await delete_table(connection, "branch");

   // // Reset auto_increments
   await reset_auto_increment(connection, "client");
   await reset_auto_increment(connection, "supplier");
   await reset_auto_increment(connection, "sale_product");
   await reset_auto_increment(connection, "sale");
   await reset_auto_increment(connection, "product");
   await reset_auto_increment(connection, "category");
   await reset_auto_increment(connection, "activity_log");
   await reset_auto_increment(connection, "activity_log_access");
   await reset_auto_increment(connection, "activity_log_operation");
   await reset_auto_increment(connection, "auth_token");
   await reset_auto_increment(connection, "cash_cutoff");
   await reset_auto_increment(connection, "cash_cutoff_type");
   await reset_auto_increment(connection, "users");
   await reset_auto_increment(connection, "user_role_permission");
   await reset_auto_increment(connection, "user_role");
   await reset_auto_increment(connection, "pos");
   await reset_auto_increment(connection, "branch");

   // Add branches
   console.log("############");
   console.log("## Errors ##");
   console.log("## Branch");
   for(let i = 0; i < data.branch.length; i++) {
      const curr_data = data.branch[i];
      const new_id = await insert_branch(connection, curr_data);
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add poss
   console.log("## Pos");
   for(let i = 0; i < data.pos.length; i++) {
      const curr_data = data.pos[i];
      const new_id = await insert_pos(connection, curr_data);
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add user role permissions
   console.log("## UserRolePermission");
   for(let i = 0; i < data.user_role_permission.length; i++) {
      const curr_data = data.user_role_permission[i];
      const new_id = await insert_user_role_permission_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: formattedStringDateToDate(curr_data.created),
         updated: formattedStringDateToDate(curr_data.updated)
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add user roles
   console.log("## UserRole");
   for(let i = 0; i < data.user_role.length; i++) {
      const curr_data = data.user_role[i];
      const new_id = await insert_user_role_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: formattedStringDateToDate(curr_data.created),
         updated: formattedStringDateToDate(curr_data.updated)
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add users
   console.log("## User");
   for(let i = 0; i < data.user.length; i++) {
      const curr_data = data.user[i];
      const new_id = await insert_user_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: formattedStringDateToDate(curr_data.created),
         updated: formattedStringDateToDate(curr_data.updated)
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add cash cutoff types
   console.log("## CashCutoffType");
   for(let i = 0; i < data.cash_cutoff_type.length; i++) {
      const curr_data = data.cash_cutoff_type[i];
      const new_id = await insert_cash_cutoff_type_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: formattedStringDateToDate(curr_data.created),
         updated: formattedStringDateToDate(curr_data.updated)
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add cash cutoffs
   console.log("## CashCutoff");
   for(let i = 0; i < data.cash_cutoff.length; i++) {
      const curr_data = data.cash_cutoff[i];
      const new_id = await insert_cash_cutoff_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: formattedStringDateToDate(curr_data.created),
         updated: formattedStringDateToDate(curr_data.updated)
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add activity log operations
   console.log("## ActivityLogOperation");
   for(let i = 0; i < data.activity_log_operation.length; i++) {
      const curr_data = data.activity_log_operation[i];
      const new_id = await insert_activity_log_operation_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: formattedStringDateToDate(curr_data.created),
         updated: formattedStringDateToDate(curr_data.updated)
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add activity log accesses
   console.log("## ActivityLogAccess");
   for(let i = 0; i < data.activity_log_access.length; i++) {
      const curr_data = data.activity_log_access[i];
      const new_id = await insert_activity_log_access_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: formattedStringDateToDate(curr_data.created),
         updated: formattedStringDateToDate(curr_data.updated)
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add activity log
   console.log("## ActivityLog");
   for(let i = 0; i < data.activity_log.length; i++) {
      const curr_data = data.activity_log[i];
      const new_id = await insert_activity_log_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: formattedStringDateToDate(curr_data.created),
         updated: formattedStringDateToDate(curr_data.updated)
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add categories
   console.log("## Category");
   for(let i = 0; i < data.category.length; i++) {
      const curr_data = data.category[i];
      const new_id = await insert_category_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: formattedStringDateToDate(curr_data.created),
         updated: formattedStringDateToDate(curr_data.updated)
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add products
   console.log("## Product");
   for(let i = 0; i < data.product.length; i++) {
      const curr_data = data.product[i];
      const new_id = await insert_product_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: new Date(),
         updated: new Date()
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add sales
   console.log("## Sale");
   for(let i = 0; i < data.sale.length; i++) {
      const curr_data = data.sale[i];
      const new_id = await insert_sale_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: new Date(),
         updated: new Date()
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add sale products
   console.log("## SaleProduct");
   for(let i = 0; i < data.sale_product.length; i++) {
      const curr_data = data.sale_product[i];
      const new_id = await insert_sale_product_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: new Date(),
         updated: new Date()
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add suppliers
   console.log("## Supplier");
   for(let i = 0; i < data.supplier.length; i++) {
      const curr_data = data.supplier[i];
      const new_id = await insert_supplier_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: new Date(),
         updated: new Date()
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }
   // Add clients
   console.log("## Client");
   for(let i = 0; i < data.client.length; i++) {
      const curr_data = data.client[i];
      const new_id = await insert_client_mysql(connection, {
         ...curr_data,
         is_sync: 1,
         sync_type: null,
         created: new Date(),
         updated: new Date()
      });
      if(new_id <= 0 && display_errors)
         console.log("data", curr_data);
   }

   connection.end(function() {
      e.sender.send("mysql-offline-bakup-reply");
   });
});

ipcMain.on("mysql-get-unsync-data", async(e) => {
   const connection = mysql.createConnection(mysql_connection);
   let activity_log:ActivityLogMySQL[] = [];
   let activity_log_access:ActivityLogAccessMySQL[] = [];
   let activity_log_operation:ActivityLogOperationMySQL[] = [];
   let branch:BranchMySQL[] = [];
   let cash_cutoff:CashCutoffMySQL[] = [];
   let cash_cutoff_type:CashCutoffTypeMySQL[] = [];
   let category:CategoryMySQL[] = [];
   let client:ClientMySQL[] = [];
   let pos:PosMySQL[] = [];
   let product:ProductMySQL[] = [];
   let sale:SaleMySQL[] = [];
   let sale_product:SaleProductMySQL[] = [];
   let supplier:SupplierMySQL[] = [];
   let user:UserMySQL[] = [];
   let user_role:UserRoleMySQL[] = [];
   let user_role_permission:UserRolePermissionMySQL[] = [];

   activity_log = await get_activity_logs_mysql_unsync(connection);
   activity_log_access = await get_activity_log_accesses_mysql_unsync(connection);
   activity_log_operation = await get_activity_log_operations_mysql_unsync(connection);
   branch = await get_branches_mysql_unsync(connection);
   cash_cutoff = await get_cash_cutoffs_mysql_unsync(connection);
   cash_cutoff_type = await get_cash_cutoff_types_mysql_unsync(connection);
   category = await get_categories_mysql_unsync(connection);
   client = await get_clients_mysql_unsync(connection);
   pos = await get_poss_mysql_unsync(connection);
   product = await get_products_mysql_unsync(connection);
   sale = await get_sales_mysql_unsync(connection);
   sale_product = await get_sale_products_mysql_unsync(connection);
   supplier = await get_suppliers_mysql_unsync(connection);
   user = await get_users_mysql_unsync(connection);
   user_role = await get_user_roles_mysql_unsync(connection);
   user_role_permission = await get_user_role_permissions_mysql_unsync(connection);

   e.sender.send("mysql-get-unsync-data-reply", {
      activity_log: activity_log,
      activity_log_access: activity_log_access,
      activity_log_operation: activity_log_operation,
      branch: branch,
      cash_cutoff: cash_cutoff,
      cash_cutoff_type: cash_cutoff_type,
      category: category,
      client: client,
      pos: pos,
      product: product,
      sale: sale,
      sale_product: sale_product,
      supplier: supplier,
      user: user,
      user_role: user_role,
      user_role_permission: user_role_permission
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
