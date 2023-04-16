import { InputFieldNumber } from "@/types/general";
import { Sale, SaleQuery } from "@/types/sale";
import { ProductM2M, Product, ProductQuery } from "@/types/product";

// Main
interface MainSaleProduct {
   id: number;
   is_active: number;
   quantity: number;
   id_sale: number;
   id_product: number;
   sale: Sale|null;
   product: Product|null;
}
interface SaleProduct extends MainSaleProduct {
   created: string;
   updated: string;
}
interface SaleProductM2M extends Sale {
   product: Array<ProductM2M>;
}
interface SaleProductMySQL extends MainSaleProduct {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
   created: Date;
   updated: Date;
}
interface SaleProductQuery {
   sale: SaleQuery|boolean;
   product: ProductQuery|boolean;
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
// interface ResponseOk {
//    data: SaleProduct;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface SaleProductResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
interface SaleProductResponse {
   data: SaleProduct;
}
interface SaleProductOneResponse {
   data: SaleProduct;
   // error: ResponseError;
}
interface SaleProductsResponse {
   data: Array<SaleProduct>;
   // error: ResponseError;
}
interface SaleProductM2MResponse {
   data: SaleProductM2M;
   // error: ResponseError;
}
interface SaleProductsM2MResponse {
   data: Array<SaleProductM2M>;
   // error: ResponseError;
}

export {
   SaleProduct,
   SaleProductM2M,
   SaleProductMySQL,
   SaleProductQuery,
   Content,
   IPCParams,
   IPCParamsContent,
   SaleProductResponse,
   SaleProductOneResponse,
   SaleProductsResponse,
   SaleProductM2MResponse,
   SaleProductsM2MResponse,
   WindowResponse,
   Page,
   SaleProductField
};
