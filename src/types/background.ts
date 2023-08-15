import { ActivityLog, ActivityLogMySQL } from "@/types/activity-log";
import { ActivityLogAccess, ActivityLogAccessMySQL } from "@/types/activity-log-access";
import { ActivityLogOperation, ActivityLogOperationMySQL } from "@/types/activity-log-operation";
import { Branch, BranchMySQL } from "@/types/branch";
import { CashCutoff, CashCutoffMySQL } from "@/types/cash-cutoff";
import { CashCutoffType, CashCutoffTypeMySQL } from "@/types/cash-cutoff-type";
import { Category, CategoryMySQL } from "@/types/category";
import { Client, ClientMySQL } from "@/types/client";
import { Pos, PosMySQL } from "@/types/pos";
import { Product, ProductMySQL } from "@/types/product";
import { Sale, SaleMySQL } from "@/types/sale";
import { SaleProduct, SaleProductMySQL } from "@/types/sale-product";
import { Supplier, SupplierMySQL } from "@/types/supplier";
import { User, UserMySQL } from "@/types/user";
import { UserRole, UserRoleMySQL } from "@/types/user-role";
import { UserRolePermission, UserRolePermissionMySQL } from "@/types/user-role-permission";

interface BgOfflineBakup {
   activity_log: ActivityLog[];
   activity_log_access: ActivityLogAccess[];
   activity_log_operation: ActivityLogOperation[];
   branch: Branch[];
   cash_cutoff: CashCutoff[];
   cash_cutoff_type: CashCutoffType[];
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
interface BgOfflineMySQLBakup {
   activity_log: ActivityLogMySQL[];
   activity_log_access: ActivityLogAccessMySQL[];
   activity_log_operation: ActivityLogOperationMySQL[];
   branch: BranchMySQL[];
   cash_cutoff: CashCutoffMySQL[];
   cash_cutoff_type: CashCutoffTypeMySQL[];
   category: CategoryMySQL[];
   client: ClientMySQL[];
   pos: PosMySQL[];
   product: ProductMySQL[];
   sale: SaleMySQL[];
   sale_product: SaleProductMySQL[];
   supplier: SupplierMySQL[];
   user: UserMySQL[];
   user_role: UserRoleMySQL[];
   user_role_permission: UserRolePermissionMySQL[];
}

export {
   BgOfflineBakup,
   BgOfflineMySQLBakup
}
