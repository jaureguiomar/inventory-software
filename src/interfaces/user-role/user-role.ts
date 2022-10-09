import { InputFieldString } from "@/interfaces/general";
import { Branch } from "@/interfaces/branch/branch";
import { User } from "@/interfaces/user/user";
import { Pos } from "@/interfaces/pos/pos";

// Main
interface MainUserRole {
   id: number;
   is_active: number;
   name: string;
   // atributes_1: number;
   // atributes_2: number;
   // atributes_3: number;
   // atributes_4: number;
   id_user: number;
   id_pos: number;
   id_branch: number;
   user: User|null;
   pos: Pos|null;
   branch: Branch|null;
}
interface UserRole extends MainUserRole {
   created: string;
   updated: string;
}
interface UserMySQL extends MainUserRole {
   is_sync: number;
   sync_type: "add"|"update"|"delete";
   created: Date;
   updated: Date;
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
