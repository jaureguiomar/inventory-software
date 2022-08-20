import Vue from "vue";
import VueI18n from "vue-i18n";

const messages = {
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
               first_name: "First Name",
               last_name: "Last Name",
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
            field: {
               id: "ID",
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
};

Vue.use(VueI18n);
const i18n = new VueI18n({ messages, locale: "en" });

export default i18n;
