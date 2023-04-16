import { InputFieldString } from "@/types/general";

// Main
interface MainCashCutoffType {
   id: number;
   is_active: number;
   name: string;
}
interface CashCutoffType extends MainCashCutoffType {
   created: string;
   updated: string;
}
interface CashCutoffTypeMySQL extends MainCashCutoffType {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
   created: Date;
   updated: Date;
}

// Props
interface CashCutoffTypeField {
   name: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: CashCutoffType;
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
   data?: CashCutoffType;
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
   data: CashCutoffType|null;
   result: string;
   type: string;
}

// Axios response
// interface ResponseOk {
//    data: CashCutoffType;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface CashCutoffTypeResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface CashCutoffTypeResponse {
   data: CashCutoffType;
}
interface CashCutoffTypeOneResponse {
   data: CashCutoffType;
   // error: ResponseError;
}
interface CashCutoffTypesResponse {
   data: Array<CashCutoffType>;
   // error: ResponseError;
}

export {
   CashCutoffType,
   CashCutoffTypeMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   CashCutoffTypeResponse,
   CashCutoffTypeOneResponse,
   CashCutoffTypesResponse,
   WindowResponse,
   Page,
   CashCutoffTypeField,
};
