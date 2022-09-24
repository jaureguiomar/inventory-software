interface Supplier {
   name: string;
}

// IPC params
interface Content {
   title: string;
   description: string;
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
interface SupplierField {
   name: InputFields;
}

// Page
interface Page {
   id: number;
   type: string;
   content: Content;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface SupplierResponse {
   data: Supplier;
   error: Error;
}

export {
   Page,
   SupplierField,
   IPCParams,
   Supplier,
   SupplierResponse
};