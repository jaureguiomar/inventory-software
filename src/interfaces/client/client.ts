import { InputFieldString } from "@/interfaces/general";

// Main
interface Client {
   id: number;
   is_active: number;
   created: string;
   updated: string;
   first_name: string;
   last_name: string;
   address: string;
   cellphone: string;
   cellphone2: string|null;
   email: string;
}

// Props
interface ClientField {
   first_name: InputFieldString;
   last_name: InputFieldString;
   address: InputFieldString;
   cellphone: InputFieldString;
   cellphone2: InputFieldString;
   email: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: Client;
}

// IPCParams Content
interface Content {
   title: string;
   description: string;
}
interface IPCParamsContent {
   id: number;
   type: string;
   content: Content;
   data?: Client;
}

// Page
interface Page {
   id: number;
   type: string;
   content: Content;
}

// Window response
interface WindowResponse {
   id: number;
   data: Client|null;
   result: string;
   type: string;
}

// Axios response
interface ResponseOk {
   data: Client;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface ClientResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface ClientsResponse {
   data: Array<Client>;
   error: ResponseError;
}

export {
   Client,
   Content,
   IPCParams,
   IPCParamsContent,
   ClientResponse,
   ClientsResponse,
   WindowResponse,
   Page,
   ClientField
};
