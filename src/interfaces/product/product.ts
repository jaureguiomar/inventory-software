import { Category } from "@/interfaces/category/category";
import { InputFieldNumber, InputFieldString } from "@/interfaces/general";

// Main
interface Product {
   id: number;
   is_active: number;
   created: string;
   updated: string;
   code: string;
   name: string;
   description: string|null;
   buy_price: string;
   sale_price: string;
   quantity: number;
   category: Category;
   category_id: number;
}

// Props
interface ProductField {
   code: InputFieldString;
   name: InputFieldString;
   description: InputFieldString;
   buy_price: InputFieldString;
   sale_price: InputFieldString;
   quantity: InputFieldNumber;
   category_id: InputFieldNumber;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: Product;
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
   data?: Product;
}

// Page
interface Page {
   id: number;
   type: string;
   content: Content;
}

// Window response
interface WindowResponseData {
   data: Product|null;
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
   data: Product;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface ProductResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface ProductsResponse {
   data: Array<Product>;
   error: ResponseError;
}

export {
   Product,
   Content,
   IPCParams,
   IPCParamsContent,
   ProductResponse,
   ProductsResponse,
   WindowResponse,
   Page,
   ProductField
};
