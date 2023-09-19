<template >
    <v-sheet class="bg-deep-purple pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <h1>User Login</h1>
                <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="Username"></v-text-field>

                <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                    placeholder="Enter your password"></v-text-field>

                <br>

                <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated">
                    Sign In
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script>
export default {
    data: () => ({
        form: false,
        email: null,
        password: null,
        loading: false,
        users: new Map(),

    }),

    methods: {
        loadIn(){
            this.users.set("ivan","pass123");
            this.users.set("justin","pass1234");
        },
        onSubmit() {
            var temp = this.email;
            if (this.users.has(temp)){
                if(this.users.get(temp) == this.password){
                    console.log("success");
                    this.email = "";
                    this.password = "";
                    
                }
            }

            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        required(v) {
            return !!v || 'Field is required'
        },
    },
    beforeMount(){
        this.loadIn();
    },
}
</script>