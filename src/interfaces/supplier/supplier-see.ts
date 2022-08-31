// IPC params
interface Supplier {
   name: string;
}
interface IPCParams {
   id: number;
   type: string;
   data: Supplier;
}

// Props
interface Props {
   id: number;
   name: string;
   loaded: boolean;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface SupplierSubResponse {
   message: string;
   ok: boolean;
}
interface SupplierResponse {
   data: SupplierSubResponse;
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

export {
   Props,
   IPCParams,
   AxiosResponse
};