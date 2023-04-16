import { verifyDisplayField } from "@/plugins/mixins/general";
import {
   format_activity_log_access, format_activity_log_operation, format_branch,
   format_cash_cutoff, format_category, format_pos, format_product,
   format_sale, format_user, format_user_role
} from "@/plugins/mixins/format";
import { Category, CategoryQuery } from "@/types/category";
import { User, UserQuery } from "@/types/user";
import { UserRole } from "@/types/user-role";
import { Pos, PosQuery } from "@/types/pos";
import { Branch } from "@/types/branch";
import { Sale, SaleQuery } from "@/types/sale";
import { Product, ProductM2M, ProductM2MQuery, ProductQuery } from "@/types/product";
import { CashCutoff, CashCutoffQuery } from "@/types/cash-cutoff";
import { ActivityLog, ActivityLogQuery } from "@/types/activity-log";
import { ActivityLogOperation } from "@/types/activity-log-operation";
import { ActivityLogAccess } from "@/types/activity-log-access";
import { Client, ClientQuery } from "@/types/client";
import { Supplier, SupplierQuery } from "@/types/supplier";
import { SaleProduct, SaleProductQuery } from "@/types/sale-product";

export const format_display_sale = (row:Sale, display?:SaleQuery) => {
   let cash_cutoff:CashCutoff|null = null;
   let user:User|null = null;
   let pos:Pos|null = null;
   let branch:Branch|null = null;

   if(verifyDisplayField(display?.cash_cutoff)) {
      const formattedDisplay:CashCutoffQuery = (typeof(display?.cash_cutoff) === "object" ? display?.cash_cutoff : {
         user_open: false,
         user_close: false,
         pos: false,
         branch: false
      });
      cash_cutoff = format_cash_cutoff(row.cash_cutoff, formattedDisplay);
   }
   if(verifyDisplayField(display?.user)) {
      const formattedDisplay:UserQuery = (typeof(display?.user) === "object" ? display?.user : {
         role: false,
         pos: false,
         branch: false
      });
      user = format_user(row.user, formattedDisplay);
   }
   if(verifyDisplayField(display?.pos))
      pos = format_pos(row.pos);
   if(verifyDisplayField(display?.branch))
      branch = format_branch(row.branch);

   return {
      cash_cutoff: cash_cutoff,
      user: user,
      pos: pos,
      branch: branch
   };
};

export const format_display_sale_product = (row:SaleProduct, display?:SaleProductQuery) => {
   let sale:Sale|null = null;
   let product:Product|null = null;
   let user:User|null = null;
   let pos:Pos|null = null;
   let branch:Branch|null = null;

   if(verifyDisplayField(display?.sale)) {
      const formattedDisplay:SaleQuery = (typeof(display?.sale) === "object" ? display?.sale : {
         cash_cutoff: false,
         user: false,
         pos: false,
         branch: false
      });
      sale = format_sale(row.sale, formattedDisplay);
   }
   if(verifyDisplayField(display?.product)) {
      const formattedDisplay:ProductQuery = (typeof(display?.product) === "object" ? display?.product : {
         category: false,
         user: false,
         pos: false,
         branch: false
      });
      product = format_product(row.product, formattedDisplay);
   }
   if(verifyDisplayField(display?.user)) {
      const formattedDisplay:UserQuery = (typeof(display?.user) === "object" ? display?.user : {
         role: false,
         pos: false,
         branch: false
      });
      user = format_user(row.user, formattedDisplay);
   }
   if(verifyDisplayField(display?.pos))
      pos = format_pos(row.pos);
   if(verifyDisplayField(display?.branch))
      branch = format_branch(row.branch);

   return {
      sale: sale,
      product: product,
      user: user,
      pos: pos,
      branch: branch
   };
};

