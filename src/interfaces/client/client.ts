// Axios response
interface Error {
   is_error: boolean;
   message: string|null;
   no_error: number;
}
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
interface ClientResponse {
   data: Array<Client>;
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

// Props
interface PropsData {
   client: Array<Client>;
   new_client: Array<Client>;
}
interface Props {
   data: PropsData;
   table: any;
}

// Window response
interface WindowResponse {
   id: number;
   data: Client;
   result: string;
   type: string;
}

export {
   Props,
   AxiosResponse,
   WindowResponse,
   Client
};
