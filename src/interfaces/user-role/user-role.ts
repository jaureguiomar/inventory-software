import { InputFieldString } from "@/interfaces/general";

// Main
interface UserRole {
   id: number;
   is_active: number;
   created: string;
   updated: string;
   name: string;
   // atributes_1: number;
   // atributes_2: number;
   // atributes_3: number;
   // atributes_4: number;
   id_branch: number;
}

// Props
interface UserRoleField {
   name: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: UserRole;
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
   data?: UserRole;
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
   data: UserRole|null;
   result: string;
   type: string;
}

// Axios response
interface ResponseOk {
   data: UserRole;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface UserRoleResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface UserRoleOneResponse {
   data: UserRole;
   error: ResponseError;
}
interface UserRolesResponse {
   data: Array<UserRole>;
   error: ResponseError;
}

export {
   UserRole,
   Content,
   IPCParams,
   IPCParamsContent,
   UserRoleResponse,
   UserRoleOneResponse,
   UserRolesResponse,
   WindowResponse,
   Page,
   UserRoleField
};
