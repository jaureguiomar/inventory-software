// IPC params
interface Content {
   title: string;
   description: string;
}
interface Category {
   name: string;
}
interface IPCParams {
   id: number;
   type: string;
   content: Content;
   data?: Category;
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
interface CategoryProps {
   name: InputFields;
}
interface Props {
   id: number;
   type: string;
   content: Content;
   data: CategoryProps;
   loaded: boolean;
}

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
interface CategorySubResponse {
   data: Category;
   message: string;
   ok: boolean;
}
interface CategoryResponse {
   data: CategorySubResponse;
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

export {
   Props,
   IPCParams,
   AxiosResponse,
   Category
};