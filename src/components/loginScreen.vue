<template >
    <v-sheet class="bg-deep-purple pa-12" rounded>
        <v-app-bar app color="black" dark>
            <v-toolbar-title style="margin: 0 auto; font-size: 2.5rem;">
                Order Checking
            </v-toolbar-title>
            <v-btn v-if="!showForm" @click="reset">Logout</v-btn>
        </v-app-bar>

        <v-card v-if="showForm" class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="">
                <h1 style="text-align: center;">User Login</h1>
                <v-text-field v-model="email" :readonly="loading" class="mb-2" clearable label="Username"></v-text-field>

                <v-text-field type="password" v-model="password" :readonly="loading" clearable label="Password"
                    placeholder="Enter your password"></v-text-field>

                <br>

                <v-btn @click="onSubmit" :disabled="!form" :loading="loading" block color="success" size="large"
                    type="submit" variant="elevated">
                    Sign In
                </v-btn>
            </v-form>
        </v-card>

        <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
            {{ errorMessage }}
        </v-snackbar>

        <v-data-table v-if="!showForm" :headers="headers" :items="values" :items-per-page="5"
            class="elevation-1"></v-data-table>

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
            this.values.splice(0,this.values.length);
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