<template>
  <v-data-table
    :headers="headers"
    :items="inventory"
    class="elevation-1"
  >
  <template v-slot:[`item.itemQuantity`]="{ item }">
    <v-text-field v-model="item.itemQuantity" type="number" min="0" default="0">
    </v-text-field>
  </template>

  <template v-slot:[`item.itemPurchase`]="{item}">
        <v-btn class="mx-2" fab dark small color="black" @click="onButtonClick(item.itemQuantity)">
          <v-icon dark>mdi-cart-variant</v-icon>
        </v-btn>
  </template>

  <template v-slot:footer>
    Grand Total:{{inventory.reduce((itemTotal, curr) => (itemTotal = itemTotal + (curr.cost*curr.itemQuantity)), 0)}}
  </template>
  

  </v-data-table>
  
</template>
<script>
  import inventoryService from '../services/inventoryService'
  
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Item',
            align: 'left',
            sortable: false,
            value: 'itemName'
          },
          { text: 'Description', value: 'description', sortable: false},
          { text: 'Price', value: 'cost', sortable: false},
          { text: 'Quantity', value: 'itemQuantity', width:'100px',sortable: false},
          { text: 'Purchase', value: 'itemPurchase', sortable:false}
        ],
        inventory: []
      }
    },
    methods: {
        getInventory() {
            inventoryService.getInventory().then((Response) => {
                this.inventory = Response.data
            })
        },
        onButtonClick(item) {
          console.log(item)
        },
  },
  created: function() {
    this.getInventory()
  }
}
</script>