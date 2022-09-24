interface Category {
   id: number;
   name: string;
}

// IPC params
interface IPCParams {
   id: number;
   type: string;
   data: Category;
}

export {
   Category,
   IPCParams
};