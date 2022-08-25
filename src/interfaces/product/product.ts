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
   description: string|null;
   buy_price: string;
   sale_price: string;
   quantity: number;
}
interface ProductResponse {
   data: Array<Product>;
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

// Props
interface PropsData {
   product: Array<Product>;
   new_product: Array<Product>;
}
interface Props {
   data: PropsData;
   table: any;
}

// Window response
interface WindowResponse {
   id: number;
   data: Product|null;
   result: string;
   type: string;
}

export {
   Props,
   AxiosResponse,
   WindowResponse,
   Product
};
