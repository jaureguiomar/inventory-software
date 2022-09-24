interface Supplier {
   id: number;
   name: string;
}

// IPC params
interface IPCParams {
   id: number;
   type: string;
   data: Supplier;
}

export {
   Supplier,
   IPCParams
};