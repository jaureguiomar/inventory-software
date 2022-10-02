import { Product } from "@/interfaces/product/product";

interface GenericInterface {
   loaded_reply: boolean;
}

interface SaleProduct extends Product {
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
   user: GenericInterface;
}

export {
   State,
   SaleProduct
};
