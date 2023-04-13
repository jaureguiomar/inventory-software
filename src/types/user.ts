import { InputFieldNumber, InputFieldString } from "@/types/general";
import { UserRole } from "@/types/user-role";
import { Branch } from "@/types/branch";
import { Pos } from "@/types/pos";

// Main
interface MainUser {
   id: number;
   is_active: number;
   username: string;
   email: string;
   password: string;
   first_name: string;
   last_name: string;
   id_role: number;
   id_pos: number;
   id_branch: number;
   role: UserRole|null;
   pos: Pos|null;
   branch: Branch|null;
}
interface User extends MainUser {
   created: string;
   updated: string;
}
interface UserMySQL extends MainUser {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
   created: Date;
   updated: Date;
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
// interface ResponseOk {
//    data: User;
//    ok: boolean;
//    message: string;
// }
// interface ResponseAuthOk {
//    data: User;
//    token: ResponseAuthToken;
//    ok: boolean;
//    message: string;
// }
// interface ResponseError {
//    is_error: boolean;
//    message: string|null;
//    no_error: number;
// }
// interface ResponseAuthToken {
//    access_token: string;
//    refresh_token: string;
//    expires_in: number;
// }
// interface UserResponse {
//    data: ResponseOk;
//    error: ResponseError;
// }
// interface UserAuthResponse {
//    data: ResponseAuthOk;
//    // error: ResponseError;
// }
interface UserResponse {
   data: User;
}
interface UserAuthResponse {
   data: User;
   access_token: string;
   refresh_token: string;
   expires_in: number;
}
// interface UserAuthResponse {
//    data: ResponseAuthOk;
//    error: ResponseError;
// }
interface UserOneResponse {
   data: User;
   // error: ResponseError;
}
interface UsersResponse {
   data: Array<User>;
   // error: ResponseError;
}

export {
   User,
   UserMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   UserResponse,
   UserAuthResponse,
   UserOneResponse,
   UsersResponse,
   WindowResponse,
   Page,
   UserField
};
