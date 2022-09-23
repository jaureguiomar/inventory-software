interface Client {
   id: number;
   first_name: string;
   last_name: string;
   address: string;
   cellphone: string;
   cellphone2: string;
   email: string;
}

// IPC params
interface IPCParams {
   id: number;
   type: string;
   data: Client;
}

// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
interface ClientResponse {
   data: Array<Client>;
   error: Error;
}

export {
   Client,
   ClientResponse,
   IPCParams
};