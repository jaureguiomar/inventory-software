interface Supplier {
   id: number;
   is_active: number;
   created: Date;
   updated: Date;
   name: string;
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

// Window response
interface WindowResponse {
   id: number;
   data: Supplier|null;
   result: string;
   type: string;
}

export {
   Supplier,
   SupplierResponse,
   WindowResponse
};