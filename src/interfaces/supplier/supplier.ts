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
interface WindowResponseData {
   data: Supplier|null;
   message: string;
   ok: boolean;
}
interface WindowResponse {
   id: number;
   data: WindowResponseData;
   result: string;
   type: string;
}

export {
   Supplier,
   SupplierResponse,
   WindowResponse
};