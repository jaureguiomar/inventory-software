import { InputFieldString, InputFieldNumber } from "@/types/general";
import { CashCutoffType } from "@/types/cash-cutoff-type";
import { User, UserQuery } from "@/types/user";
import { Branch } from "@/types/branch";
import { Pos, PosQuery } from "@/types/pos";

// Main
interface MainCashCutoff {
   id: number;
   is_active: number;
   amount_open: number;
   amount_sale: number;
   amount_supplier: number;
   amount_close: number;
   date_close: string;
   id_type: number;
   id_user_open: number;
   id_user_close: number|null;
   id_pos: number;
   id_branch: number;
   type: CashCutoffType|null;
   user_open: User|null;
   user_close: User|null;
   pos: Pos|null;
   branch: Branch|null;
}
interface CashCutoff extends MainCashCutoff {
   created: string;
   updated: string;
}
interface CashCutoffMySQL extends MainCashCutoff {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
   created: Date;
   updated: Date;
}
interface CashCutoffQuery {
   type: boolean;
   user_open: UserQuery|boolean;
   user_close: UserQuery|boolean;
   pos: PosQuery|boolean;
   branch: boolean;
}

// Props
interface CashCutoffField {
   amount_open: InputFieldString;
   amount_sale: InputFieldString;
   amount_supplier: InputFieldString;
   amount_close: InputFieldString;
   date_close: InputFieldString;
   id_type: InputFieldNumber;
   id_user_open: InputFieldNumber;
   id_user_close: InputFieldNumber|null;
   id_pos: InputFieldNumber;
   id_branch: InputFieldNumber;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: CashCutoff;
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
   data?: CashCutoff;
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
   data: CashCutoff|null;
   result: string;
   type: string;
}

// Axios response
// interface ResponseOk {
//    data: CashCutoff;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface CashCutoffResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface CashCutoffResponse {
   data: CashCutoff;
}
interface CashCutoffOneResponse {
   data: CashCutoff;
   // error: ResponseError;
}
interface CashCutoffsResponse {
   data: Array<CashCutoff>;
   // error: ResponseError;
}

export {
   CashCutoff,
   CashCutoffMySQL,
   CashCutoffQuery,
   Content,
   IPCParams,
   IPCParamsContent,
   CashCutoffResponse,
   CashCutoffOneResponse,
   CashCutoffsResponse,
   WindowResponse,
   Page,
   CashCutoffField,
};
