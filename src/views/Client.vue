<template>
   <div class="main-container">
      <Banner />
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">{{ t("client.title") }}</p>
         </template>
         <template #right-content>
            <a class="q-mr-sm text-white cursor-pointer" @click="onClientAddWindowClick">
               <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            </a>
            <a class="text-white cursor-pointer" @click="onRefreshData">
               <font-awesome-icon icon="fa-solid fa-arrows-rotate"></font-awesome-icon>
            </a>
         </template>
         <template #subtitle>
            {{ t("client.subtitle") }}
         </template>
      </Menu>

      <Content>
         <template #content>
            <q-table
               title="Client List"
               :rows="client"
               :columns="clientColumns"
               :no-data-label="t('client.table.content.details.empty')"
               :no-results-label="t('client.table.content.details.empty')"
               separator="vertical"
               virtual-scroll
               :virtual-scroll-sticky-size-start="48"
               row-key="first_name"
               :visible-columns="clientVisibleColumns"
               :pagination="clientPagination"
               :filter="clientFilter"
            >
               <template #top>
                  <h6 class="q-ma-none q-mr-md">Client List</h6>
                  <q-input v-model="clientFilter" dense debounce="300" placeholder="Search">
                     <template #append>
                        <font-awesome-icon icon="fa-solid fa-search" size="1x" />
                     </template>
                  </q-input>

                  <q-space></q-space>

                  <q-select
                     v-model="clientVisibleColumns"
                     multiple
                     outlined
                     dense
                     options-dense
                     :display-value="$q.lang.table.columns"
                     emit-value
                     map-options
                     :options="clientColumns"
                     option-value="name"
                     options-cover
                     style="min-width: 150px"
                  >
                  </q-select>
               </template>

               <template #body-cell-actions="props">
                  <q-td :props="props">
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="See"
                        @click="onClientSeeWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="secondary"
                        label="Update"
                        @click="onClientUpdateWindowClick(props.row)"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="negative"
                        label="Delete"
                        @click="onClientDeleteWindowClick(props.row)"
                     >
                     </q-btn>
                  </q-td>
               </template>

               <template #no-data="{ icon, message, filter }">
                  <div class="full-width row flex-center q-gutter-sm">
                     <span>
                        {{ message }}
                     </span>
                     <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon"></q-icon>
                  </div>
               </template>
            </q-table>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue"
