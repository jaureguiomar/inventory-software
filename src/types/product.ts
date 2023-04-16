import { InputFieldString, InputFieldNumber, InputFieldBoolean } from "@/types/general";
import { Category, CategoryQuery } from "@/types/category";
import { Branch } from "@/types/branch";
import { User, UserQuery } from "@/types/user";
import { Pos, PosQuery } from "@/types/pos";
import { SaleProduct } from "@/types/sale-product";
import { SaleQuery } from "./sale";

// Main
interface MainProduct {
   id: number;
   is_active: number;
   is_favorite: number;
   code: string;
   name: string;
   description: string|null;
   buy_price: number;
   sale_price: number;
   quantity: number;
   id_category: number;
   id_user: number;
   id_pos: number;
   id_branch: number;
   category: Category|null;
   user: User|null;
   pos: Pos|null;
   branch: Branch|null;
}
interface Product extends MainProduct {
   created: string;
   updated: string;
}
interface ProductM2M extends MainProduct {
   created: string;
   updated: string;
   sale_product: SaleProduct;
}
interface ProductMySQL extends MainProduct {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
   created: Date;
   updated: Date;
}
interface ProductQuery {
   category: CategoryQuery|boolean;
   user: UserQuery|boolean;
   pos: PosQuery|boolean;
   branch: boolean;
}
interface ProductM2MQuery {
   category: CategoryQuery|boolean;
   user: UserQuery|boolean;
   pos: PosQuery|boolean;
   branch: boolean;
   sale_product: {
      sale: SaleQuery|boolean;
      product: ProductQuery|boolean;
      user: UserQuery|boolean;
      pos: PosQuery|boolean;
      branch: boolean;
   }
}

// Props
interface ProductField {
   is_favorite: InputFieldBoolean;
   code: InputFieldString;
   name: InputFieldString;
   description: InputFieldString;
   buy_price: InputFieldString;
   sale_price: InputFieldString;
   quantity: InputFieldNumber;
   id_category: InputFieldNumber;
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
interface WindowResponse {
   id: number;
   data: Product|null;
   result: string;
   type: string;
}

// Axios response
// interface ResponseOk {
//    data: Product;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface ProductResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface ProductResponse {
   data: Product;
}
interface ProductOneResponse {
   data: Product;
   // error: ResponseError;
}
interface ProductsResponse {
   data: Array<Product>;
   // error: ResponseError;
}

export {
   Product,
   ProductM2M,
   ProductMySQL,
   ProductQuery,
   ProductM2MQuery,
   Content,
   IPCParams,
   IPCParamsContent,
   ProductResponse,
   ProductOneResponse,
   ProductsResponse,
   WindowResponse,
   Page,
   ProductField
};
