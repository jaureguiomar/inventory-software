import { InputFieldString } from "@/types/general";
import { Branch } from "@/types/branch";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";

// Main
interface MainSupplier {
   id: number;
   is_active: number;
   name: string;
   id_user: number;
   id_pos: number;
   id_branch: number;
   user: User|null;
   pos: Pos|null;
   branch: Branch|null;
}
interface Supplier extends MainSupplier {
   created: string;
   updated: string;
}
interface SupplierMySQL extends MainSupplier {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
   created: Date;
   updated: Date;
}

// Props
interface SupplierField {
   name: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: Supplier;
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
   data?: Supplier;
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
   data: Supplier|null;
   result: string;
   type: string;
}

// Axios response
// interface ResponseOk {
//    data: Supplier;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface SupplierResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface SupplierResponse {
   data: Supplier;
}
interface SupplierOneResponse {
   data: Supplier;
   // error: ResponseError;
}
interface SuppliersResponse {
   data: Array<Supplier>;
   // error: ResponseError;
}

export {
   Supplier,
   SupplierMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   SupplierResponse,
   SupplierOneResponse,
   SuppliersResponse,
   WindowResponse,
   Page,
   SupplierField
};