import { ClientResponse, WindowResponse, Client } from "../interfaces/client/client";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "@/plugins/axios";
import { key } from "@/plugins/store";
import { getFormattedDate, getFormattedDateString } from "@/plugins/mixins";
import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "client-component",
   components: {
      Banner,
      Menu,
      Content
   },
   setup() {
      const { t } = useI18n();
      const store = useStore(key);
      const client = ref<Client[]>([]);
      const clientVisibleColumns = ref<Array<string>>([ "id", "created", "updated", "first_name", "last_name", "actions" ]);
      const clientFilter = ref("");
      const clientPagination = reactive({
         sortBy: "desc",
         descending: false,
         page: 1,
         rowsPerPage: 5
         // rowsNumber: xx if getting data from a server
      });
      const clientColumns:Array<any> = [
         {
            name: "id",
            // required: true,
            label: t("client.table.field.id"),
            align: "center",
            field: "id",
            sortable: true,
            sort: (id:string) => {
               return parseInt(id);
            },
            format: (id:string) => {
               return "#" + id;
            }
         },
         {
            name: "created",
            label: t("client.table.field.created"),
            align: "center",
            field: "created",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "updated",
            label: t("client.table.field.updated"),
            align: "center",
            field: "updated",
            sortable: true,
            format: (date:string) => {
               return getFormattedDateString(date);
            }
         },
         {
            name: "first_name",
            label: t("client.table.field.first_name"),
            align: "center",
            field: "first_name",
            sortable: true
         },
         {
            name: "last_name",
            label: t("client.table.field.last_name"),
            align: "center",
            field: "last_name",
            sortable: true
         },
         {
            name: "actions",
            label: t("client.table.field.actions"),
            align: "center",
            sortable: true
         }
      ];

      const getClientLoadedReply = computed(() => {
         return store.getters["getClientLoadedReply"];
      });

      const onRefreshData = () => {
         client.value = [];

         axios.get<ClientResponse>("client/v3/select-all.php")
            .then((response) => {
               if(response) {
                  if(!response.data.error.is_error) {
                     const data = response.data.data;
                     client.value = data;
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
            });
      };
      const onClientAddWindowClick = () => {
         window.api.send("client-module-window", {
            id: -1,
            type: "add",
            content: {
               title: t("client.window.add.title"),
               description: t("client.window.add.subtitle")
            },
            data: null
         });
      };
      const onClientSeeWindowClick = (item:Client) => {
         window.api.send("client-module-window", {
            id: item.id,
            type: "see",
            data: {
               first_name: item.first_name,
               last_name: item.last_name,
               address: item.address,
               cellphone: item.cellphone,
               cellphone2: item.cellphone2,
               email: item.email
            }
         });
      };
      const onClientUpdateWindowClick = (item:Client) => {
         window.api.send("client-module-window", {
            id: item.id,
            type: "update",
            content: {
               title: t("client.window.update.title"),
               description: t("client.window.update.subtitle")
            },
            data: {
               first_name: item.first_name,
               last_name: item.last_name,
               address: item.address,
               cellphone: item.cellphone,
               cellphone2: item.cellphone2,
               email: item.email
            }
         });
      };
      const onClientDeleteWindowClick = (item:Client) => {
         window.api.send("client-module-window", {
            id: item.id,
            type: "delete",
            data: {
               first_name: item.first_name,
               last_name: item.last_name,
               address: item.address,
               cellphone: item.cellphone,
               cellphone2: item.cellphone2,
               email: item.email
            }
         });
      };

      onRefreshData();
      if(!getClientLoadedReply) {
         window.api.receive("main-window-client-module-reply", (data:WindowResponse) => {
            if(data.result === "success") {
               if(data.type === "add") {
                  if(data.data)
                     client.value.push(data.data);
               } else if(data.type === "update") {
                  let finded_index = -1;
                  for(let i = 0; i < client.value.length; i++) {
                     const curr_client = client.value[i];
                     if(curr_client.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0) {
                     if(data.data) {
                        client.value[finded_index].id = data.data.id;
                        client.value[finded_index].is_active = data.data.is_active;
                        client.value[finded_index].created = data.data.created;
                        client.value[finded_index].updated = data.data.updated;
                        client.value[finded_index].first_name = data.data.first_name;
                        client.value[finded_index].last_name = data.data.last_name;
                        client.value[finded_index].address = data.data.address;
                        client.value[finded_index].cellphone = data.data.cellphone;
                        client.value[finded_index].cellphone2 = data.data.cellphone2;
                        client.value[finded_index].email = data.data.email;
                     }
                  }
               } else if(data.type === "delete") {
                  let finded_index = -1;
                  for(let i = 0; i < client.value.length; i++) {
                     const curr_client = client.value[i];
                     if(curr_client.id == data.id) {
                        finded_index = i;
                        break;
                     }
                  }
                  if(finded_index > 0)
                     client.value.splice(finded_index, 1);
               }
            }
         });
         store.commit("SET_CLIENT_LOADED_REPLY", true);
      }

      return {
         t,
         client,
         clientVisibleColumns,
         clientColumns,
         clientFilter,
         clientPagination,
         getClientLoadedReply,
         onRefreshData,
         onClientAddWindowClick,
         onClientSeeWindowClick,
         onClientUpdateWindowClick,
         onClientDeleteWindowClick,
         getFormattedDate,
         getFormattedDateString
      }
   }
});
</script>

<style lang="sass" scoped></style>
