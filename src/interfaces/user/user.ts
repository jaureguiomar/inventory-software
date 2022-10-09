import { InputFieldNumber, InputFieldString } from "@/interfaces/general";
import { UserRole } from "@/interfaces/user-role/user-role";
import { Branch } from "@/interfaces/branch/branch";
import { Pos } from "@/interfaces/pos/pos";

// Main
interface User {
   id: number;
   is_active: number;
   created: string;
   updated: string;
   username: string;
   email: string;
   password: string;
   first_name: string;
   last_name: string;
   id_role: number;
   id_user: number;
   id_pos: number;
   id_branch: number;
   role: UserRole|null;
   user: User|null;
   pos: Pos|null;
   branch: Branch|null;
}

// Props
interface UserField {
   username: InputFieldString;
   email: InputFieldString;
   password: InputFieldString;
   first_name: InputFieldString;
   last_name: InputFieldString;
   id_role: InputFieldNumber;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: User;
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
   data?: User;
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
   data: User|null;
   result: string;
   type: string;
}

// Axios response
interface ResponseOk {
   data: User;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface UserResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface UserOneResponse {
   data: User;
   error: ResponseError;
}
interface UsersResponse {
   data: Array<User>;
   error: ResponseError;
}

export {
   User,
   Content,
   IPCParams,
   IPCParamsContent,
   UserResponse,
   UserOneResponse,
   UsersResponse,
   WindowResponse,
   Page,
   UserField
};
