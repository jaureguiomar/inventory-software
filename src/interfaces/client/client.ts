interface Client {
   id: number;
   is_active: number;
   created: Date;
   updated: Date;
   first_name: string;
   last_name: string;
   address: string;
   cellphone: string;
   cellphone2: string|null;
   email: string;
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

// Window response
interface WindowResponse {
   id: number;
   data: Client|null;
   result: string;
   type: string;
}

export {
   Client,
   ClientResponse,
   WindowResponse
};
