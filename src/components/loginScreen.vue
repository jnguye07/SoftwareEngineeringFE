<template>
    <v-sheet class="pa-12" rounded style="background: #193441">
        <v-app-bar app style="background-color: #34424D;" dark>
            <v-toolbar-title style="margin: 0 auto; font-size: 2.5rem; color: #f5f5f5;">
                Order Checking
            </v-toolbar-title>
            <v-btn v-if="!showForm" @click="reset" color="error">
                Logout
            </v-btn>
        </v-app-bar>

        <v-card v-if="showForm" class="mx-auto px-6 py-8" style="background-color: #f5f5f5;" width="40rem" height="20rem"
            rounded>
            <v-form v-model="form" @submit.prevent="">
                <h1 style="text-align: center; color: #193441;">Login</h1>
                <v-text-field v-model="email" :readonly="loading" class="mb-2" clearable label="Username"
                    style="color: #193441; background-color: #f5f5f5;"></v-text-field>

                <v-text-field type="password" v-model="password" :readonly="loading" clearable label="Password"
                    placeholder="Enter your password" style="color: #193441; background-color: #f5f5f5;"></v-text-field>

                <br>

                <v-btn @click="onSubmit" :disabled="!form" :loading="loading" block color="success" size="large"
                    type="submit" variant="elevated" style="background-color: #193441;">
                    Sign In
                </v-btn>
            </v-form>
        </v-card>


        <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
            {{ errorMessage }}
        </v-snackbar>

        <v-data-table v-if="!showForm" :headers="headers" :items="values" :items-per-page="5" class="elevation-1"
            style="background-color: #f5f5f5; color: #193441;"></v-data-table>Wel


    </v-sheet>
</template>

<script>
import ivanOrderHistory from '../ivanOrderHistory.json'
import josephOrderHistory from '../josephOrderHistory.json'
export default {

    data: () => ({
        snackbar: false,
        errorMessage: 'Error, incorrect username or password',
        timeout: 2000,
        showForm: true,
        form: false,
        email: null,
        password: null,
        loading: false,
        users: new Map(),

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
        ],
        values: []
    }),

    methods: {
        printEm(temp) {
            if (temp === 'ivan') {
                ivanOrderHistory.orderHistory.forEach((element) => {
                    this.values.push(element)
                })
            } else {
                josephOrderHistory.orderHistory.forEach((element) => {
                    this.values.push(element)
                })
            }
        },
        reset() {
            this.showForm = !this.showForm;
            this.values.splice(0, this.values.length);
        },
        loadIn() {
            this.users.set("ivan", "pass123");
            this.users.set("joseph", "pass1234");
        },
        onSubmit() {
            var temp = this.email;
            temp = temp.toLowerCase();
            temp = temp.replace(/\s/g, '');
            if (this.users.has(temp)) {
                if (this.users.get(temp) == this.password) {
                    this.email = "";
                    this.password = "";
                    setTimeout(() => (this.showForm = false), 1000);
                    setTimeout(() => (this.loading = false), 500);
                    console.log(temp);
                    this.printEm(temp);
                } else {
                    this.snackbar = true;
                    this.loading = true;
                    setTimeout(() => (this.loading = false), 500);
                }
            } else {
                this.snackbar = true;
                this.loading = true;
                setTimeout(() => (this.loading = false), 500);
            }
        },
    },
    beforeMount() {
        this.loadIn();
    },
}
</script>