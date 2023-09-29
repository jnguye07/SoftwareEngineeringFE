<template>
  <v-app  style="background-color: #193441;">
    <component v-bind:is="component"></component>
    <v-btn max-width='100px' size="large" color="success" v-on:click="component='login-screen'">Login</v-btn>
    <v-btn max-width='100px' size="large" color="success" v-on:click="component='inventory-screen'">Inventory</v-btn>  
  </v-app>
</template>

<script>
import loginScreen from './components/loginScreen.vue';
import inventoryScreen from './components/inventoryScreen.vue';

export default {
  name: 'App',

  components: {
    'login-screen': loginScreen,
    'inventory-screen': inventoryScreen
  },

  data() {
    return {
      component: {
        screen: 'login-screen'  
      }
    }
  }
};
</script>
