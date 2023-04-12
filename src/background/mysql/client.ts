import { Connection, MysqlError, OkPacket } from "mysql";
import { parseDate } from "@/background/mysql/functions";
import { Client, ClientMySQL } from "@/types/client";
import { MySQLDelete } from "@/types/general";

export const get_clients = async(connection:Connection) => {
   const promise_get_categories = new Promise<Array<Client>>((resolve) => {
      const query = "select * from client where is_active = 1";
      connection.query(query, function(error:MysqlError, rows:Array<ClientMySQL>) {
         const data:Array<Client> = [];
         if(!error) {
            for(let i = 0; i < rows.length; i++) {
               data.push({
                  id: Number(rows[i].id),
                  is_active: rows[i].is_active,
                  created: parseDate(rows[i].created),
                  updated: parseDate(rows[i].updated),
                  first_name: rows[i].first_name,
                  last_name: rows[i].last_name,
                  address: rows[i].address,
                  cellphone: rows[i].cellphone,
                  cellphone2: rows[i].cellphone2,
                  email: rows[i].email,
                  id_user: Number(rows[i].id_user),
                  id_pos: Number(rows[i].id_pos),
                  id_branch: Number(rows[i].id_branch),
                  user: null,
                  pos: null,
                  branch: null
               });
            }
         }
         resolve(data);
      });
   });
   return await promise_get_categories;
}

export const get_client_by_id = async(connection:Connection, id:number) => {
   const promise_get_client_by_id = new Promise<Client>((resolve) => {
      const query = "select * from client where is_active = 1 and id = " + id;
      connection.query(query, function(error:MysqlError, rows:Array<ClientMySQL>) {
         let result_client:Client = {
            id: -1,
            is_active: -1,
            created: "",
            updated: "",
            first_name: "",
            last_name: "",
            address: "",
            cellphone: "",
            cellphone2: "",
            email: "",
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               result_client = {
                  ...curr_row,
                  created: parseDate(curr_row.created),
                  updated: parseDate(curr_row.updated)
               };
            }
         }
         resolve(result_client);
      });
   });
   return await promise_get_client_by_id;
};

export const get_client_mysql_by_id = async(connection:Connection, id:number) => {
   const promise_get_client_mysql_by_id = new Promise<ClientMySQL>((resolve) => {
      const query = "select * from client where is_active = 1 and id = " + id;
      connection.query(query, function(error:MysqlError, rows:Array<ClientMySQL>) {
         let result_client:ClientMySQL = {
            id: -1,
            is_active: -1,
            is_sync: -1,
            sync_type: null,
            created: new Date(),
            updated: new Date(),
            first_name: "",
            last_name: "",
            address: "",
            cellphone: "",
            cellphone2: "",
            email: "",
            id_user: -1,
            id_pos: -1,
            id_branch: -1,
            user: null,
            pos: null,
            branch: null
         };

         if(!error) {
            if(rows.length > 0) {
               const curr_row = rows[0];
               result_client = { ...curr_row };
            }
         }
         resolve(result_client);
      });
   });
   return await promise_get_client_mysql_by_id;
};

export const insert_client = async(connection:Connection, data:Client) => {
   const promise_insert_client = new Promise<number>((resolve) => {
      let query = "";
      query += "insert into client set ";
      query += "is_sync = 0, ";
      query += "sync_type = 'add', ";
      query += "first_name = '" + data.first_name + "', ";
      query += "last_name = '" + data.last_name + "', ";
      query += "address = '" + data.address + "', ";
      query += "cellphone = '" + data.cellphone + "', ";
      query += "cellphone2 = '" + data.cellphone2 + "', ";
      query += "email = '" + data.email + "', ";
      query += "id_user = " + data.id_user + ", ";
      query += "id_pos = " + data.id_pos + ", ";
      query += "id_branch = " + data.id_branch;

      connection.query(query, function(error:MysqlError, result:OkPacket) {
         let new_id:number = -1;
         if(!error)
            new_id = result.insertId;
         resolve(new_id);
      });
   });
   return await promise_insert_client;
};

export const update_client = async(connection:Connection, data:ClientMySQL) => {
   const promise_update_client = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update client set ";
      query += "is_sync = " + data.is_sync + ", ";
      query += "sync_type = '" + data.sync_type + "', ";
      query += "first_name = '" + data.first_name + "', ";
      query += "last_name = '" + data.last_name + "', ";
      query += "address = '" + data.address + "', ";
      query += "cellphone = '" + data.cellphone + "', ";
      query += "cellphone2 = '" + data.cellphone2 + "', ";
      query += "email = '" + data.email + "', ";
      query += "id_user = " + data.id_user + ", ";
      query += "id_pos = " + data.id_pos + ", ";
      query += "id_branch = " + data.id_branch + " ";
      query += "where id = " + data.id;

      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_update_client;
};

export const delete_client = async(connection:Connection, data:MySQLDelete) => {
   const promise_delete_client = new Promise<boolean>((resolve) => {
      let query = "";
      query += "update client set ";
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
   return await promise_delete_client;
};
