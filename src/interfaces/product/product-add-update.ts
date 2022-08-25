// IPC params
interface Content {
   title: string;
   description: string;
}
interface Product {
   code: string;
   name: string;
   description: string;
   buy_price: string;
   sale_price: string;
   quantity: string;
}
interface IPCParams {
   id: number;
   type: string;
   content: Content;
   data?: Product;
}

// Props
interface InputErrorField {
   is_error: boolean;
   message: string;
}
interface InputFields {
   text: string;
   max_text: number;
   error: InputErrorField;
}
interface ProductProps {
   code: InputFields;
   name: InputFields;
   description: InputFields;
   buy_price: InputFields;
   sale_price: InputFields;
   quantity: InputFields;
}
interface Props {
   id: number;
   type: string;
   content: Content;
   data: ProductProps;
   loaded: boolean;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface Product {
   id: number;
   is_active: number;
   created: Date;
   updated: Date;
   code: string;
   name: string;
   description: string;
   bbuy_price: string;
   sale_price: string;
   quantity: string;
}
interface ProductSubResponse {
   data: Product;
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
   AxiosResponse,
   Product
};