export const format_display_client = (row:Client, display?:ClientQuery) => {
   let user:User|null = null;
   let pos:Pos|null = null;
   let branch:Branch|null = null;

   if(verifyDisplayField(display?.user)) {
      const formattedDisplay:UserQuery = (typeof(display?.user) === "object" ? display?.user : {
         role: false,
         pos: false,
         branch: false
      });
      user = format_user(row.user, formattedDisplay);
   }
   if(verifyDisplayField(display?.pos))
      pos = format_pos(row.pos);
   if(verifyDisplayField(display?.branch))
      branch = format_branch(row.branch);

   return {
      user: user,
      pos: pos,
      branch: branch
   };
};

export const format_display_product = (row:Product, display?:ProductQuery) => {
   let category:Category|null = null;
   let user:User|null = null;
   let pos:Pos|null = null;
   let branch:Branch|null = null;

   if(verifyDisplayField(display?.category)) {
      const formattedDisplay:CategoryQuery = (typeof(display?.category) === "object" ? display?.category : {
         user: false,
         pos: false,
         branch: false
      });
      category = format_category(row.category, formattedDisplay);
   }
   if(verifyDisplayField(display?.user)) {
      const formattedDisplay:UserQuery = (typeof(display?.user) === "object" ? display?.user : {
         role: false,
         pos: false,
         branch: false
      });
      user = format_user(row.user, formattedDisplay);
   }
   if(verifyDisplayField(display?.pos))
      pos = format_pos(row.pos);
   if(verifyDisplayField(display?.branch))
      branch = format_branch(row.branch);

   return {
      category: category,
      user: user,
      pos: pos,
      branch: branch
   };
};

export const format_display_product_m2m = (row:ProductM2M, display?:ProductM2MQuery) => {
   let product_category:Category|null = null;
   let product_user:User|null = null;
   let product_pos:Pos|null = null;
   let product_branch:Branch|null = null;
   let sale_product_sale:Sale|null = null;
   let sale_product_product:Product|null = null;
   let sale_product_user:User|null = null;
   let sale_product_pos:Pos|null = null;
   let sale_product_branch:Branch|null = null;

   // Sale
   if(verifyDisplayField(display?.category)) {
      const formattedDisplay:CategoryQuery = (typeof(display?.category) === "object" ? display?.category : {
         user: false,
         pos: false,
         branch: false
      });
      product_category = format_category(row.category, formattedDisplay);
   }
   if(verifyDisplayField(display?.user)) {
      const formattedDisplay:UserQuery = (typeof(display?.user) === "object" ? display?.user : {
         role: false,
         pos: false,
         branch: false
      });
      product_user = format_user(row.user, formattedDisplay);
   }
   if(verifyDisplayField(display?.pos))
      product_pos = format_pos(row.pos);
   if(verifyDisplayField(display?.branch))
      product_branch = format_branch(row.branch);

   // Sale Product
   if(verifyDisplayField(display?.sale_product.sale)) {
      const formattedDisplay:SaleQuery = (typeof(display?.sale_product.sale) === "object" ? display?.sale_product.sale : {
         cash_cutoff: false,
         user: false,
         pos: false,
         branch: false
      });
      sale_product_sale = format_sale(row.sale_product.sale, formattedDisplay);
   }
   if(verifyDisplayField(display?.sale_product.product)) {
      const formattedDisplay:ProductQuery = (typeof(display?.sale_product.product) === "object" ? display?.sale_product.product : {
         category: false,
         user: false,
         pos: false,
         branch: false
      });
      sale_product_product = format_product(row.sale_product.product, formattedDisplay);
   }
   if(verifyDisplayField(display?.sale_product.user)) {
      const formattedDisplay:UserQuery = (typeof(display?.sale_product.user) === "object" ? display?.sale_product.user : {
         role: false,
         pos: false,
         branch: false
      });
      sale_product_user = format_user(row.sale_product.user, formattedDisplay);
   }
   if(verifyDisplayField(display?.sale_product.pos))
      sale_product_pos = format_pos(row.sale_product.pos);
   if(verifyDisplayField(display?.sale_product.branch))
      sale_product_branch = format_branch(row.sale_product.branch);

   return {
      product: {
         category: product_category,
         user: product_user,
         pos: product_pos,
         branch: product_branch
      },
      sale_product: {
         sale: sale_product_sale,
         product: sale_product_product,
         user: sale_product_user,
         pos: sale_product_pos,
         branch: sale_product_branch
      }
   };
};

