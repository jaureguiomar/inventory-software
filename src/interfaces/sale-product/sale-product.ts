import { InputFieldNumber } from '@/interfaces/general';
import { Branch } from "@/interfaces/branch/branch";
import { User } from "@/interfaces/user/user";
import { Pos } from "@/interfaces/pos/pos";
import { Sale } from "@/interfaces/sale/sale";
import { Product } from "@/interfaces/product/product";

// Main
interface SaleProduct {
   id: number;
   is_active: number;
   created: string;
   updated: string;
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

export {
   SaleProduct,
   Content,
   IPCParams,
   IPCParamsContent,
   SaleProductResponse,
   SaleProductOneResponse,
   SaleProductsResponse,
   WindowResponse,
   Page,
   SaleProductField
};
