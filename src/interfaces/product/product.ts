import { Category } from "@/interfaces/category/category";

interface Product {
   id: number;
   is_active: number;
   created: Date;
   updated: Date;
   code: string;
   name: string;
   description: string|null;
   buy_price: string;
   sale_price: string;
   quantity: number;
   category: Category
   category_id: number;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface ProductResponse {
   data: Array<Product>;
   error: Error;
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

export {
   Product,
   ProductResponse,
   WindowResponse
};
