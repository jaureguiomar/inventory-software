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
