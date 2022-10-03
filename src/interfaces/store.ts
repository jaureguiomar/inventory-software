import { Product } from "@/interfaces/product/product";

interface SaleProductStore extends Product {
   sale_quantity: number;
   sale_total: string;
}
interface SaleStore {
   product: Array<SaleProductStore>;
}
interface GenericStore {
   loaded_reply: boolean;
}
// Branch
interface BranchStore {
   id: number;
   name: string;
   telephone: string;
   address: string;
}
// Session
interface UserRoleStore {
   id: number;
   name: string;
   // atributes_1: number;
   // atributes_2: number;
   // atributes_3: number;
   // atributes_4: number;
}
interface UserStore {
   username: string;
   email: string;
   first_name: string;
   last_name: string;
   role: UserRoleStore;
}
interface SessionStore {
   loggued_in: boolean;
   user: UserStore;
}

interface State {
   // loggued_in: boolean;
   branch: BranchStore;
   session: SessionStore;
   sale: SaleStore;
   client: GenericStore;
   supplier: GenericStore;
   product: GenericStore;
   category: GenericStore;
   user: GenericStore;
   user_role: GenericStore;
}

export {
   State,
   SaleProductStore,
   UserStore,
   BranchStore,
   SessionStore
};
