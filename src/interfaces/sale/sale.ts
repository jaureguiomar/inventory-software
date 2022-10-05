import { InputFieldString } from "@/interfaces/general";

// Main
interface Sale {
   id: number;
   is_active: number;
   created: string;
   updated: string;
   total: string;
   id_branch: number;
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
