interface Supplier {
   id: number;
   name: string;
}

// IPC params
interface IPCParams {
   id: number;
   type: string;
   data: Supplier;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface SupplierResponse {
   data: Array<Supplier>;
   error: Error;
}

export {
   Supplier,
   SupplierResponse,
   IPCParams
};