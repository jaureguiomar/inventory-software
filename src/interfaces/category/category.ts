// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface Category {
   id: number;
   is_active: number;
   created: Date;
   updated: Date;
   name: string;
}
interface CategoryResponse {
   data: Array<Category>;
   error: Error;
}
interface AxiosResponse {
   data: CategoryResponse;
   config: any;
   headers: any;
   request: any;
   status: number;
   statusText: string;
}

// Props
interface PropsData {
   category: Array<Category>;
   new_category: Array<Category>;
}
interface Props {
   data: PropsData;
   table: any;
}

// Window response
interface WindowResponse {
   id: number;
   data: Category|null;
   result: string;
   type: string;
}

export {
   Props,
   AxiosResponse,
   WindowResponse,
   Category
};
