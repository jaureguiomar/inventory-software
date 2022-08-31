// IPC params
interface Product {
   code: string;
   name: string;
   description: string;
   buy_price: string;
   sale_price: string;
   quantity: number;
}
interface IPCParams {
   id: number;
   type: string;
   data: Product;
}

// Props
interface Props {
   id: number;
   code: string;
   name: string;
   description: string;
   buy_price: string;
   sale_price: string;
   quantity: string;
   loaded: boolean;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface ProductSubResponse {
   message: string;
   ok: boolean;
}
interface ProductResponse {
   data: ProductSubResponse;
   error: Error;
}
interface AxiosResponse {
   data: ProductResponse;
   config: any;
   headers: any;
   request: any;
   status: number;
   statusText: string;
}

export {
   Props,
   IPCParams,
   AxiosResponse
};