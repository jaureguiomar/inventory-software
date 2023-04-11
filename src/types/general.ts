interface InputErrorField {
   is_error: boolean;
   message: string;
}

interface InputFieldString {
   text: string;
   max_text: number;
   error: InputErrorField;
}
interface InputFieldNumber {
   text: string;
   max_text: number;
   error: InputErrorField;
}
interface InputFieldBoolean {
   text: boolean;
   max_text: number;
   error: InputErrorField;
}

interface MySQLOfflineField {
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
}
interface MySQLDelete {
   id: number;
   is_sync: number;
   sync_type: "add"|"update"|"delete"|null;
}

export {
   InputFieldString,
   InputFieldNumber,
   InputFieldBoolean,
   MySQLOfflineField,
   MySQLDelete
};
