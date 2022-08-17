interface Content {
   title: string;
   description: string;
}
interface InputErrorField {
   is_error: boolean;
   message: string;
}
interface InputFields {
   text: string;
   max_text: number;
   error: InputErrorField;
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
   data?: Client;
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
   content: Content;
   data: ClientProps;
   loaded: boolean;
}

export {
   Props,
   IPCParams
};