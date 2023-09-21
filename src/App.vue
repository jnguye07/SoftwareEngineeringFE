<template>
  <v-app  style="background-color: #193441;">
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
    // Globally stored data
  }),
};
</script>
