import { InputFieldString } from "@/interfaces/general";

// Main
interface Supplier {
   id: number;
   is_active: number;
   created: string;
   updated: string;
   name: string;
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
interface WindowResponseData {
   data: Supplier|null;
   message: string;
   ok: boolean;
}
interface WindowResponse {
   id: number;
   data: WindowResponseData;
   result: string;
   type: string;
}

// Axios response
interface ResponseOk {
   data: Supplier;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface SupplierResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface SuppliersResponse {
   data: Array<Supplier>;
   error: ResponseError;
}

export {
   Supplier,
   Content,
   IPCParams,
   IPCParamsContent,
   SupplierResponse,
   SuppliersResponse,
   WindowResponse,
   Page,
   SupplierField
};
