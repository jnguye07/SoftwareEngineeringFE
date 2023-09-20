<template >
    <v-sheet class="bg-deep-purple pa-12" rounded>
        <v-card v-if="showForm" class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="">
                <h1>User Login</h1>
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
        <dataTable v-if="!showForm"></dataTable>
    </v-sheet>
</template>

<script>
import dataTable from './dataTable.vue'

export default {

    components: {
        dataTable
    },
    props: ['isLoggedIn'],

    data: () => ({
        showForm: true,
        form: false,
        email: null,
        password: null,
        loading: false,
        users: new Map(),

    }),

    methods: {
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
                    console.log("success");
                    this.email = "";
                    this.password = "";
                    this.showForm = false;
                }
            }

            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
    beforeMount() {
        this.loadIn();
    },
}
</script>