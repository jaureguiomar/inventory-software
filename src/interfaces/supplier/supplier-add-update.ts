// IPC params
interface Content {
   title: string;
   description: string;
}
interface Supplier {
   name: string;
}
interface IPCParams {
   id: number;
   type: string;
   content: Content;
   data?: Supplier;
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
interface SupplierProps {
   name: InputFields;
}
interface Props {
   id: number;
   type: string;
   content: Content;
   data: SupplierProps;
   loaded: boolean;
}

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
interface SupplierSubResponse {
   data: Supplier;
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
   AxiosResponse,
   Supplier
};