import { Connection } from "mysql";

export const delete_table = async(connection:Connection, data:string) => {
   const promise_delete_client = new Promise<boolean>((resolve) => {
      const query = `delete from ${ data }`;
      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_delete_client;
};

export const reset_auto_increment = async(connection:Connection, data:string) => {
   const promise_delete_client = new Promise<boolean>((resolve) => {
      const query = `alter table ${ data } auto_increment = 1`;
      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_delete_client;
};

export const update_sync_unsync_data = async(connection:Connection, data:string) => {
   const promise_delete_client = new Promise<boolean>((resolve) => {
      const query = `update ${ data } set is_sync = 1, sync_type = null`;
      connection.query(query, function(error) {
         let is_ok = true;
         if(error)
            is_ok = false;
         resolve(is_ok);
      });
   });
   return await promise_delete_client;
};
