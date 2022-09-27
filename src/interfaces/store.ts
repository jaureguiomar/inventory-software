interface GenericInterface {
   loaded_reply: boolean;
}

interface SaleProduct {
   id: number;
   is_active: number;
   created: Date;
   updated: Date;
   code: string;
   name: string;
   description: string|null;
   buy_price: string;
   sale_price: string;
   quantity: number;
   sale_quantity: number;
   sale_total: string;
}

interface SaleInterface {
   product: Array<SaleProduct>;
}

interface State {
   loggued_in: boolean;
   sale: SaleInterface;
   client: GenericInterface;
   supplier: GenericInterface;
   product: GenericInterface;
   category: GenericInterface;
}

export {
   State,
   SaleProduct
};
