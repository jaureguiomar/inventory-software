import { Category } from "@/types/category";
import { User } from "@/types/user";
import { UserRole } from "@/types/user-role";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
import { Sale } from "@/types/sale";
import { Product, ProductM2M } from "@/types/product";
import { CashCutoff } from "@/types/cash-cutoff";

export const format_sale = (sale:Sale|null) => {
   let formatted_data:Sale|null = null;
   const curr_data = (sale) ? sale : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         total: curr_data.total,
         is_supplier: Number(curr_data.is_supplier),
         id_cash_cutoff: Number(curr_data.id_cash_cutoff),
         id_user: Number(curr_data.id_user),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         cash_cutoff: null,
         user: null,
         pos: null,
         branch: null
      }
   }
   return formatted_data;
};

export const format_product = (product:Product|null) => {
   let formatted_data:Product|null = null;
   const curr_data = (product) ? product : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         is_favorite: Number(curr_data.is_favorite),
         code: curr_data.code,
         name: curr_data.name,
         description: curr_data.description,
         buy_price: curr_data.buy_price,
         sale_price: curr_data.sale_price,
         quantity: Number(curr_data.quantity),
         id_category: Number(curr_data.id_category),
         id_user: Number(curr_data.id_user),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         category: null,
         user: null,
         pos: null,
         branch: null
      }
   }
   return formatted_data;
};

export const format_product_m2m = (product_m2m:ProductM2M|null) => {
   let formatted_data:ProductM2M|null = null;
   const curr_data = (product_m2m) ? product_m2m : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         is_favorite: Number(curr_data.is_favorite),
         code: curr_data.code,
         name: curr_data.name,
         description: curr_data.description,
         buy_price: curr_data.buy_price,
         sale_price: curr_data.sale_price,
         quantity: Number(curr_data.quantity),
         id_category: Number(curr_data.id_category),
         id_user: Number(curr_data.id_user),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         category: null,
         user: null,
         pos: null,
         branch: null,
         sale: {
            id: Number(curr_data.sale.id),
            is_active: Number(curr_data.sale.is_active),
            created: curr_data.sale.created,
            updated: curr_data.sale.updated,
            quantity: Number(curr_data.sale.quantity),
            id_sale: Number(curr_data.sale.id_sale),
            id_product: Number(curr_data.sale.id_product),
            id_user: Number(curr_data.sale.id_user),
            id_pos: Number(curr_data.sale.id_pos),
            id_branch: Number(curr_data.sale.id_branch),
            sale: null,
            product: null,
            user: null,
            pos: null,
            branch: null
         }
      }
   }
   return formatted_data;
};

export const format_category = (category:Category|null) => {
   let formatted_data:Category|null = null;
   const curr_data = (category) ? category : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name,
         id_user: Number(curr_data.id_user),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         user: null,
         pos: null,
         branch: null
      }
   }
   return formatted_data;
};

export const format_user = (user:User|null) => {
   let formatted_data:User|null = null;
   const curr_data = (user) ? user : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         username: curr_data.username,
         email: curr_data.email,
         password: curr_data.password,
         first_name: curr_data.first_name,
         last_name: curr_data.last_name,
         id_role: Number(curr_data.id_role),
         id_user: Number(curr_data.id_user),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         role: null,
         user: null,
         pos: null,
         branch: null
      }
   }
   return formatted_data;
};

export const format_user_role = (user_role:UserRole|null) => {
   let formatted_data:UserRole|null = null;
   const curr_data = (user_role) ? user_role : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name,
         atributes_1: Number(curr_data.atributes_1),
         atributes_2: Number(curr_data.atributes_2),
         atributes_3: Number(curr_data.atributes_3),
         atributes_4: Number(curr_data.atributes_4),
         id_user: Number(curr_data.id_user),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         user: null,
         pos: null,
         branch: null
      }
   }
   return formatted_data;
};

export const format_pos = (pos:Pos|null) => {
   let formatted_data:Pos|null = null;
   const curr_data = (pos) ? pos : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name,
         machine_id: curr_data.machine_id,
         mac_address: curr_data.mac_address,
         id_branch: Number(curr_data.id_branch),
         branch: null
      }
   }
   return formatted_data;
};

export const format_branch = (branch:Branch|null) => {
   let formatted_data:Branch|null = null;
   const curr_data = (branch) ? branch : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name,
         telephone: curr_data.telephone,
         address: curr_data.address
      }
   }
   return formatted_data;
};

export const format_cash_cutoff = (cash_cutoff:CashCutoff|null) => {
   let formatted_data:CashCutoff|null = null;
   const curr_data = (cash_cutoff) ? cash_cutoff : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         amount_open: curr_data.amount_open,
         amount_sale: curr_data.amount_sale,
         amount_supplier: curr_data.amount_supplier,
         amount_close: curr_data.amount_close,
         date_close: curr_data.date_close,
         id_type: Number(curr_data.id_type),
         id_user_open: Number(curr_data.id_user_open),
         id_user_close: Number(curr_data.id_user_close),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         user_open: null,
         user_close: null,
         pos: null,
         branch: null
      }
   }
   return formatted_data;
};
