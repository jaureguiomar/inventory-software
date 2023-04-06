import { InputFieldString } from "@/types/general";
import { User } from "@/types/user";
import { ActivityLogAccess } from "@/types/activity-log-access";
import { ActivityLogOperation } from "@/types/activity-log-operation";

// Main
interface MainActivityLog {
   id: number;
   is_active: number;
   name: string;
   extra_data: string;
   id_operation: number;
   id_access: number;
   id_user: number;
   operation: ActivityLogOperation|null;
   access: ActivityLogAccess|null;
   user: User|null;
}
interface ActivityLog extends MainActivityLog {
   created: string;
   updated: string;
}
interface ActivityLogMySQL extends MainActivityLog {
   is_sync: number;
   sync_type: "add"|"update"|"delete";
   created: Date;
   updated: Date;
}

// Other
interface ActivityLogInsert {
   name: string;
   extra_data: string;
   id_operation: number;
   id_access: number;
   id_user: number;
   server: string;
   access_token: string;
}
// Props
interface ActivityLogField {
   name: InputFieldString;
   extra_data: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: ActivityLog;
}

// IPCParams Content
interface Content {
   title: string;
   description: string;
}
interface IPCParamsContent {
   id: number;
   type: string;
   content: Content;
   data?: ActivityLog;
}

// Page
interface Page {
   id: number;
   type: string;
   content: Content;
}

// Window response
interface WindowResponse {
   id: number;
   data: ActivityLog|null;
   result: string;
   type: string;
}

// Axios response
interface ResponseOk {
   data: ActivityLog;
   ok: boolean;
   message: string;
}
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface ActivityLogResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface ActivityLogResponse {
   data: ActivityLog;
}
interface ActivityLogOneResponse {
   data: ActivityLog;
   // error: ResponseError;
}
interface ActivityLogsResponse {
   data: Array<ActivityLog>;
   // error: ResponseError;
}

export {
   ActivityLog,
   ActivityLogMySQL,
   ActivityLogInsert,
   Content,
   IPCParams,
   IPCParamsContent,
   ActivityLogResponse,
   ActivityLogOneResponse,
   ActivityLogsResponse,
   WindowResponse,
   Page,
   ActivityLogField
};
