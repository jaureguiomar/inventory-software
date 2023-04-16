import { ActivityLogQuery } from "@/types/activity-log";
import { CashCutoffQuery } from "@/types/cash-cutoff";
import { CategoryQuery } from "@/types/category";
import { ClientQuery } from "@/types/client";
import { PosQuery } from "@/types/pos";
import { ProductM2MQuery, ProductQuery } from "@/types/product";
import { SaleQuery } from "@/types/sale";
import { SaleProductQuery } from "@/types/sale-product";
import { SupplierQuery } from "@/types/supplier";
import { UserQuery } from "@/types/user";

export const fd_data_sale:SaleQuery = {
   cash_cutoff: {
      type: true,
      user_open: true,
      user_close: true,
      pos: true,
      branch: true
   },
   user: true,
   pos: true,
   branch: true
};

export const fd_data_sale_product:SaleProductQuery = {
   product: {
      category: true,
      user: true,
      pos: true,
      branch: true
   },
   sale: {
      cash_cutoff: true,
      user: true,
      pos: true,
      branch: true
   }
};

export const fd_data_client:ClientQuery = {
   user: true,
   pos: true,
   branch: true
};

export const fd_data_product:ProductQuery = {
   category: {
      user: true,
      pos: true,
      branch: true
   },
   user: true,
   pos: true,
   branch: true
};

export const fd_data_product_m2m:ProductM2MQuery = {
   sale_product: {
      sale: true,
      product: true,
      user: true,
      pos: true,
      branch: true
   },
   category: {
      user: true,
      pos: true,
      branch: true
   },
   user: true,
   pos: true,
   branch: true
};

export const fd_data_category:CategoryQuery = {
   user: true,
   pos: true,
   branch: true
};

export const fd_data_supplier:SupplierQuery = {
   user: true,
   pos: true,
   branch: true
};

export const fd_data_user:UserQuery = {
   role: true,
   pos: true,
   branch: true
};

export const fd_data_pos:PosQuery = {
   branch: true
};

export const fd_data_cash_cutoff:CashCutoffQuery = {
   type: true,
   user_open: {
      role: true,
      pos: true,
      branch: true
   },
   user_close: {
      role: true,
      pos: true,
      branch: true
   },
   pos: true,
   branch: true
};

export const fd_data_activity_log:ActivityLogQuery = {
   operation: true,
   access: true,
   user: false
};
