import { InputFieldString } from "@/interfaces/general";
import { Branch } from "@/interfaces/branch/branch";
import { User } from "@/interfaces/user/user";
import { Pos } from "@/interfaces/pos/pos";
import { CashCutoff } from "@/interfaces/cash-cutoff/cash-cutoff";

// Main
interface MainSale {
   id: number;
   is_active: number;
   total: string;
   is_supplier: number;
   id_cash_cutoff: number;
   id_user: number;
   id_pos: number;
   id_branch: number;
   cash_cutoff: CashCutoff|null;
   user: User|null;
   pos: Pos|null;
   branch: Branch|null;
}
interface Sale extends MainSale {
   created: string;
   updated: string;
}
interface SaleMySQL extends MainSale {
   is_sync: number;
   sync_type: "add"|"update"|"delete";
   created: Date;
   updated: Date;
}

// Props
interface SaleField {
   total: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: Sale;
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
   data?: Sale;
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
   data: Sale|null;
   result: string;
   type: string;
}

// Axios response
interface ResponseOk {
   data: Sale;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface SaleResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface SaleOneResponse {
   data: Sale;
   error: ResponseError;
}
interface SalesResponse {
   data: Array<Sale>;
   error: ResponseError;
}

export {
   Sale,
   SaleMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   SaleResponse,
   SaleOneResponse,
   SalesResponse,
   WindowResponse,
   Page,
   SaleField
};
