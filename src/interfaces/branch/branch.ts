import { InputFieldString } from "@/interfaces/general";

// Main
interface MainBranch {
   id: number;
   is_active: number;
   name: string;
   telephone: string;
   address: string;
   machine_id: string;
   mac_address: string;
}
interface Branch extends MainBranch {
   created: string;
   updated: string;
}
interface BranchMySQL extends MainBranch {
   is_sync: number;
   sync_type: "add"|"update"|"delete";
   created: Date;
   updated: Date;
}

interface IPCBranchMachine {
   machine_id: string;
   mac_address: string;
   ip_server: string;
}

// Props
interface BranchField {
   name: InputFieldString;
   telephone: InputFieldString;
   address: InputFieldString;
   machine_id: InputFieldString;
   mac_address: InputFieldString;
}

// IPCParams
interface IPCParams {
   id: number;
   type: string;
   data: Branch;
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
   data?: Branch;
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
   data: Branch|null;
   result: string;
   type: string;
}

// Axios response
interface ResponseOk {
   data: Branch;
   ok: boolean;
   message: string;
}
interface ResponseError {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface BranchResponse {
   data: ResponseOk;
   error: ResponseError;
}
interface BranchOneResponse {
   data: Branch;
   error: ResponseError;
}
interface BranchesResponse {
   data: Array<Branch>;
   error: ResponseError;
}

export {
   IPCBranchMachine,
   Branch,
   BranchMySQL,
   Content,
   IPCParams,
   IPCParamsContent,
   BranchResponse,
   BranchOneResponse,
   BranchesResponse,
   WindowResponse,
   Page,
   BranchField
};
