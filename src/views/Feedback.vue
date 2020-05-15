<template>
    <v-container class="fill-height background" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8">
                <v-form>
                    <v-card class="feedback-form">
                        <v-toolbar flat>
                            <v-toolbar-title>Tell us what you think of this tool!</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field v-model="email" label="Email (optional)" name="login" prepend-icon="person" type="text" />
                                <v-textarea v-model="message"
                                    class="message-area"
                                    label="Message"
                                    counter
                                    maxlength="1000"
                                    full-width
                                    no-resize
                                    height="55vh"
                                    outlined />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary"
                            :disabled='!canSubmit'
                            @click='submitFeedback'>
                                Submit
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>

        <!-- Error notification: unable to connect to server -->
        <v-snackbar v-model="snackbar.error" color='red lighten-1'>
            Unable to connect to server...
            <v-btn color="white" text @click="snackbar.error = false">Close</v-btn>
        </v-snackbar>

        <!-- Confirm notification: feedback received -->
        <v-snackbar v-model="snackbar.confirm" color='green lighten-1'>
            Thanks for your feedback!
            <v-btn color="white" text @click="snackbar.confirm = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import axios from 'axios';
import config from './../config';
export default {
    props: {
        source: String,
    },
    data() {
        return {
            email: null,
            message: "",
            snackbar: {
                error: false,
                confirm: false
            },
            backend: config.BACKEND
        }
    },
    computed: {
        canSubmit() {
            return this.message.length > 10;
        }
    },
    methods: {
        submitFeedback() {
            let local = localStorage["local_server"] !== undefined && localStorage["local_server"] == '1'
            let localPort = localStorage["local_port"] !== undefined ? localStorage["local_port"] : "7777"
            let localIp = "http://localhost:" + localPort + "/"

            let me = this;

            let params = {
                    order: 'feedback',
                    mail: this.email,
                    message: this.message
            };

            axios({
                method: 'post',
                url: local ? localIp : this.backend,
                timeout: 2 * 1000,
                data: params,
            })
            .then(function () {
                // Response received: success

                me.message = ''
                me.email = ''
                
                me.snackbar.confirm = true;
            })
            .catch(function (error) {
                // No response received: error
                console.log(error);
                
                me.snackbar.error = true;
            });
        }
    }
}
</script>

<style>
.background {
    background-color: #eeeeee;
    align-items: flex-start;
    height: 100%;
    padding: 0px;
}

.feedback-form {
    max-height: 85vh;
    overflow: auto;
}
</style>