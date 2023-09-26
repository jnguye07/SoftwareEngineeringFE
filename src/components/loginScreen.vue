<template>
  <v-sheet class="pa-12" rounded style="background: #193441">
    <v-app-bar app style="background-color: #34424d" dark>
      <v-toolbar-title
        style="margin: 0 auto; font-size: 2.5rem; color: #f5f5f5"
      >
        Factory
      </v-toolbar-title>
      <v-btn v-if="showForm && !loginForm" @click="createAccount" color="green">
        Create Account
      </v-btn>

      <v-btn v-if="loginForm" @click="reset" color="error"> Go Back </v-btn>

      <v-btn v-if="!showForm && !loginForm" @click="reset" color="error">
        Logout
      </v-btn>
    </v-app-bar>

    <v-card
      v-if="loginForm"
      class="mx-auto px-6 py-8"
      style="background-color: #f5f5f5"
      width="40rem"
      height="29rem"
      rounded
    >
      <v-form v-model="form" @submit.prevent="">
        <h1 style="text-align: center; color: #193441">Create Account</h1>

        <v-text-field
          v-model="firstname"
          class="mb-2"
          clearable
          label="First Name"
          style="color: #193441; background-color: #f5f5f5"
        ></v-text-field>

        <v-text-field
          type="lastname"
          v-model="lastname"
          clearable
          label="Last Name"
          placeholder="Enter your Last Name"
          style="color: #193441; background-color: #f5f5f5"
        ></v-text-field>

        <v-text-field
          type="username"
          v-model="username"
          clearable
          label="Username"
          placeholder="Enter a Username"
          style="color: #193441; background-color: #f5f5f5"
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="newPassword"
          clearable
          label="Password"
          placeholder="Enter your Password"
          style="color: #193441; background-color: #f5f5f5"
        ></v-text-field>

        <br />

        <v-btn
          @click="createUserAccount"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          style="background-color: #193441"
        >
          Create Account
        </v-btn>
        <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
          {{ errorMessage }}
        </v-snackbar>
      </v-form>
    </v-card>

    <v-card
      v-if="showForm && !loginForm"
      class="mx-auto px-6 py-8"
      style="background-color: #f5f5f5"
      width="40rem"
      height="20rem"
      rounded
    >
      <v-form v-model="form" @submit.prevent="">
        <h1 style="text-align: center; color: #193441">Login</h1>
        <v-text-field
          v-model="email"
          :readonly="loading"
          class="mb-2"
          clearable
          label="Username"
          style="color: #193441; background-color: #f5f5f5"
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          :readonly="loading"
          clearable
          label="Password"
          placeholder="Enter your password"
          style="color: #193441; background-color: #f5f5f5"
        ></v-text-field>

        <br />

        <v-btn
          @click="onSubmit"
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          style="background-color: #193441"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>

    <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
      {{ errorMessage }}
    </v-snackbar>

    <v-data-table
      v-if="!showForm && !loginForm"
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      class="elevation-1"
      style="background-color: #f5f5f5; color: #193441"
    ></v-data-table>
  </v-sheet>
</template>

<script>
import orderService from "../services/orderService";
import userService from "../services/userService";
export default {
  data: () => ({
    snackbar: false,
    errorMessage: "Error, incorrect username or password",
    timeout: 2000,
    showForm: true,
    form: false,
    email: "",
    password: null,
    loading: false,
    loginForm: false,

    firstname: "",
    lastname: "",
    username: "",
    newPassword: "",

    headers: [
      {
        text: "Order ID",
        align: "start",
        sortable: false,
        value: "orderId",
      },
      { text: "Order Date", value: "orderDate" },
      { text: "Delivery Date", value: "deliveryDate" },
      { text: "Quantity", value: "qty" },
      { text: "Total Cost", value: "cost" },
      
    ],
    orders: [],
  }),

  methods: {
    createAccount() {
      this.loginForm = true;
    },
    getOrders() {
      orderService.getOrders().then((Response) => {
        console.log("reponse" , Response)
        this.orders = Response.data;
      });
    },
    reset() {
      this.showForm = true;
      this.loginForm = false;
      this.orders.splice(0, this.orders.length);
      this.email = "";
      this.password = "";
      this.errorMessage = "Error, incorrect username or password";
      this.newPassword = "";
      this.username = "";
      this.lastname = "";
      this.firstname = "";
    },
    onSubmit() {
      console.log(this.email);
      var temp = this.email;
      temp = temp.toLowerCase();
      temp = temp.replace(/\s/g, "");
      const check = userService.getUsers(temp, this.password);
      check.then((value) => {
        if (value == true) {
          setTimeout(() => (this.showForm = false), 1000);
          setTimeout(() => (this.loading = false), 500);
          this.email = "";
          this.password = "";
          this.getOrders();
        } else {
          this.snackbar = true;
          this.loading = true;
          setTimeout(() => (this.loading = false), 500);
        }
      });
    },
    createUserAccount() {
      const user = {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        passwordHash: this.newPassword,
      };
      console.log(user);
      userService.registerAccount(user).then((data) => {
        if (data == true) {
          this.reset();
        } else {
          this.errorMessage = "Username already taken";
          this.snackbar = true;
          this.loading = true;
          setTimeout(() => (this.loading = false), 500);
          console.log(data);
        }
      });
    },
  },
};
</script>
