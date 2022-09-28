interface Product {
   code: string;
   name: string;
   description: string;
   buy_price: string;
   sale_price: string;
   quantity: number;
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
   data?: Product;
}

// Props
interface InputErrorField {
   is_error: boolean;
   message: string;
}
interface InputFieldString {
   text: string;
   max_text: number;
   error: InputErrorField;
}
interface InputFieldNumber {
   text: string;
   max_text: number;
   error: InputErrorField;
}
interface ProductField {
   code: InputFieldString;
   name: InputFieldString;
   description: InputFieldString;
   buy_price: InputFieldString;
   sale_price: InputFieldString;
   quantity: InputFieldNumber;
   category_id: InputFieldNumber;
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
interface ProductResponse {
   data: Product;
   error: Error;
}

export {
   Page,
   ProductField,
   IPCParams,
   Product,
   ProductResponse
};