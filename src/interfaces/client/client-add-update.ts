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
   content: Content;
   data: Client|null;
}
interface Props {
   id: number;
   content: Content;
   data: Client;
   loaded: boolean;
}

export {
   Props,
   IPCParams
};