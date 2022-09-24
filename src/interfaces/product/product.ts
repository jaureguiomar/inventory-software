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
interface WindowResponse {
   id: number;
   data: Product|null;
   result: string;
   type: string;
}

export {
   Product,
   ProductResponse,
   WindowResponse
};
