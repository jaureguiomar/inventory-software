interface Category {
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
interface CategoryResponse {
   data: Array<Category>;
   error: Error;
}

// Window response
interface WindowResponse {
   id: number;
   data: Category|null;
   result: string;
   type: string;
}

export {
   Category,
   CategoryResponse,
   WindowResponse
};