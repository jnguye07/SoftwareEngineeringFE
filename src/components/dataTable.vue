<template>
  <v-data-table
    :headers="headers"
    :items="this.sample"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Order ID",
          align: "start",
          sortable: false,
          value: "orderId",
        },
        { text: "Creation Date", value: "creationDate" },
        { text: "Quantity", value: "qty" },
        { text: "Total Cost", value: "totalCost" },
      ]
    };
  },
  beforeCreate() {
    const sample = require("../ivanOrderHistory.json");
    console.log(sample);
  },
};
</script>
