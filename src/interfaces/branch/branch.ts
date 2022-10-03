import { InputFieldString } from "@/interfaces/general";

// Main
interface IPCBranchMachine {
   machine_id: string;
   mac_address: string;
}
interface Branch {
   id: number;
   is_active: number;
   created: string;
   updated: string;
   name: string;
   telephone: string;
   address: string;
   machine_id: string;
   mac_address: string;
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
