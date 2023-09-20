<template>
  <v-app>

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
    //Globally stored

  }),
};
</script>
