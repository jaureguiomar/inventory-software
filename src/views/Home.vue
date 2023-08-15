<template>
   <div class="main-container">
      <Banner />
      <MenuHome />
      <Content>
         <template #content>
            <div class="indicators">
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
               <div class="indicator-item">
                  <div class="indicator-left">
                     <a href="#_">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" size="4x"></font-awesome-icon>
                     </a>
                  </div>
                  <div class="indicator-right">
                     <h4>Data</h4>
                     <h6>Description about this data</h6>
                  </div>
               </div>
            </div>
         </template>
      </Content>
      <Content>
         <template #content>
            <h2 class="q-ma-none">Charts here!</h2>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { key } from "@/plugins/store"
import {
   format_category, format_user, format_pos, format_branch,
   format_user_role, format_product, format_sale, format_cash_cutoff,
   format_cash_cutoff_type, format_activity_log, format_activity_log_access,
   format_activity_log_operation, format_client, format_supplier,
   format_sale_product, format_user_role_permission
} from "@/plugins/mixins/format";
import {
   fd_data_category, fd_data_user, fd_data_pos, fd_data_product,
   fd_data_sale, fd_data_cash_cutoff, fd_data_activity_log, fd_data_client,
   fd_data_supplier, fd_data_sale_product
} from "@/plugins/mixins/format-display-data";
import { BgOfflineMySQLBakup } from "@/types/background";
import { ActivityLog, ActivityLogsResponse } from "@/types/activity-log";
import { ActivityLogAccess, ActivityLogAccessesResponse } from "@/types/activity-log-access";
import { ActivityLogOperation, ActivityLogOperationsResponse } from "@/types/activity-log-operation";
import { UserRolePermission, UserRolePermissionsResponse } from "@/types/user-role-permission";
import { Branch, BranchesResponse } from "@/types/branch";
import { Client, ClientsResponse } from "@/types/client";
import { Supplier, SuppliersResponse } from "@/types/supplier";
import { Product, ProductsResponse } from "@/types/product";
import { CategoriesResponse, Category } from "@/types/category";
import { User, UsersResponse } from "@/types/user";
import { UserRole, UserRolesResponse } from "@/types/user-role";
import { SaleProduct, SaleProductsResponse } from "@/types/sale-product";
import { Sale, SalesResponse } from "@/types/sale";
import { Pos, PossResponse } from "@/types/pos";
import { CashCutoff, CashCutoffsResponse } from "@/types/cash-cutoff";
import { CashCutoffType, CashCutoffTypesResponse } from "@/types/cash-cutoff-type";
import Banner from "@/views/layout/Banner.vue";
import Content from "@/views/layout/Content.vue";
import MenuHome from "@/views/layout/MenuHome.vue";

