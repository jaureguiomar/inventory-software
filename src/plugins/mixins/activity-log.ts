import axios from "axios";
import { ActivityLogInsert, ActivityLogResponse } from "@/types/activity-log";

export const create_activity_log = async(log_data:ActivityLogInsert) => {
   try {
      const response = await axios.put<ActivityLogResponse>(`${ log_data.server }/activity_log/v3/create.php`,
         {
            name: log_data.name,
            extra_data: log_data.extra_data,
            id_operation: log_data.id_operation,
            id_access: log_data.id_access,
            id_user: log_data.id_user
         },
         {
            headers: {
               "Authorization": `Bearer ${ log_data.access_token }`
            }
         }
      );
      if(response) {
         if(response.data.error.is_error)
            console.log("activity-log-create-error #1");
      } else {
         console.log("activity-log-create-error #2");
      }
   } catch (error) {
      console.log("activity-log-create-error #3", error);
   }
};

export const ACTIVITY_LOG_ACCESS = {
   LOGIN: 1,
   ACCESS: 2,
   SEE: 3,
   ADD: 4,
   UPDATE: 5,
   DELETE: 6
};

export const ACTIVITY_LOG_OPERATION = {
   HOME: 1,
   SALE: 2,
   CLIENT_REPORT: 3,
   SUPPLIER_REPORT: 4,
   PRODUCT_REPORT: 5,
   CATEGORY_REPORT: 6,
   USER_REPORT: 7,
   USER_ROLE_REPORT: 8,
   SALE_REPORT: 9,
   // SUPPLIER_REPORT: 10,
   ACTIVITY_LOG_REPORT: 11,
   LOGIN: 12,
   LOGOUT: 13,
   CASH_CUTOFF: 14,
   SALE_PRODUCT_REPORT: 15
};
