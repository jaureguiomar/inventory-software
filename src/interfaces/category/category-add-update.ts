interface Category {
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
interface CategoryField {
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
interface CategoryResponse {
   data: Category;
   error: Error;
}

export {
   Page,
   CategoryField,
   IPCParams,
   Category,
   CategoryResponse
};