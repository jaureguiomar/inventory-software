// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface Supplier {
   id: number;
   is_active: number;
   created: Date;
   updated: Date;
   name: string;
}
interface SupplierResponse {
   data: Array<Supplier>;
   error: Error;
}
interface AxiosResponse {
   data: SupplierResponse;
   config: any;
   headers: any;
   request: any;
   status: number;
   statusText: string;
}

// Props
interface PropsData {
   supplier: Array<Supplier>;
   new_supplier: Array<Supplier>;
}
interface Props {
   data: PropsData;
   table: any;
}

// Window response
interface WindowResponse {
   id: number;
   data: Supplier|null;
   result: string;
   type: string;
}

export {
   Props,
   AxiosResponse,
   WindowResponse,
   Supplier
};
