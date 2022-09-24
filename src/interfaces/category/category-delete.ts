interface Category {
   id: number;
   name: string;
}

// IPC params
interface IPCParams {
   id: number;
   type: string;
   data: Category;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface CategoryResponse {
   data: Array<Category>;
   error: Error;
}

export {
   Category,
   CategoryResponse,
   IPCParams
};