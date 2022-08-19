// IPC params
interface Content {
   title: string;
   description: string;
}
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
   content: Content;
   data?: Client;
}

// Props
interface InputErrorField {
   is_error: boolean;
   message: string;
}
interface InputFields {
   text: string;
   max_text: number;
   error: InputErrorField;
}
interface ClientProps {
   first_name: InputFields;
   last_name: InputFields;
   address: InputFields;
   cellphone: InputFields;
   cellphone2: InputFields;
   email: InputFields;
}
interface Props {
   id: number;
   type: string;
   content: Content;
   data: ClientProps;
   loaded: boolean;
}

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
   cellphone2: string;
   email: string;
}
interface ClientSubResponse {
   data: Client;
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
   AxiosResponse,
   Client
};