import {
   format_display_sale, format_display_sale_product, format_display_client,
   format_display_product, format_display_product_m2m, format_display_category,
   format_display_supplier, format_display_user, format_display_pos,
   format_display_cash_cutoff, format_display_activity_log
} from "@/plugins/mixins/format-display";
import { Category, CategoryQuery } from "@/types/category";
import { User, UserQuery } from "@/types/user";
import { UserRole } from "@/types/user-role";
import { Pos, PosQuery } from "@/types/pos";
import { Branch } from "@/types/branch";
import { Sale, SaleQuery } from "@/types/sale";
import { Product, ProductM2M, ProductM2MQuery, ProductQuery } from "@/types/product";
import { CashCutoff, CashCutoffQuery } from "@/types/cash-cutoff";
import { CashCutoffType } from "@/types/cash-cutoff-type";
import { ActivityLog, ActivityLogQuery } from "@/types/activity-log";
import { ActivityLogOperation } from "@/types/activity-log-operation";
import { ActivityLogAccess } from "@/types/activity-log-access";
import { UserRolePermission } from "@/types/user-role-permission";
import { Client, ClientQuery } from "@/types/client";
import { Supplier, SupplierQuery } from "@/types/supplier";
import { SaleProduct, SaleProductQuery } from "@/types/sale-product";

export const format_sale = (sale:Sale|null, display?:SaleQuery) => {
   let formatted_data:Sale|null = null;
   const curr_data = (sale) ? sale : null;

   if(curr_data) {
      const { cash_cutoff, user, pos, branch } = format_display_sale(curr_data, display);
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
         cash_cutoff: cash_cutoff,
         user: user,
         pos: pos,
         branch: branch
      };
   }
   return formatted_data;
};

export const format_sale_product = (sale_product:SaleProduct|null, display?:SaleProductQuery) => {
   let formatted_data:SaleProduct|null = null;
   const curr_data = (sale_product) ? sale_product : null;

   if(curr_data) {
      const { sale, product } = format_display_sale_product(curr_data, display);
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         quantity: Number(curr_data.quantity),
         id_sale: Number(curr_data.id_sale),
         id_product: Number(curr_data.id_product),
         sale: sale,
         product: product
      };
   }
   return formatted_data;
};

export const format_client = (client:Client|null, display?:ClientQuery) => {
   let formatted_data:Client|null = null;
   const curr_data = (client) ? client : null;

   if(curr_data) {
      const { user, pos, branch } = format_display_client(curr_data, display);
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         first_name: curr_data.first_name,
         last_name: curr_data.last_name,
         address: curr_data.address,
         cellphone: curr_data.cellphone,
         cellphone2: curr_data.cellphone2,
         email: curr_data.email,
         id_user: Number(curr_data.id_user),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         user: user,
         pos: pos,
         branch: branch
      };
   }
   return formatted_data;
};

export const format_product = (product:Product|null, display?:ProductQuery) => {
   let formatted_data:Product|null = null;
   const curr_data = (product) ? product : null;

   if(curr_data) {
      const { category, user, pos, branch } = format_display_product(curr_data, display);
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
         category: category,
         user: user,
         pos: pos,
         branch: branch
      };
   }
   return formatted_data;
};

export const format_product_m2m = (product_m2m:ProductM2M|null, display?:ProductM2MQuery) => {
   let formatted_data:ProductM2M|null = null;
   const curr_data = (product_m2m) ? product_m2m : null;

   if(curr_data) {
      const { product, sale_product } = format_display_product_m2m(curr_data, display);
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
         category: product.category,
         user: product.user,
         pos: product.pos,
         branch: product.branch,
         sale_product: {
            id: Number(curr_data.sale_product.id),
            is_active: Number(curr_data.sale_product.is_active),
            created: curr_data.sale_product.created,
            updated: curr_data.sale_product.updated,
            quantity: Number(curr_data.sale_product.quantity),
            id_sale: Number(curr_data.sale_product.id_sale),
            id_product: Number(curr_data.sale_product.id_product),
            sale: sale_product.sale,
            product: sale_product.product
         }
      };
   }
   return formatted_data;
};

export const format_category = (category:Category|null, display?:CategoryQuery) => {
   let formatted_data:Category|null = null;
   const curr_data = (category) ? category : null;

   if(curr_data) {
      const { user, pos, branch } = format_display_category(curr_data, display);
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name,
         id_user: Number(curr_data.id_user),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         user: user,
         pos: pos,
         branch: branch
      };
   }
   return formatted_data;
};

export const format_supplier = (supplier:Supplier|null, display?:SupplierQuery) => {
   let formatted_data:Supplier|null = null;
   const curr_data = (supplier) ? supplier : null;

   if(curr_data) {
      const { user, pos, branch } = format_display_supplier(curr_data, display);
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name,
         id_user: Number(curr_data.id_user),
         id_pos: Number(curr_data.id_pos),
         id_branch: Number(curr_data.id_branch),
         user: user,
         pos: pos,
         branch: branch
      };
   }
   return formatted_data;
};

export const format_user = (user:User|null, display?:UserQuery) => {
   let formatted_data:User|null = null;
   const curr_data = (user) ? user : null;

   if(curr_data) {
      const { role, pos, branch } = format_display_user(curr_data, display);
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
         role: role,
         pos: pos,
         branch: branch
      };
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
      };
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
      };
   }
   return formatted_data;
};

export const format_pos = (pos:Pos|null, display?:PosQuery) => {
   let formatted_data:Pos|null = null;
   const curr_data = (pos) ? pos : null;

   if(curr_data) {
      const { branch } = format_display_pos(curr_data, display);
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name,
         machine_id: curr_data.machine_id,
         mac_address: curr_data.mac_address,
         id_branch: Number(curr_data.id_branch),
         branch: branch
      };
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
      };
   }
   return formatted_data;
};

export const format_cash_cutoff = (cash_cutoff:CashCutoff|null, display?:CashCutoffQuery) => {
   let formatted_data:CashCutoff|null = null;
   const curr_data = (cash_cutoff) ? cash_cutoff : null;

   if(curr_data) {
      const { type, user_open, user_close, pos, branch } = format_display_cash_cutoff(curr_data, display);
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
         type: type,
         user_open: user_open,
         user_close: user_close,
         pos: pos,
         branch: branch
      };
   }
   return formatted_data;
};

export const format_cash_cutoff_type = (cash_cutoff_type:CashCutoffType|null) => {
   let formatted_data:CashCutoffType|null = null;
   const curr_data = (cash_cutoff_type) ? cash_cutoff_type : null;

   if(curr_data) {
      formatted_data = {
         id: Number(curr_data.id),
         is_active: Number(curr_data.is_active),
         created: curr_data.created,
         updated: curr_data.updated,
         name: curr_data.name
      };
   }
   return formatted_data;
};

export const format_activity_log = (activity_log:ActivityLog|null, display?:ActivityLogQuery) => {
   let formatted_data:ActivityLog|null = null;
   const curr_data = (activity_log) ? activity_log : null;

   if(curr_data) {
      const { operation, access, user } = format_display_activity_log(curr_data, display);
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
         operation: operation,
         access: access,
         user: user
      };
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
      };
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
      };
   }
   return formatted_data;
};
