import { InputFieldString } from "@/interfaces/general";

// Main
interface Category {
   id: number;
   is_active: number;
   created: string;
   updated: string;
   name: string;
}

// Props
interface CategoryField {
   name: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: Category;
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
   data?: Category;
}

// Page
interface Page {
   id: number;
   type: string;
   content: Content;
}

// Window response
interface WindowResponseData {
   data: Category|null;
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
   data: Category;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface CategoryResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface CategoriesResponse {
   data: Array<Category>;
   error: ResponseError;
}

export {
   Category,
   Content,
   IPCParams,
   IPCParamsContent,
   CategoryResponse,
   CategoriesResponse,
   WindowResponse,
   Page,
   CategoryField
};
