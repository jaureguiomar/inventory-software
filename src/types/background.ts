import { ActivityLog } from "@/types/activity-log";
import { ActivityLogAccess } from "@/types/activity-log-access";
import { ActivityLogOperation } from "@/types/activity-log-operation";
import { Branch } from "@/types/branch";
import { CashCutoff } from "@/types/cash-cutoff";
import { Category } from "@/types/category";
import { Client } from "@/types/client";
import { Pos } from "@/types/pos";
import { Product } from "@/types/product";
import { Sale } from "@/types/sale";
import { SaleProduct } from "@/types/sale-product";
import { Supplier } from "@/types/supplier";
import { User } from "@/types/user";
import { UserRole } from "@/types/user-role";
import { UserRolePermission } from "@/types/user-role-permission";

interface BgOfflineBakup {
   activity_log: ActivityLog[];
   activity_log_access: ActivityLogAccess[];
   activity_log_operation: ActivityLogOperation[];
   branch: Branch[];
   casdh_cutoff: CashCutoff[];
   category: Category[];
   client: Client[];
   pos: Pos[];
   product: Product[];
   sale: Sale[];
   sale_product: SaleProduct[];
   supplier: Supplier[];
   user: User[];
   user_role: UserRole[];
   user_role_permission: UserRolePermission[];
}

export {
   BgOfflineBakup
}
