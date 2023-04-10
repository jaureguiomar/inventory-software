import { InputFieldString } from "@/types/general";
import { Branch } from "@/types/branch";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { CashCutoff } from "@/types/cash-cutoff";
import { ProductM2M } from "@/types/product";

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
interface SaleM2M extends MainSale {
   created: string;
   updated: string;
   products: ProductM2M[];
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
interface IPCParamsM2M {
   id: number;
   type: string;
   data: SaleM2M;
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
interface WindowResponseM2M {
   id: number;
   data: SaleM2M|null;
   result: string;
   type: string;
}

// Axios response
// interface ResponseOk {
//    data: Sale;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface SaleResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface SaleResponse {
   data: Sale;
}
interface SaleOneResponse {
   data: Sale;
   // error: ResponseError;
}
interface SalesResponse {
   data: Array<Sale>;
   // error: ResponseError;
}
interface SalesM2MResponse {
   data: Array<SaleM2M>;
   // error: ResponseError;
}

export {
   Sale,
   SaleM2M,
   SaleMySQL,
   Content,
   IPCParams,
   IPCParamsM2M,
   IPCParamsContent,
   SaleResponse,
   SaleOneResponse,
   SalesResponse,
   SalesM2MResponse,
   WindowResponse,
   WindowResponseM2M,
   Page,
   SaleField
};