export const format_display_category = (row:Category, display?:CategoryQuery) => {
   let user:User|null = null;
   let pos:Pos|null = null;
   let branch:Branch|null = null;

   if(verifyDisplayField(display?.user)) {
      const formattedDisplay:UserQuery = (typeof(display?.user) === "object" ? display?.user : {
         role: false,
         pos: false,
         branch: false
      });
      user = format_user(row.user, formattedDisplay);
   }
   if(verifyDisplayField(display?.pos))
      pos = format_pos(row.pos);
   if(verifyDisplayField(display?.branch))
      branch = format_branch(row.branch);

   return {
      user: user,
      pos: pos,
      branch: branch
   };
};

export const format_display_supplier = (row:Supplier, display?:SupplierQuery) => {
   let user:User|null = null;
   let pos:Pos|null = null;
   let branch:Branch|null = null;

   if(verifyDisplayField(display?.user)) {
      const formattedDisplay:UserQuery = (typeof(display?.user) === "object" ? display?.user : {
         role: false,
         pos: false,
         branch: false
      });
      user = format_user(row.user, formattedDisplay);
   }
   if(verifyDisplayField(display?.pos))
      pos = format_pos(row.pos);
   if(verifyDisplayField(display?.branch))
      branch = format_branch(row.branch);

   return {
      user: user,
      pos: pos,
      branch: branch
   };
};

export const format_display_user = (row:User, display?:UserQuery) => {
   let user_role:UserRole|null = null;
   let pos:Pos|null = null;
   let branch:Branch|null = null;

   if(verifyDisplayField(display?.role))
      user_role = format_user_role(row.role);
   if(verifyDisplayField(display?.pos))
      pos = format_pos(row.pos);
   if(verifyDisplayField(display?.branch))
      branch = format_branch(row.branch);

   return {
      role: user_role,
      pos: pos,
      branch: branch
   };
};

export const format_display_pos = (row:Pos, display?:PosQuery) => {
   let branch:Branch|null = null;
   if(verifyDisplayField(display?.branch))
      branch = format_branch(row.branch);
   return {
      branch: branch
   };
};

export const format_display_cash_cutoff = (row:CashCutoff, display?:CashCutoffQuery) => {
   let user_open:User|null = null;
   let user_close:User|null = null;
   let pos:Pos|null = null;
   let branch:Branch|null = null;

   if(verifyDisplayField(display?.user_open)) {
      const formattedDisplay:UserQuery = (typeof(display?.user_open) === "object" ? display?.user_open : {
         role: false,
         pos: false,
         branch: false
      });
      user_open = format_user(row.user_open, formattedDisplay);
   }
   if(verifyDisplayField(display?.user_close)) {
      const formattedDisplay:UserQuery = (typeof(display?.user_close) === "object" ? display?.user_close : {
         role: false,
         pos: false,
         branch: false
      });
      user_close = format_user(row.user_close, formattedDisplay);
   }
   if(verifyDisplayField(display?.pos))
      pos = format_pos(row.pos);
   if(verifyDisplayField(display?.branch))
      branch = format_branch(row.branch);

   return {
      user_open: user_open,
      user_close: user_close,
      pos: pos,
      branch: branch
   };
};

export const format_display_activity_log = (row:ActivityLog, display?:ActivityLogQuery) => {
   let activity_log_operation:ActivityLogOperation|null = null;
   let activity_log_access:ActivityLogAccess|null = null;
   let user:User|null = null;

   if(verifyDisplayField(display?.operation))
      activity_log_operation = format_activity_log_operation(row.operation);
   if(verifyDisplayField(display?.access))
      activity_log_access = format_activity_log_access(row.access);
   if(verifyDisplayField(display?.user)) {
      const formattedDisplay:UserQuery = (typeof(display?.user) === "object" ? display?.user : {
         role: false,
         pos: false,
         branch: false
      });
      user = format_user(row.user, formattedDisplay);
   }

   return {
      operation: activity_log_operation,
      access: activity_log_access,
      user: user
   };
};
