import { InputFieldString } from "@/interfaces/general";

// Main
interface MainUserRolePermission {
   id: number;
   is_active: number;
   name: string;
   shortname: string;
   description: string;
   attr_value: string;
}
interface UserRolePermission extends MainUserRolePermission {
   created: string;
   updated: string;
}
interface UserRolePermissionMySQL extends MainUserRolePermission {
   is_sync: number;
   sync_type: "add"|"update"|"delete";
   created: Date;
   updated: Date;
}

// Props
interface UserRolePermissionField {
   name: InputFieldString;
   shortname: InputFieldString;
   description: InputFieldString;
   attr_value: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: UserRolePermission;
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
   data?: UserRolePermission;
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
   data: UserRolePermission|null;
   result: string;
   type: string;
}

// Axios response
interface ResponseOk {
   data: UserRolePermission;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface UserRolePermissionResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface UserRolePermissionOneResponse {
   data: UserRolePermission;
   error: ResponseError;
}
interface UserRolePermissionsResponse {
   data: Array<UserRolePermission>;
   error: ResponseError;
}

// Other
interface UserRolePermissionAttributes {
   atributes_1: number;
   // atributes_2: number;
   // atributes_3: number;
   // atributes_4: number;
}

export {
   UserRolePermission,
   UserRolePermissionMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   UserRolePermissionResponse,
   UserRolePermissionOneResponse,
   UserRolePermissionsResponse,
   WindowResponse,
   Page,
   UserRolePermissionField,
   UserRolePermissionAttributes
};
