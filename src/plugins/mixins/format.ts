import { Category } from "@/types/category";
import { User } from "@/types/user";
import { UserRole } from "@/types/user-role";
import { Pos } from "@/types/pos";
import { Branch } from "@/types/branch";
import { Sale } from "@/types/sale";
import { Product, ProductM2M } from "@/types/product";
import { CashCutoff } from "@/types/cash-cutoff";
import { ActivityLog } from "@/types/activity-log";
import { ActivityLogOperation } from "@/types/activity-log-operation";
import { ActivityLogAccess } from "@/types/activity-log-access";
import { UserRolePermission } from "@/types/user-role-permission";

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
         sale_product: {
            id: Number(curr_data.sale_product.id),
            is_active: Number(curr_data.sale_product.is_active),
            created: curr_data.sale_product.created,
            updated: curr_data.sale_product.updated,
            quantity: Number(curr_data.sale_product.quantity),
            id_sale: Number(curr_data.sale_product.id_sale),
            id_product: Number(curr_data.sale_product.id_product),
            id_user: Number(curr_data.sale_product.id_user),
            id_pos: Number(curr_data.sale_product.id_pos),
            id_branch: Number(curr_data.sale_product.id_branch),
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
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         role: null,
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
         atributes_4: Number(curr_data.atributes_4)
      }
   }
   return formatted_data;
};

export const format_user_role_permission = (user_role_permission:UserRolePermission|null) => {
   let formatted_data:UserRolePermission|null = null;
   const curr_data = (user_role_permission) ? user_role_permission : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name,
         shortname: curr_data.shortname,
         description: curr_data.description,
         attr_value: curr_data.attr_value,
         attr_level: Number(curr_data.attr_level)
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

export const format_activity_log = (activity_log:ActivityLog|null) => {
   let formatted_data:ActivityLog|null = null;
   const curr_data = (activity_log) ? activity_log : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name,
         extra_data: curr_data.extra_data,
         id_operation: Number(curr_data.id_operation),
         id_access: Number(curr_data.id_access),
         id_user: Number(curr_data.id_user),
         operation: curr_data.operation,
         access: curr_data.access,
         user: curr_data.user
      }
   }
   return formatted_data;
};

export const format_activity_log_operation = (activity_log_operation:ActivityLogOperation|null) => {
   let formatted_data:ActivityLogOperation|null = null;
   const curr_data = (activity_log_operation) ? activity_log_operation : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name
      }
   }
   return formatted_data;
};

export const format_activity_log_access = (activity_log_access:ActivityLogAccess|null) => {
   let formatted_data:ActivityLogAccess|null = null;
   const curr_data = (activity_log_access) ? activity_log_access : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name
      }
   }
   return formatted_data;
};
