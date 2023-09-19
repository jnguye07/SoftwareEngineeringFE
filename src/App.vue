<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <v-toolbar-title style="margin: 0 auto; font-size: 2.5rem;">
        Order Checking
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <LoginScreen></LoginScreen>
    </v-main>
  </v-app>
</template>

<script>
import LoginScreen from './components/loginScreen.vue';

export default {
  name: 'App',

  components: {
    LoginScreen
  },

  data: () => ({
    //
  }),
};
</script>
