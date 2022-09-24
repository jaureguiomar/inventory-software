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

export {
   Client,
   IPCParams
};