import { createI18n } from "vue-i18n/index";

const i18n = createI18n({
   legacy: false,
   locale: "en",
   allowComposition: true,
   messages: {
      en: {
         banner: {
            inventory: "Inventory",
            system: "System"
         },
         client: {
            title: "Clients",
            subtitle: "Description about the clients view",
            table: {
               search: "Search...",
               field: {
                  id: "Id Client",
                  created: "Created",
                  updated: "Updated",
                  first_name: "First Name",
                  last_name: "Last Name",
                  address: "Address",
                  cellphone: "Cellphone",
                  cellphone2: "Cellphone 2",
                  email: "Email",
                  show_details: "Show details",
                  actions: "Actions"
               },
               content: {
                  id: "# Client",
                  created: "Date Created",
                  updated: "Date Updated",
                  first_name: "First Name",
                  last_name: "Last Name",
                  address: "Address",
                  cellphone: "Cellphone",
                  cellphone2: "Cellphone 2",
                  email: "Email",
                  details: {
                     show_details: "Show details",
                     hide_details: "Hide details",
                     empty: "Theres no data to display"
                  }
               }
            },
            window: {
               add: {
                  title: "Add Client",
                  subtitle: "The clients that will be added for the use of the system",
                  button: {
                     add: "Add"
                  }
               },
               update: {
                  title: "Update Client",
                  subtitle: "The clients that will be updated for the use of the system",
                  button: {
                     update: "Update"
                  }
               },
               delete: {
                  title: "Delete Client",
                  subtitle: "The clients that will be deleted from the system",
                  button: {
                     delete: "Delete",
                  }
               },
               see: {
                  title: "See Client",
                  subtitle: "The clients in the system",
               },
               field: {
                  id: "ID",
                  created: "Date Created",
                  updated: "Date Updated",
                  first_name: "First Name",
                  last_name: "Last Name",
                  address: "Address",
                  cellphone: "Cellphone",
                  cellphone2: "Cellphone 2",
                  email: "Email"
               },
               button: {
                  clear: "Clear",
                  close: "Close"
               }
            }
         },
         supplier: {
            title: "Suppliers",
            subtitle: "Description about the suppliers view",
            table: {
               search: "Search...",
               field: {
                  id: "Id Supplier",
                  updated: "Updated",
                  created: "Created",
                  name: "Name",
                  show_details: "Show details",
                  actions: "Actions"
               },
               content: {
                  id: "# Supplier",
                  created: "Date Created",
                  updated: "Date Updated",
                  name: "Name",
                  details: {
                     show_details: "Show details",
                     hide_details: "Hide details",
                     empty: "Theres no data to display"
                  }
               }
            },
            window: {
               add: {
                  title: "Add Supplier",
                  subtitle: "The suppliers that will be added for the use of the system",
                  button: {
                     add: "Add"
                  }
               },
               update: {
                  title: "Update Supplier",
                  subtitle: "The suppliers that will be updated for the use of the system",
                  button: {
                     update: "Update"
                  }
               },
               delete: {
                  title: "Delete Supplier",
                  subtitle: "The suppliers that will be deleted from the system",
                  button: {
                     delete: "Delete",
                  }
               },
               see: {
                  title: "See Supplier",
                  subtitle: "The suppliers in the system",
               },
               field: {
                  id: "ID",
                  created: "Date Created",
                  updated: "Date Updated",
                  name: "Name"
               },
               button: {
                  clear: "Clear",
                  close: "Close"
               }
            }
         },
         product: {
            title: "Products",
            subtitle: "Description about the products view",
            table: {
               search: "Search...",
               field: {
                  id: "Id Product",
                  created: "Created",
                  updated: "Updated",
                  code: "Code",
                  name: "Name",
                  description: "Description",
                  buy_price: "Buy Price",
                  sale_price: "Sale Price",
                  quantity: "Quantity",
                  category: "Category Name",
                  show_details: "Show details",
                  actions: "Actions"
               },
               content: {
                  id: "# Product",
                  created: "Date Created",
                  updated: "Date Updated",
                  code: "Code",
                  name: "Name",
                  description: "Description",
                  buy_price: "Buy Price",
                  sale_price: "Sale Price",
                  quantity: "Quantity",
                  details: {
                     show_details: "Show details",
                     hide_details: "Hide details",
                     empty: "Theres no data to display"
                  }
               }
            },
            window: {
               add: {
                  title: "Add Product",
                  subtitle: "The productss that will be added for the use of the system",
                  button: {
                     add: "Add"
                  }
               },
               update: {
                  title: "Update Product",
                  subtitle: "The productss that will be updated for the use of the system",
                  button: {
                     update: "Update"
                  }
               },
               delete: {
                  title: "Delete Product",
                  subtitle: "The productss that will be deleted from the system",
                  button: {
                     delete: "Delete",
                  }
               },
               see: {
                  title: "See Product",
                  subtitle: "The products in the system",
               },
               field: {
                  id: "ID",
                  created: "Date Created",
                  updated: "Date Updated",
                  code: "Code",
                  name: "Name",
                  description: "Description",
                  buy_price: "Buy Price",
                  sale_price: "Sale Price",
                  quantity: "Quantity",
                  category_name: "Category Name"
               },
               button: {
                  clear: "Clear",
                  close: "Close"
               }
            }
         },
         category: {
            title: "Categories",
            subtitle: "Description about the categories view",
            table: {
               search: "Search...",
               field: {
                  id: "Id Category",
                  created: "Created",
                  updated: "Updated",
                  name: "Name",
                  show_details: "Show details",
                  actions: "Actions"
               },
               content: {
                  id: "# Category",
                  created: "Date Created",
                  updated: "Date Updated",
                  name: "Name",
                  details: {
                     show_details: "Show details",
                     hide_details: "Hide details",
                     empty: "Theres no data to display"
                  }
               }
            },
            window: {
               add: {
                  title: "Add Category",
                  subtitle: "The categories that will be added for the use of the system",
                  button: {
                     add: "Add"
                  }
               },
               update: {
                  title: "Update Category",
                  subtitle: "The categories that will be updated for the use of the system",
                  button: {
                     update: "Update"
                  }
               },
               delete: {
                  title: "Delete Category",
                  subtitle: "The categories that will be deleted from the system",
                  button: {
                     delete: "Delete",
                  }
               },
               see: {
                  title: "See Catetgory",
                  subtitle: "The categories in the system",
               },
               field: {
                  id: "ID",
                  created: "Date Created",
                  updated: "Date Updated",
                  name: "Name"
               },
               button: {
                  clear: "Clear",
                  close: "Close"
               }
            }
         },
         user: {
            title: "Users",
            subtitle: "Description about the users view",
            table: {
               search: "Search...",
               field: {
                  id: "Id User",
                  created: "Created",
                  updated: "Updated",
                  username: "Username",
                  email: "Email",
                  password: "Password",
                  first_name: "First Name",
                  last_name: "Last Name",
                  show_details: "Show details",
                  actions: "Actions"
               },
               content: {
                  id: "# User",
                  created: "Date Created",
                  updated: "Date Updated",
                  username: "Username",
                  email: "Email",
                  password: "Password",
                  first_name: "First Name",
                  last_name: "Last Name",
                  details: {
                     show_details: "Show details",
                     hide_details: "Hide details",
                     empty: "Theres no data to display"
                  }
               }
            },
            window: {
               add: {
                  title: "Add User",
                  subtitle: "The users that will be added for the use of the system",
                  button: {
                     add: "Add"
                  }
               },
               update: {
                  title: "Update User",
                  subtitle: "The users that will be updated for the use of the system",
                  button: {
                     update: "Update"
                  }
               },
               delete: {
                  title: "Delete User",
                  subtitle: "The users that will be deleted from the system",
                  button: {
                     delete: "Delete",
                  }
               },
               see: {
                  title: "See User",
                  subtitle: "The users in the system",
               },
               field: {
                  id: "ID",
                  created: "Date Created",
                  updated: "Date Updated",
                  username: "Username",
                  email: "Email",
                  password: "Password",
                  first_name: "First Name",
                  last_name: "Last Name",
                  role_name: "Role Name"
               },
               button: {
                  clear: "Clear",
                  close: "Close"
               }
            }
         },
         user_role: {
            title: "User roles",
            subtitle: "Description about the user roles view",
            table: {
               search: "Search...",
               field: {
                  id: "Id User Role",
                  created: "Created",
                  updated: "Updated",
                  name: "Name",
                  show_details: "Show details",
                  actions: "Actions"
               },
               content: {
                  id: "# User Role",
                  created: "Date Created",
                  updated: "Date Updated",
                  name: "Name",
                  details: {
                     show_details: "Show details",
                     hide_details: "Hide details",
                     empty: "Theres no data to display"
                  }
               }
            },
            window: {
               add: {
                  title: "Add User Role",
                  subtitle: "The user roles that will be added for the use of the system",
                  button: {
                     add: "Add"
                  }
               },
               update: {
                  title: "Update User Role",
                  subtitle: "The user roles that will be updated for the use of the system",
                  button: {
                     update: "Update"
                  }
               },
               delete: {
                  title: "Delete User Role",
                  subtitle: "The user roles that will be deleted from the system",
                  button: {
                     delete: "Delete",
                  }
               },
               see: {
                  title: "See User Role",
                  subtitle: "The user roles in the system",
               },
               field: {
                  id: "ID",
                  created: "Date Created",
                  updated: "Date Updated",
                  name: "Name"
               },
               button: {
                  clear: "Clear",
                  close: "Close"
               }
            }
         },
         sale_product: {
            title: "Sale Products",
            subtitle: "Description about the sale products view",
            table: {
               search: "Search...",
               field: {
                  id: "Id Sale Product",
                  created: "Created",
                  updated: "Updated",
                  total: "Total",
                  show_details: "Show details",
                  actions: "Actions"
               },
               content: {
                  id: "# User Role",
                  created: "Date Created",
                  updated: "Date Updated",
                  total: "Total",
                  details: {
                     show_details: "Show details",
                     hide_details: "Hide details",
                     empty: "Theres no data to display"
                  }
               }
            },
            window: {
               add: {
                  title: "Add Sale Product",
                  subtitle: "The sale products that will be added for the use of the system",
                  button: {
                     add: "Add"
                  }
               },
               update: {
                  title: "Update Sale Product",
                  subtitle: "The sale products that will be updated for the use of the system",
                  button: {
                     update: "Update"
                  }
               },
               delete: {
                  title: "Delete Sale Product",
                  subtitle: "The sale products that will be deleted from the system",
                  button: {
                     delete: "Delete",
                  }
               },
               see: {
                  title: "See Sale Product",
                  subtitle: "The sale products in the system",
               },
               field: {
                  id: "ID",
                  created: "Date Created",
                  updated: "Date Updated",
                  total: "Total"
               },
               button: {
                  clear: "Clear",
                  close: "Close"
               }
            }
         },
         global: {
            default_error: "An unexpected error has occurred. Please, try again"
         }
      },
      es: {
         banner: {
            inventory: "Inventario",
            system: "Sistema"
         },
         client: {
            title: "Clientes",
            subtitle: "Descripcion acerca de la vista de clientes",
            table: {
               search: "Buscar...",
               field: {
                  id: "Id Cliente",
                  created: "Creacion",
                  first_name: "Nombres",
                  last_name: "Apellidos",
                  show_details: "Mostrtar detalles",
                  actions: "Acciones"
               },
               content: {
                  id: "# Cliente",
                  created: "Fecha de creacion",
                  updated: "Fecha de actualizacion",
                  first_name: "Nombres",
                  last_name: "Apellidos",
                  address: "Direccion",
                  cellphone: "Telefono",
                  cellphone2: "Telefono 2",
                  email: "Correo electronico",
                  details: {
                     show_details: "Mostrar detalles",
                     hide_details: "Ocultar detalles",
                     empty: "No hay informacion para mostrar"
                  }
               }
            },
            window: {
               add: {
                  title: "Agregar Cliente",
                  subtitle: "Los clientes que seran agregados para el uso del sistema",
                  button: {
                     add: "Agregar"
                  }
               },
               update: {
                  title: "Actualizar Cliente",
                  subtitle: "Los clientes que seran actualizados para el uso del sistema",
                  button: {
                     update: "Actualizar"
                  }
               },
               delete: {
                  title: "Eliminar Cliente",
                  subtitle: "Los clientes que seran eliminados del sistema",
                  button: {
                     delete: "Eliminar",
                  }
               },
               see: {
                  title: "Ver Cliente",
                  subtitle: "Los clientes del sistema",
               },
               field: {
                  id: "ID",
                  first_name: "Nombres",
                  last_name: "Apellidos",
                  address: "Direccion",
                  cellphone: "Telefono",
                  cellphone2: "Telefono 2",
                  email: "Correo electronico"
               },
               button: {
                  clear: "Limpiar",
                  close: "Cerrar"
               }
            }
         },
         global: {
            default_error: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo"
         }
      }
   }
});

export default i18n;
