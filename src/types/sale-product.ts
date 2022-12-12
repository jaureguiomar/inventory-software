import { InputFieldNumber } from '@/types/general';
import { Branch } from "@/types/branch";
import { User } from "@/types/user";
import { Pos } from "@/types/pos";
import { Sale } from "@/types/sale";
import { MainProductM2M, Product } from "@/types/product";

// Main
interface MainSaleProduct {
   id: number;
   is_active: number;
   quantity: number;
   id_sale: number;
   id_product: number;
   id_user: number;
   id_pos: number;
   id_branch: number;
   sale: Sale|null;
   product: Product|null;
   user: User|null;
   pos: Pos|null;
   branch: Branch|null;
}
interface SaleProduct extends MainSaleProduct {
   created: string;
   updated: string;
}
interface SaleProductMySQL extends MainSaleProduct {
   is_sync: number;
   sync_type: "add"|"update"|"delete";
   created: Date;
   updated: Date;
}
interface SaleProductM2M extends Sale {
   product: Array<MainProductM2M>;
}

// Props
interface SaleProductField {
   id_sale: InputFieldNumber;
   id_product: InputFieldNumber;
   quantity: InputFieldNumber;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: SaleProduct;
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
   data?: SaleProduct;
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
   data: SaleProduct|null;
   result: string;
   type: string;
}

// Axios response
interface ResponseOk {
   data: SaleProduct;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface SaleProductResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface SaleProductOneResponse {
   data: SaleProduct;
   error: ResponseError;
}
interface SaleProductsResponse {
   data: Array<SaleProduct>;
   error: ResponseError;
}
interface SaleProductsM2MResponse {
   data: Array<SaleProductM2M>;
   error: ResponseError;
}

export {
   SaleProduct,
   SaleProductM2M,
   SaleProductMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   SaleProductResponse,
   SaleProductOneResponse,
   SaleProductsResponse,
   SaleProductsM2MResponse,
   WindowResponse,
   Page,
   SaleProductField
};
