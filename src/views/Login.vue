<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-form @submit.prevent="submit">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Login form</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field v-model="email" label="Login" name="login" prepend-icon="person" type="text" />
                                <v-text-field v-model="password" id="password" label="Password" name="password" prepend-icon="lock" type="password" />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary" type="submit">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data() {
        return {
            email: null,
            password: null,
        }
    },
    methods: {
        submit() {
            console.log(`Email is ${this.email} and Password is ${this.password}`)
        }
    }
  }
</script>