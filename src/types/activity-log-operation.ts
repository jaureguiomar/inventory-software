import { InputFieldString } from "@/types/general";

// Main
interface MainActivityLogOperation {
   id: number;
   is_active: number;
   name: string;
}
interface ActivityLogOperation extends MainActivityLogOperation {
   created: string;
   updated: string;
}
interface ActivityLogOperationMySQL extends MainActivityLogOperation {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
   created: Date;
   updated: Date;
}

// Props
interface ActivityLogOperationField {
   name: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: ActivityLogOperation;
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
   data?: ActivityLogOperation;
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
   data: ActivityLogOperation|null;
   result: string;
   type: string;
}

// Axios response
// interface ResponseOk {
//    data: ActivityLogOperation;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface ActivityLogOperationResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface ActivityLogOperationResponse {
   data: ActivityLogOperation;
}
interface ActivityLogOperationOneResponse {
   data: ActivityLogOperation;
   // error: ResponseError;
}
interface ActivityLogOperationsResponse {
   data: Array<ActivityLogOperation>;
   // error: ResponseError;
}

export {
   ActivityLogOperation,
   ActivityLogOperationMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   ActivityLogOperationResponse,
   ActivityLogOperationOneResponse,
   ActivityLogOperationsResponse,
   WindowResponse,
   Page,
   ActivityLogOperationField
};
