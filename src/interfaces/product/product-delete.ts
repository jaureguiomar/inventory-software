interface Product {
   id: number;
   code: string;
   name: string;
   description: string;
   buy_price: string;
   sale_price: string;
   quantity: number;
}

// IPC params
interface IPCParams {
   id: number;
   type: string;
   data: Product;
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

export {
   Product,
   ProductResponse,
   IPCParams
};