import { InputFieldString } from "@/types/general";

// Main
interface MainActivityLogAccess {
   id: number;
   is_active: number;
   name: string;
}
interface ActivityLogAccess extends MainActivityLogAccess {
   created: string;
   updated: string;
}
interface ActivityLogAccessMySQL extends MainActivityLogAccess {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
   created: Date;
   updated: Date;
}

// Props
interface ActivityLogAccessField {
   name: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: ActivityLogAccess;
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
   data?: ActivityLogAccess;
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
   data: ActivityLogAccess|null;
   result: string;
   type: string;
}

// Axios response
// interface ResponseOk {
//    data: ActivityLogAccess;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface ActivityLogAccessResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface ActivityLogAccessResponse {
   data: ActivityLogAccess;
}
interface ActivityLogAccessOneResponse {
   data: ActivityLogAccess;
   // error: ResponseError;
}
interface ActivityLogAccessesResponse {
   data: Array<ActivityLogAccess>;
   // error: ResponseError;
}

export {
   ActivityLogAccess,
   ActivityLogAccessMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   ActivityLogAccessResponse,
   ActivityLogAccessOneResponse,
   ActivityLogAccessesResponse,
   WindowResponse,
   Page,
   ActivityLogAccessField
};