export default defineComponent({
   name: "home-component",
   components: {
      Banner,
      Content,
      MenuHome
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);

      onMounted(() => {
         if(getIsOnline) {
            if(!getAutomaticBakupDone.value) {
               onRefreshBakup();
               store.commit("SET_AUTOMATIC_BAKUP_DONE_DATA", true);
            }
         }
         window.addEventListener("online", onOnline);
      });
      onUnmounted(() => {
         window.removeEventListener("online", onOnline);
      });

      const onOnline = () => {
         window.api.send("mysql-get-unsync-data");
         window.api.receive("mysql-get-unsync-data-reply", async function(data:BgOfflineMySQLBakup) {
            // Sync User Roles
            for(let i = 0; i < data.user_role.length; i++) {
               const curr_data = data.user_role[i];
               if(curr_data.sync_type === "add") {
                  try {
                     let response = await axios.put<UserRolesResponse>(`${ getServer.value }/user-role`,
                        {
                           name: curr_data.name,
                           atributes_1: curr_data.atributes_1,
                           atributes_2: curr_data.atributes_2,
                           atributes_3: curr_data.atributes_3,
                           atributes_4: curr_data.atributes_4
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("user-role-create-error #1");
                     } else {
                        console.log("user-role-create-error #2");
                     }
                  } catch (error) {
                     console.log("user-role-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<UserRolesResponse>(`${ getServer.value }/user-role`,
                        {
                           id: curr_data.id,
                           name: curr_data.name,
                           atributes_1: curr_data.atributes_1,
                           atributes_2: curr_data.atributes_2,
                           atributes_3: curr_data.atributes_3,
                           atributes_4: curr_data.atributes_4
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("user-role-update-error #1");
                     } else {
                        console.log("user-role-update-error #2");
                     }
                  } catch (error) {
                     console.log("user-role-update-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<UserRolesResponse>(`${ getServer.value }/user-role`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("user-role-delete-error #1");
                     } else {
                        console.log("user-role-delete-error #2");
                     }
                  } catch (error) {
                     console.log("user-role-delete-error #3", error);
                  }
               }
            }

            // Sync Users
            for(let i = 0; i < data.user.length; i++) {
               const curr_data = data.user[i];
               if(curr_data.sync_type === "add") {
                  try {
                     let response = await axios.put<UsersResponse>(`${ getServer.value }/user`,
                        {
                           username: curr_data.username,
                           email: curr_data.email,
                           password: curr_data.password,
                           first_name: curr_data.first_name,
                           last_name: curr_data.last_name,
                           id_role: curr_data.id_role,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("user-create-error #1");
                     } else {
                        console.log("user-create-error #2");
                     }
                  } catch (error) {
                     console.log("user-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<UsersResponse>(`${ getServer.value }/user`,
                        {
                           id: curr_data.id,
                           username: curr_data.username,
                           email: curr_data.email,
                           password: curr_data.password,
                           first_name: curr_data.first_name,
                           last_name: curr_data.last_name,
                           id_role: curr_data.id_role,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("user-create-error #1");
                     } else {
                        console.log("user-create-error #2");
                     }
                  } catch (error) {
                     console.log("user-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<UsersResponse>(`${ getServer.value }/user`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("user-create-error #1");
                     } else {
                        console.log("user-create-error #2");
                     }
                  } catch (error) {
                     console.log("user-create-error #3", error);
                  }
               }
            }

            // Sync Categories
            for(let i = 0; i < data.category.length; i++) {
               const curr_data = data.category[i];
               if(curr_data.sync_type === "add") {
                  try {
                     let response = await axios.put<CategoriesResponse>(`${ getServer.value }/category`,
                        {
                           name: curr_data.name,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("category-create-error #1");
                     } else {
                        console.log("category-create-error #2");
                     }
                  } catch (error) {
                     console.log("category-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<CategoriesResponse>(`${ getServer.value }/category`,
                        {
                           id: curr_data.id,
                           name: curr_data.name,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("category-create-error #1");
                     } else {
                        console.log("category-create-error #2");
                     }
                  } catch (error) {
                     console.log("category-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<CategoriesResponse>(`${ getServer.value }/category`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("category-create-error #1");
                     } else {
                        console.log("category-create-error #2");
                     }
                  } catch (error) {
                     console.log("category-create-error #3", error);
                  }
               }
            }

            // Sync Products
            for(let i = 0; i < data.product.length; i++) {
               const curr_data = data.product[i];
               if(curr_data.sync_type === "add") {
                  try {
                     let response = await axios.put<ProductsResponse>(`${ getServer.value }/product`,
                        {
                           is_favorite: curr_data.is_favorite,
                           code: curr_data.code,
                           name: curr_data.name,
                           description: curr_data.description,
                           buy_price: curr_data.buy_price,
                           sale_price: curr_data.sale_price,
                           quantity: curr_data.quantity,
                           id_category: curr_data.id_category,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("product-create-error #1");
                     } else {
                        console.log("product-create-error #2");
                     }
                  } catch (error) {
                     console.log("product-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<ProductsResponse>(`${ getServer.value }/product`,
                        {
                           id: curr_data.id,
                           is_favorite: curr_data.is_favorite,
                           code: curr_data.code,
                           name: curr_data.name,
                           description: curr_data.description,
                           buy_price: curr_data.buy_price,
                           sale_price: curr_data.sale_price,
                           quantity: curr_data.quantity,
                           id_category: curr_data.id_category,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("product-create-error #1");
                     } else {
                        console.log("product-create-error #2");
                     }
                  } catch (error) {
                     console.log("product-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<ProductsResponse>(`${ getServer.value }/product`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("product-create-error #1");
                     } else {
                        console.log("product-create-error #2");
                     }
                  } catch (error) {
                     console.log("product-create-error #3", error);
                  }
               }
            }

            // Sync Sales
            for(let i = 0; i < data.sale.length; i++) {
               const curr_data = data.sale[i];
               if(curr_data.sync_type === "add") {
                  try {
                     let response = await axios.put<SalesResponse>(`${ getServer.value }/sale`,
                        {
                           total: curr_data.total,
                           is_supplier: curr_data.is_supplier,
                           id_cash_cutoff: curr_data.id_cash_cutoff,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("sale-create-error #1");
                     } else {
                        console.log("sale-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<SalesResponse>(`${ getServer.value }/sale`,
                        {
                           id: curr_data.id,
                           total: curr_data.total,
                           is_supplier: curr_data.is_supplier,
                           id_cash_cutoff: curr_data.id_cash_cutoff,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("sale-create-error #1");
                     } else {
                        console.log("sale-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<SalesResponse>(`${ getServer.value }/sale`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("sale-create-error #1");
                     } else {
                        console.log("sale-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-create-error #3", error);
                  }
               }
            }

            // Sync Sale Products
            for(let i = 0; i < data.sale_product.length; i++) {
               const curr_data = data.sale_product[i];
               if(curr_data.sync_type === "add") {
                  try {
                     let response = await axios.put<SaleProductsResponse>(`${ getServer.value }/sale-product`,
                        {
                           quantity: curr_data.quantity,
                           id_sale: curr_data.id_sale,
                           id_product: curr_data.id_product
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("sale-product-create-error #1");
                     } else {
                        console.log("sale-product-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-product-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<SaleProductsResponse>(`${ getServer.value }/sale-product`,
                        {
                           id: curr_data.id,
                           quantity: curr_data.quantity,
                           id_sale: curr_data.id_sale,
                           id_product: curr_data.id_product
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("sale-product-create-error #1");
                     } else {
                        console.log("sale-product-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-product-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<SaleProductsResponse>(`${ getServer.value }/sale-product`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("sale-product-create-error #1");
                     } else {
                        console.log("sale-product-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-product-create-error #3", error);
                  }
               }
            }

            // Sync Suppliers
            for(let i = 0; i < data.supplier.length; i++) {
               const curr_data = data.supplier[i];
               if(curr_data.sync_type === "add") {
                  try {
                     let response = await axios.put<SuppliersResponse>(`${ getServer.value }/supplier`,
                        {
                           name: curr_data.name,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("supplier-create-error #1");
                     } else {
                        console.log("supplier-create-error #2");
                     }
                  } catch (error) {
                     console.log("supplier-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<SuppliersResponse>(`${ getServer.value }/supplier`,
                        {
                           id: curr_data.id,
                           name: curr_data.name,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("supplier-create-error #1");
                     } else {
                        console.log("supplier-create-error #2");
                     }
                  } catch (error) {
                     console.log("supplier-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<SuppliersResponse>(`${ getServer.value }/supplier`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("supplier-create-error #1");
                     } else {
                        console.log("supplier-create-error #2");
                     }
                  } catch (error) {
                     console.log("supplier-create-error #3", error);
                  }
               }
            }

            // Sync Clients
            for(let i = 0; i < data.client.length; i++) {
               const curr_data = data.client[i];
               if(curr_data.sync_type === "add") {
                  try {
                     let response = await axios.put<ClientsResponse>(`${ getServer.value }/client`,
                        {
                           first_name: curr_data.first_name,
                           last_name: curr_data.last_name,
                           address: curr_data.address,
                           cellphone: curr_data.cellphone,
                           cellphone2: curr_data.cellphone2,
                           email: curr_data.email,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("client-create-error #1");
                     } else {
                        console.log("client-create-error #2");
                     }
                  } catch (error) {
                     console.log("client-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<ClientsResponse>(`${ getServer.value }/client`,
                        {
                           id: curr_data.id,
                           first_name: curr_data.first_name,
                           last_name: curr_data.last_name,
                           address: curr_data.address,
                           cellphone: curr_data.cellphone,
                           cellphone2: curr_data.cellphone2,
                           email: curr_data.email,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.id_pos,
                           id_branch: curr_data.id_branch
                        },
                        {
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("client-create-error #1");
                     } else {
                        console.log("client-create-error #2");
                     }
                  } catch (error) {
                     console.log("client-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<ClientsResponse>(`${ getServer.value }/client`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(!response.data.data)
                           console.log("client-create-error #1");
                     } else {
                        console.log("client-create-error #2");
                     }
                  } catch (error) {
                     console.log("client-create-error #3", error);
                  }
               }
            }

            window.api.send("mysql-sync-unsync-data");
            window.api.receive("mysql-sync-unsync-data-reply", function() {
               // $q.dialog // Report of errors when theres internet again
               Swal.fire({
                  title: "Ok",
                  text: "Sync data with server successfully",
                  icon: "success"
               });
            });
         });
         store.commit("SET_RETRIEVE_UNSYNC_DATA_DONE_DATA", true);
      };
      const onRefreshBakup = async() => {
         let activity_log:Array<ActivityLog> = [];
         let activity_log_access:Array<ActivityLogAccess> = [];
         let activity_log_operation:Array<ActivityLogOperation> = [];
         let branch:Array<Branch> = [];
         let cash_cutoff:Array<CashCutoff> = [];
         let cash_cutoff_type:Array<CashCutoffType> = [];
         let category:Array<Category> = [];
         let client:Array<Client> = [];
         let pos:Array<Pos> = [];
         let product:Array<Product> = [];
         let sale:Array<Sale> = [];
         let sale_product:Array<SaleProduct> = [];
         let supplier:Array<Supplier> = [];
         let user:Array<User> = [];
         let user_role:Array<UserRole> = [];
         let user_role_permission:Array<UserRolePermission> = [];

         // Get Activity Logs
         try {
            let response = await axios.get<ActivityLogsResponse>(`${ getServer.value }/activity-log`, {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            });
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<ActivityLog> = [];
                  for(let i = 0; i < data.length; i++) {
                     const activity_log:ActivityLog|null = format_activity_log(data[i], fd_data_activity_log);
                     if(activity_log)
                        formatted_data.push(activity_log);
                  }
                  activity_log = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("activity-log-error", error);
         }

         // Get Activity Logs Access
         try {
            let response = await axios.get<ActivityLogAccessesResponse>(`${ getServer.value }/activity-log-access`, {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            });
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<ActivityLogAccess> = [];
                  for(let i = 0; i < data.length; i++) {
                     const activity_log_access:ActivityLogAccess|null = format_activity_log_access(data[i]);
                     if(activity_log_access)
                        formatted_data.push(activity_log_access);
                  }
                  activity_log_access = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("activity-log-access-error", error);
         }

         // Get Activity Logs Operation
         try {
            let response = await axios.get<ActivityLogOperationsResponse>(`${ getServer.value }/activity-log-operation`, {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            });
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<ActivityLogOperation> = [];
                  for(let i = 0; i < data.length; i++) {
                     const activity_log_operation:ActivityLogOperation|null = format_activity_log_operation(data[i]);
                     if(activity_log_operation)
                        formatted_data.push(activity_log_operation);
                  }
                  activity_log_operation = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("activity-log-operation-error", error);
         }

         // Get Branches
         try {
            let response = await axios.get<BranchesResponse>(`${ getServer.value }/branch`);
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<Branch> = [];
                  for(let i = 0; i < data.length; i++) {
                     const branch:Branch|null = format_branch(data[i]);
                     if(branch)
                        formatted_data.push(branch);
                  }
                  branch = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("branch-error", error);
         }

         // Get Pos
         try {
            let response = await axios.get<PossResponse>(`${ getServer.value }/pos`);
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<Pos> = [];
                  for(let i = 0; i < data.length; i++) {
                     const pos:Pos|null = format_pos(data[i], fd_data_pos);
                     if(pos)
                        formatted_data.push(pos);
                  }
                  pos = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("pos-error", error);
         }

         // Get Cash Cutoffs
         try {
            let response = await axios.get<CashCutoffsResponse>(`${ getServer.value }/cash-cutoff`, {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            });
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<CashCutoff> = [];
                  for(let i = 0; i < data.length; i++) {
                     const cash_cutoff:CashCutoff|null = format_cash_cutoff(data[i], fd_data_cash_cutoff);
                     if(cash_cutoff)
                        formatted_data.push(cash_cutoff);
                  }
                  cash_cutoff = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("cash-cutoff-error", error);
         }

         // Get Cash Cutoff Types
         try {
            let response = await axios.get<CashCutoffTypesResponse>(`${ getServer.value }/cash-cutoff`, {
               headers: {
                  "Authorization": `Bearer ${ getAuthToken.value.access_token }`
               }
            });
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<CashCutoffType> = [];
                  for(let i = 0; i < data.length; i++) {
                     const cash_cutoff_type:CashCutoffType|null = format_cash_cutoff_type(data[i]);
                     if(cash_cutoff_type)
                        formatted_data.push(cash_cutoff_type);
                  }
                  cash_cutoff_type = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("cash-cutoff-type-error", error);
         }

         // Get Clients
         try {
            let response = await axios.get<ClientsResponse>(`${ getServer.value }/client`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<Client> = [];
                  for(let i = 0; i < data.length; i++) {
                     const client:Client|null = format_client(data[i], fd_data_client);
                     if(client)
                        formatted_data.push(client);
                  }
                  client = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("client-error", error);
         }

         // Get Suppliers
         try {
            let response = await axios.get<SuppliersResponse>(`${ getServer.value }/supplier`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<Supplier> = [];
                  for(let i = 0; i < data.length; i++) {
                     const supplier:Supplier|null = format_supplier(data[i], fd_data_supplier);
                     if(supplier)
                        formatted_data.push(supplier);
                  }
                  supplier = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("supplier-error", error);
         }

         // Get Categories
         try {
            let response = await axios.get<CategoriesResponse>(`${ getServer.value }/category`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<Category> = [];
                  for(let i = 0; i < data.length; i++) {
                     const category:Category|null = format_category(data[i], fd_data_category);
                     if(category)
                        formatted_data.push(category);
                  }
                  category = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("category-error", error);
         }

         // Get Products
         try {
            let response = await axios.get<ProductsResponse>(`${ getServer.value }/product`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<Product> = [];
                  for(let i = 0; i < data.length; i++) {
                     const product:Product|null = format_product(data[i], fd_data_product);
                     if(product)
                        formatted_data.push(product);
                  }
                  product = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("product-error", error);
         }

         // Get Sales
         try {
            let response = await axios.get<SalesResponse>(`${ getServer.value }/sale`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<Sale> = [];
                  for(let i = 0; i < data.length; i++) {
                     const sale:Sale|null = format_sale(data[i], fd_data_sale);
                     if(sale)
                        formatted_data.push(sale);
                  }
                  sale = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("sale-error", error);
         }

         // Get Sale Products
         try {
            let response = await axios.get<SaleProductsResponse>(`${ getServer.value }/sale-product`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<SaleProduct> = [];
                  for(let i = 0; i < data.length; i++) {
                     const sale_product:SaleProduct|null = format_sale_product(data[i], fd_data_sale_product);
                     if(sale_product)
                        formatted_data.push(sale_product);
                  }
                  sale_product = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("sale-product-error", error);
         }

         // Get User Roles
         try {
            let response = await axios.get<UserRolesResponse>(`${ getServer.value }/user-role`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<UserRole> = [];
                  for(let i = 0; i < data.length; i++) {
                     const user_role:UserRole|null = format_user_role(data[i]);
                     if(user_role)
                        formatted_data.push(user_role);
                  }
                  user_role = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("user-role-error", error);
         }

         // Get Users
         try {
            let response = await axios.get<UsersResponse>(`${ getServer.value }/user`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<User> = [];
                  for(let i = 0; i < data.length; i++) {
                     const user:User|null = format_user(data[i], fd_data_user);
                     if(user)
                        formatted_data.push(user);
                  }
                  user = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("user-error", error);
         }

         // Get User Role Permissions
         try {
            let response = await axios.get<UserRolePermissionsResponse>(`${ getServer.value }/user-role-permission`,
               {
                  headers: {
                     "Authorization": `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(response.data.data) {
                  const data = response.data.data;
                  let formatted_data:Array<UserRolePermission> = [];
                  for(let i = 0; i < data.length; i++) {
                     const user_role_permission:UserRolePermission|null = format_user_role_permission(data[i]);
                     if(user_role_permission)
                        formatted_data.push(user_role_permission);
                  }
                  user_role_permission = formatted_data;
               } else {
                  Swal.fire({
                     title: "Error",
                     text: t("global.default_error"),
                     icon: "error"
                  });
               }
            } else {
               Swal.fire({
                  title: "Error",
                  text: t("global.default_error"),
                  icon: "error"
               });
            }
         } catch (error) {
            console.log("user-role-permission-error", error);
         }

         if(!getOfflineBakupDone.value) {
            window.api.send("mysql-offline-bakup", {
               activity_log: activity_log,
               activity_log_access: activity_log_access,
               activity_log_operation: activity_log_operation,
               branch: branch,
               cash_cutoff: cash_cutoff,
               cash_cutoff_type: cash_cutoff_type,
               category: category,
               client: client,
               pos: pos,
               product: product,
               sale: sale,
               sale_product: sale_product,
               supplier: supplier,
               user: user,
               user_role: user_role,
               user_role_permission: user_role_permission
            });
         }
         window.api.receive("mysql-offline-bakup-reply", function() {
            Swal.fire({
               title: "Ok",
               text: "Database bakup done successfully",
               icon: "success"
            });
         });
         store.commit("SET_OFFLINE_BAKUP_DONE_DATA", true);
      };

      const getServer = computed(() => {
         return store.getters["getServer"];
      });
      const getIsOnline = computed(() => {
         return store.getters["getIsOnline"];
      });
      const getAutomaticBakupDone = computed(() => {
         return store.getters["getAutomaticBakupDone"];
      });
      const getOfflineBakupDone = computed(() => {
         return store.getters["getOfflineBakupDone"];
      });
      const getAuthToken = computed(() => {
         return store.getters["getAuthToken"];
      });
   }
});
</script>

<style lang="sass" scoped>
   .indicators
      width: 100%
      height: auto
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .indicator-item
         display: flex
         flex-direction: row
         align-items: center
         justify-content: space-between
         border: 1px solid #379683
         padding: 30px
         // width: calc(25% - 40px)
         width: 300px
         background: #5cdb94
         border-radius: 10px
         color: white
         .indicator-left
            margin-right: 20px
            a
               svg
                  color: white
         .indicator-right
               h4
                  margin: 0
                  padding: 0
                  font-weight: bold
                  font-size: 30px
               h6
                  margin: 0
                  padding: 0

   @media screen and (max-width: 1340px)
      .indicators
         .indicator-item
            width: 250px
   @media screen and (max-width: 1160px)
      .indicators
         flex-direction: column
         .indicator-item
            width: 70%
            &:not(:last-child)
               margin-bottom: 20px
   @media screen and (max-width: 600px)
      .indicators
         .indicator-item
            width: 100%
</style>
