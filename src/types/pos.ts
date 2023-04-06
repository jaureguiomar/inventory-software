import { InputFieldString } from "@/types/general";
import { Branch } from "@/types/branch";

// Main
interface MainPos {
   id: number;
   is_active: number;
   name: string;
   machine_id: string;
   mac_address: string;
   id_branch: number;
   branch: Branch|null;
}
interface Pos extends MainPos {
   created: string;
   updated: string;
}
interface PosMySQL extends MainPos {
   is_sync: number;
   sync_type: "add"|"update"|"delete";
   created: Date;
   updated: Date;
}

// Props
interface PosField {
   name: InputFieldString;
   machine_id: InputFieldString;
   mac_address: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: Pos;
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
   data?: Pos;
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
   data: Pos|null;
   result: string;
   type: string;
}

// Axios response
// interface ResponseOk {
//    data: Pos;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface PosResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface PosResponse {
   data: Pos;
}
interface PosOneResponse {
   data: Pos;
   // error: ResponseError;
}
interface PossResponse {
   data: Array<Pos>;
   // error: ResponseError;
}

export {
   Pos,
   PosMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   PosResponse,
   PosOneResponse,
   PossResponse,
   WindowResponse,
   Page,
   PosField
};
