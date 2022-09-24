interface Product {
   id: number;
   code: string;
   name: string;
   description: string;
   buy_price: string;
   sale_price: string;
   quantity: number;
}

// IPC params
interface IPCParams {
   id: number;
   type: string;
   data: Product;
}

export {
   Product,
   IPCParams
};