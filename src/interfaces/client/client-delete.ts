// IPC params
interface Client {
   first_name: string;
   last_name: string;
   address: string;
   cellphone: string;
   cellphone2: string;
   email: string;
}
interface IPCParams {
   id: number;
   type: string;
   data: Client;
}

// Props
interface Props {
   id: number;
   first_name: string;
   last_name: string;
   address: string;
   cellphone: string;
   cellphone2: string;
   email: string;
   loaded: boolean;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface ClientSubResponse {
   message: string;
   ok: boolean;
}
interface ClientResponse {
   data: ClientSubResponse;
   error: Error;
}
interface AxiosResponse {
   data: ClientResponse;
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