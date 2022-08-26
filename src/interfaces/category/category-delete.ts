// IPC params
interface Category {
   name: string;
}
interface IPCParams {
   id: number;
   type: string;
   data: Category;
}

// Props
interface Props {
   id: number;
   name: string;
   loaded: boolean;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface CategorySubResponse {
   message: string;
   ok: boolean;
}
interface CategoryResponse {
   data: CategorySubResponse;
   error: Error;
}
interface AxiosResponse {
   data: CategoryResponse;
   config: any;
   headers: any;
   request: any;
   status: number;
   statusText: string;
}

export {
   Props,
   IPCParams,
   AxiosResponse
};