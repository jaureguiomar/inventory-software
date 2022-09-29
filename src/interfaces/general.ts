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

export {
   InputFieldString,
   InputFieldNumber
};
