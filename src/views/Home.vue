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
import { format_category, format_user, format_pos, format_branch, format_user_role, format_product, format_sale } from "@/plugins/mixins/format";
import { Branch, BranchesResponse } from "@/interfaces/branch/branch";
import { Client, ClientsResponse } from "@/interfaces/client/client";
import { Supplier, SuppliersResponse } from "@/interfaces/supplier/supplier";
import { Product, ProductsResponse } from "@/interfaces/product/product";
import { CategoriesResponse, Category } from "@/interfaces/category/category";
import { User, UsersResponse } from "@/interfaces/user/user";
import { UserRole, UserRolesResponse } from "@/interfaces/user-role/user-role";
import { SaleProduct, SaleProductsResponse } from "@/interfaces/sale-product/sale-product";
import { Sale, SalesResponse } from "@/interfaces/sale/sale";
import { Pos } from "@/interfaces/pos/pos";
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
         window.api.receive("mysql-get-unsync-data-reply", async function(data) {
            // Sync User Roles
            for(let i = 0; i < data.user_role.length; i++) {
               const curr_data = data.user_role[i];
               if(curr_data.sync_type === "add") {
                  try {
                     let response = await axios.put<UserRolesResponse>(`${ getServer.value }/user_role/v3/create.php`,
                        {
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("user-role-create-error #1");
                     } else {
                        console.log("user-role-create-error #2");
                     }
                  } catch (error) {
                     console.log("user-role-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<UserRolesResponse>(`${ getServer.value }/user_role/v3/update.php`,
                        {
                           id: curr_data.id,
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("user-role-update-error #1");
                     } else {
                        console.log("user-role-update-error #2");
                     }
                  } catch (error) {
                     console.log("user-role-update-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<UserRolesResponse>(`${ getServer.value }/user_role/v3/delete.php`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
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
                     let response = await axios.put<UsersResponse>(`${ getServer.value }/user/v3/create.php`,
                        {
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("user-create-error #1");
                     } else {
                        console.log("user-create-error #2");
                     }
                  } catch (error) {
                     console.log("user-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<UsersResponse>(`${ getServer.value }/user/v3/update.php`,
                        {
                           id: curr_data.id,
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("user-create-error #1");
                     } else {
                        console.log("user-create-error #2");
                     }
                  } catch (error) {
                     console.log("user-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<UsersResponse>(`${ getServer.value }/user/v3/delete.php`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
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
                     let response = await axios.put<CategoriesResponse>(`${ getServer.value }/category/v3/create.php`,
                        {
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("category-create-error #1");
                     } else {
                        console.log("category-create-error #2");
                     }
                  } catch (error) {
                     console.log("category-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<CategoriesResponse>(`${ getServer.value }/category/v3/update.php`,
                        {
                           id: curr_data.id,
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("category-create-error #1");
                     } else {
                        console.log("category-create-error #2");
                     }
                  } catch (error) {
                     console.log("category-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<CategoriesResponse>(`${ getServer.value }/category/v3/delete.php`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
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
                     let response = await axios.put<ProductsResponse>(`${ getServer.value }/product/v3/create.php`,
                        {
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("product-create-error #1");
                     } else {
                        console.log("product-create-error #2");
                     }
                  } catch (error) {
                     console.log("product-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<ProductsResponse>(`${ getServer.value }/product/v3/update.php`,
                        {
                           id: curr_data.id,
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("product-create-error #1");
                     } else {
                        console.log("product-create-error #2");
                     }
                  } catch (error) {
                     console.log("product-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<ProductsResponse>(`${ getServer.value }/product/v3/delete.php`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
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
                     let response = await axios.put<SalesResponse>(`${ getServer.value }/sale/v3/create.php`,
                        {
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("sale-create-error #1");
                     } else {
                        console.log("sale-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<SalesResponse>(`${ getServer.value }/sale/v3/update.php`,
                        {
                           id: curr_data.id,
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("sale-create-error #1");
                     } else {
                        console.log("sale-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<SalesResponse>(`${ getServer.value }/sale/v3/delete.php`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
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
                     let response = await axios.put<SaleProductsResponse>(`${ getServer.value }/sale_product/v3/create.php`,
                        {
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("sale-product-create-error #1");
                     } else {
                        console.log("sale-product-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-product-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<SaleProductsResponse>(`${ getServer.value }/sale_product/v3/update.php`,
                        {
                           id: curr_data.id,
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("sale-product-create-error #1");
                     } else {
                        console.log("sale-product-create-error #2");
                     }
                  } catch (error) {
                     console.log("sale-product-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<SaleProductsResponse>(`${ getServer.value }/sale_product/v3/delete.php`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
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
                     let response = await axios.put<SuppliersResponse>(`${ getServer.value }/supplier/v3/create.php`,
                        {
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("supplier-create-error #1");
                     } else {
                        console.log("supplier-create-error #2");
                     }
                  } catch (error) {
                     console.log("supplier-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<SuppliersResponse>(`${ getServer.value }/supplier/v3/update.php`,
                        {
                           id: curr_data.id,
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("supplier-create-error #1");
                     } else {
                        console.log("supplier-create-error #2");
                     }
                  } catch (error) {
                     console.log("supplier-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<SuppliersResponse>(`${ getServer.value }/supplier/v3/delete.php`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
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
                     let response = await axios.put<ClientsResponse>(`${ getServer.value }/client/v3/create.php`,
                        {
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("client-create-error #1");
                     } else {
                        console.log("client-create-error #2");
                     }
                  } catch (error) {
                     console.log("client-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "update") {
                  try {
                     let response = await axios.post<ClientsResponse>(`${ getServer.value }/client/v3/update.php`,
                        {
                           id: curr_data.id,
                           total: curr_data.total,
                           id_user: curr_data.id_user,
                           id_pos: curr_data.value,
                           id_branch: curr_data.value
                        },
                        {
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
                           console.log("client-create-error #1");
                     } else {
                        console.log("client-create-error #2");
                     }
                  } catch (error) {
                     console.log("client-create-error #3", error);
                  }
               } else if(curr_data.sync_type === "delete") {
                  try {
                     let response = await axios.delete<ClientsResponse>(`${ getServer.value }/client/v3/delete.php`,
                        {
                           params: {
                              field: "id",
                              data: curr_data.id
                           },
                           headers: {
                              'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                           }
                        }
                     );
                     if(response) {
                        if(response.data.error.is_error)
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
         let branch:Array<Branch> = [];
         let client:Array<Client> = [];
         let supplier:Array<Supplier> = [];
         let category:Array<Category> = [];
         let product:Array<Product> = [];
         let sale:Array<Sale> = [];
         let sale_product:Array<SaleProduct> = [];
         let user_role:Array<UserRole> = [];
         let user:Array<User> = [];

         // Get Branches
         try {
            let response = await axios.get<BranchesResponse>(`${ getServer.value }/branch/v3/select-all.php`);
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_data:Array<Branch> = [];
                  for(let i = 0; i < data.length; i++) {
                     formatted_data.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        name: data[i].name,
                        telephone: data[i].telephone,
                        address: data[i].address
                     });
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

         // Get Clients
         try {
            let response = await axios.get<ClientsResponse>(`${ getServer.value }/client/v3/select-all.php`,
               {
                  headers: {
                     'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_data:Array<Client> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_data.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        first_name: data[i].first_name,
                        last_name: data[i].last_name,
                        address: data[i].address,
                        cellphone: data[i].cellphone,
                        cellphone2: data[i].cellphone2,
                        email: data[i].email,
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
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
            let response = await axios.get<SuppliersResponse>(`${ getServer.value }/supplier/v3/select-all.php`,
               {
                  headers: {
                     'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_data:Array<Supplier> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_data.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        name: data[i].name,
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
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
            let response = await axios.get<CategoriesResponse>(`${ getServer.value }/category/v3/select-all.php`,
               {
                  headers: {
                     'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_data:Array<Category> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_data.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        name: data[i].name,
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
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
            let response = await axios.get<ProductsResponse>(`${ getServer.value }/product/v3/find.php`,
               {
                  params: {
                     type: "id_branch",
                     query: getBranchId.value
                  },
                  headers: {
                     'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_data:Array<Product> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_category:Category|null = format_category(data[i].category);
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_data.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        is_favorite: Number(data[i].is_favorite),
                        code: data[i].code,
                        name: data[i].name,
                        description: data[i].description,
                        buy_price: data[i].buy_price,
                        sale_price: data[i].sale_price,
                        quantity: Number(data[i].quantity),
                        id_category: Number(data[i].id_category),
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        category: formatted_category,
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
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
            let response = await axios.get<SalesResponse>(`${ getServer.value }/sale/v3/find.php`,
               {
                  params: {
                     type: "id_branch",
                     query: getBranchId.value
                  },
                  headers: {
                     'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_data:Array<Sale> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_data.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        total: data[i].total,
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
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
            let response = await axios.get<SaleProductsResponse>(`${ getServer.value }/sale_product/v3/find.php`,
               {
                  params: {
                     type: "id_branch",
                     query: getBranchId.value
                  },
                  headers: {
                     'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_data:Array<SaleProduct> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_sale:Sale|null = format_sale(data[i].sale);
                     const formatted_product:Product|null = format_product(data[i].product);
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_data.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        quantity: Number(data[i].quantity),
                        id_sale: Number(data[i].id_sale),
                        id_product: Number(data[i].id_product),
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        sale: formatted_sale,
                        product: formatted_product,
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
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
            let response = await axios.get<UserRolesResponse>(`${ getServer.value }/user_role/v3/select-all.php`,
               {
                  headers: {
                     'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_data:Array<UserRole> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_data.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        name: data[i].name,
                        atributes_1: Number(data[i].atributes_1),
                        atributes_2: Number(data[i].atributes_2),
                        atributes_3: Number(data[i].atributes_3),
                        atributes_4: Number(data[i].atributes_4),
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
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
            let response = await axios.get<UsersResponse>(`${ getServer.value }/user/v3/select-all.php`,
               {
                  headers: {
                     'Authorization': `Bearer ${ getAuthToken.value.access_token }`
                  }
               }
            );
            if(response) {
               if(!response.data.error.is_error) {
                  const data = response.data.data;
                  let formatted_data:Array<User> = [];
                  for(let i = 0; i < data.length; i++) {
                     const formatted_role:UserRole|null = format_user_role(data[i].role);
                     const formatted_user:User|null = format_user(data[i].user);
                     const formatted_pos:Pos|null = format_pos(data[i].pos);
                     const formatted_branch:Branch|null = format_branch(data[i].branch);

                     formatted_data.push({
                        id: Number(data[i].id),
                        is_active: Number(data[i].is_active),
                        created: data[i].created,
                        updated: data[i].updated,
                        username: data[i].username,
                        email: data[i].email,
                        password: data[i].password,
                        first_name: data[i].first_name,
                        last_name: data[i].last_name,
                        id_role: Number(data[i].id_role),
                        id_user: Number(data[i].id_user),
                        id_pos: Number(data[i].id_pos),
                        id_branch: Number(data[i].id_branch),
                        role: formatted_role,
                        user: formatted_user,
                        pos: formatted_pos,
                        branch: formatted_branch
                     });
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

         if(!getOfflineBakupDone.value) {
            window.api.send("mysql-offline-bakup", {
               branch: branch,
               client: client,
               supplier: supplier,
               category: category,
               product: product,
               sale: sale,
               sale_product: sale_product,
               user_role: user_role,
               user: user
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
      const getBranchId = computed(() => {
         return store.getters["getBranchId"];
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
