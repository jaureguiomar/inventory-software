import { Product } from "@/interfaces/product/product";

interface SaleProductStore extends Product {
   sale_quantity: number;
   sale_total: string;
}
interface SaleContentStore {
   id: number;
   name: string;
   product: Array<SaleProductStore>;
}
interface SaleStore {
   curr_sale: SaleContentStore;
   saved_sale: Array<SaleContentStore>;
}
interface GenericStore {
   loaded_reply: boolean;
}
interface GenericStore2 {
   loaded_reply: boolean;
   loaded_get: boolean;
}
// Branch
interface BranchStore {
   id: number;
   name: string;
   telephone: string;
   address: string;
}
// Pos
interface PosStore {
   id: number;
   name: string;
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
   id: number;
   username: string;
   email: string;
   first_name: string;
   last_name: string;
   role: UserRoleStore|null;
}
interface SessionStore {
   loggued_in: boolean;
   user: UserStore;
}

interface State {
   server: string;
   is_online: boolean;
   automatic_bakup_done: boolean;
   offline_bakup_done: boolean;
   branch: BranchStore;
   pos: PosStore;
   session: SessionStore;
   sale: SaleStore;
   client: GenericStore;
   supplier: GenericStore;
   product: GenericStore;
   category: GenericStore2;
   user: GenericStore;
   user_role: GenericStore;
}

export {
   State,
   SaleProductStore,
   SaleContentStore,
   UserStore,
   BranchStore,
   PosStore,
   SessionStore,
   UserRoleStore
};
