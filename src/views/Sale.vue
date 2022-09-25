<template>
   <div class="main-container">
      <!-- <Banner /> -->
      <Menu>
         <template #left-content>
            <router-link class="q-mr-xs text-white" to="/">
               <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
            </router-link>
            <p class="q-ma-none">Sale</p>
         </template>
         <template #subtitle>
            Sales that the user will do in the system
         </template>
      </Menu>

      <Content>
         <template #content>
            <div class="sale">
               <div class="sale-favorite">
                  <div class="sale-favorite-title">
                     Favorite Items
                  </div>
                  <div class="sale-favorite-items">
                     <q-list bordered separator>
                        <q-item v-ripple clickable>
                           <q-item-section>Single line item</q-item-section>
                        </q-item>

                        <q-item v-ripple clickable>
                           <q-item-section>
                              <q-item-label>Item with caption</q-item-label>
                              <q-item-label caption>Caption</q-item-label>
                           </q-item-section>
                        </q-item>

                        <q-item v-ripple clickable>
                           <q-item-section>
                              <q-item-label overline>OVERLINE</q-item-label>
                              <q-item-label>Item with caption</q-item-label>
                           </q-item-section>
                        </q-item>
                     </q-list>
                  </div>
               </div>
               <div class="sale-content">
                  <div class="sale-indicators">
                     <div class="sale-indicator-item">
                        <div class="sale-indicator-item-top">
                           Indicator 1
                        </div>
                        <div class="sale-indicator-item-bottom">
                           $1,250.00
                        </div>
                     </div>
                     <div class="sale-indicator-item">
                        <div class="sale-indicator-item-top">
                           Indicator 2
                        </div>
                        <div class="sale-indicator-item-bottom">
                           $1,250.00
                        </div>
                     </div>
                     <div class="sale-indicator-item">
                        <div class="sale-indicator-item-top">
                           Indicator 3
                        </div>
                        <div class="sale-indicator-item-bottom">
                           $1,250.00
                        </div>
                     </div>
                     <div class="sale-indicator-item">
                        <div class="sale-indicator-item-top">
                           Indicator 4
                        </div>
                        <div class="sale-indicator-item-bottom">
                           $1,250.00
                        </div>
                     </div>
                  </div>
                  <div class="sale-options1">
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="History"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="Sales"
                     >
                     </q-btn>
                     <q-btn
                        color="primary"
                        label="Buys"
                     >
                     </q-btn>
                  </div>
                  <div class="sale-data">
                     <q-table
                        title="Treats"
                        :rows="rows"
                        :columns="columns"
                        row-key="name"
                     >
                        <template #bottom-row>
                           <q-tr>
                              <q-td colspan="100%">
                                 <div class="totals-main-container">
                                    <div class="totals-container">
                                       <div class="title">
                                          Subtotal:
                                       </div>
                                       <div class="text">
                                          $1,000.66
                                       </div>
                                    </div>
                                    <div class="totals-container">
                                       <div class="title">
                                          Total:
                                       </div>
                                       <div class="text">
                                          $1,250.00
                                       </div>
                                    </div>
                                 </div>
                              </q-td>
                           </q-tr>
                        </template>
                     </q-table>
                  </div>
                  <div class="sale-options2">
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="Other option"
                     >
                     </q-btn>
                     <q-btn
                        class="q-mr-sm"
                        color="primary"
                        label="Restore sale"
                     >
                     </q-btn>
                     <q-btn
                        color="primary"
                        label="Save sale"
                     >
                     </q-btn>
                  </div>
               </div>
            </div>
         </template>
      </Content>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
// import Banner from "@/views/layout/Banner.vue";
import Menu from "@/views/layout/Menu.vue";
import Content from "@/views/layout/Content.vue";

export default defineComponent({
   name: "sale-component",
   components: {
      // Banner,
      Menu,
      Content
   },
   setup() {
      const columns = [
      {
         name: 'name',
         required: true,
         label: 'Dessert (100g serving)',
         align: 'left',
         field: row => row.name,
         format: val => `${val}`,
         sortable: true
      },
         { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
         { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
         { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
         { name: 'protein', label: 'Protein (g)', field: 'protein' },
         { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
         { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
         { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]
      const rows = [
         {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
         },
         {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
         },
         {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
         },
         {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%'
         },
         {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%'
         },
         {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%'
         },
         {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%'
         },
         {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%'
         },
         {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%'
         },
         {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%'
         }
      ]

      return {
         columns,
         rows
      };
   }
});
</script>

<style lang="sass" scoped>
   .sale
      width: 100%
      height: auto
      display: flex
      flex-direction: row
      align-items: flex-start
      justify-content: space-between
      .sale-favorite
         width: 240px
         min-height: 647px
         max-height: 647px
         padding: 20px
         border: 1px solid #ccc
         border-radius: 4px
         color: #000
         background-color: #fff
         box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
         overflow-y: auto
         background: white
         .sale-favorite-title
            font-size: 20px
            text-align: center
            margin-bottom: 10px
      .sale-content
         width: calc(100% - 240px - 20px)
         .sale-indicators
            display: flex
            flex-direction: row
            align-items: center
            justify-content: center
            margin-bottom: 10px
            .sale-indicator-item
               padding: 20px
               &:not(:last-child)
                  border-right: 1px solid #ccc
               .sale-indicator-item-top
                  text-align: center
                  font-size: 17px
                  font-weight: bold
                  color: #ccc
                  text-transform: uppercase
               .sale-indicator-item-bottom
                  text-align: right
                  font-size: 20px
                  font-weight: bold
         .sale-options1
            width: 100%
            display: block
            text-align: right
            margin-bottom: 10px
            // button
         .sale-data
            margin-bottom: 10px
            // table
         .sale-options2
            width: 100%
            display: block
            text-align: right
            // margin-bottom: 10px
            // button

   .totals-main-container
      display: flex
      flex-direction: row
      align-items: center
      justify-content: flex-end
      .totals-container
         width: 160px
         padding: 20px
         background: orange
         border: 1px solid #ccc
         border-radius: 4px
         color: #000
         background-color: #fff
         box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
         &:not(:last-child)
            margin-right: 10px
         .title
            text-align: left
            font-size: 17px
            font-weight: bold
            margin-bottom: 5px
         .text
            text-align: right
</style>
