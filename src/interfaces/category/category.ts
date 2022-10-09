import { InputFieldString } from "@/interfaces/general";
import { Branch } from "@/interfaces/branch/branch";
import { User } from "@/interfaces/user/user";
import { Pos } from "@/interfaces/pos/pos";

// Main
interface MainCategory {
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
interface Category extends MainCategory {
   created: string;
   updated: string;
}
interface CategoryMySQL extends MainCategory {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
   created: Date;
   updated: Date;
}
interface CategoryMySQLDelete { // Make it as global interface? (MySQLDelete)
   id: number;
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
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
interface WindowResponse {
   id: number;
   data: Category|null;
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
interface CategoryOneResponse {
   data: Category;
   error: ResponseError;
}
interface CategoriesResponse {
   data: Array<Category>;
   error: ResponseError;
}

export {
   Category,
   CategoryMySQL,
   CategoryMySQLDelete,
   Content,
   IPCParams,
   IPCParamsContent,
   CategoryResponse,
   CategoryOneResponse,
   CategoriesResponse,
   WindowResponse,
   Page,
   CategoryField
};
