import { InputFieldString } from "@/interfaces/general";
import { Branch } from "@/interfaces/branch/branch";
import { User } from "@/interfaces/user/user";
import { Pos } from "@/interfaces/pos/pos";

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
   id_user: number;
   id_pos: number;
   id_branch: number;
   user: User|null;
   pos: Pos|null;
   branch: Branch|null;
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
interface ClientOneResponse {
   data: Client;
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
   ClientOneResponse,
   ClientsResponse,
   WindowResponse,
   Page,
   ClientField
};
