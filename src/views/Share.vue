<template>
    <v-container class='background' fluid>
        <v-row justify='center' class='page-row'>
            <v-col class='page-col' cols=8>
                <div class='page-body'
                v-bar="{preventParentScroll: true, scrollThrottle: 30}">
                    <div class='page-content'>
                        <p>Here you can share your best text generations and read from other users.
                        Please share text which is suitable for all audiences, and most of all, have fun!<br/>
                        Note that the texts you share are made public and that we might use them in
                        our academic paper if they feat our needs.</p>

                        <v-form style="margin-bottom: -20px; margin-top: -15px;">
                            <v-text-field v-model="pseudo" maxlength="24" counter style="width: 250px; margin-bottom: 10px;"
                            label="Pseudonym (optional)" prepend-icon="person" type="text" />
                            <v-textarea v-model="message"
                                class="message-area"
                                label="Message"
                                counter
                                maxlength="1000"
                                full-width
                                no-resize
                                height="20vh"
                                outlined />
                        </v-form>

                        <v-btn color="#09a15a"
                            style="color: white !important;"
                            :disabled='!canSubmit'
                            
                            @click='postMessage'>
                                Share
                        </v-btn>

                        <div style="width: 100%; border-bottom: solid rgb(230, 230, 230) 1px; margin: 20px; margin-left: 0px;"></div>

                        The last hundred shared texts: <br/>

                        <div class="text-center" style="margin-top: 13vh;"
                        v-if="messagesLoading">
                            <v-progress-circular
                            :size="70"
                            :width="1"
                            color="grey"
                            indeterminate
                            ></v-progress-circular>
                        </div>

                        <v-card color='#fafafa' elevation="2"
                        v-for="mess in messages" :key='mess.date' class='message-entry'>
                            <v-icon class="open-quote-icon">mdi-format-quote-open</v-icon>
                            <v-card-text class='message-text' v-text="mess.text" />
                            <v-icon class="close-quote-icon">mdi-format-quote-close</v-icon>
                            <v-card-text class='message-pseudo' v-text="mess.pseudo" />
                        </v-card>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- Error notification: unable to connect to server -->
        <v-snackbar v-model="snackbar.error" color='red lighten-1'>
            Unable to connect to server...
            <v-btn color="white" text @click="snackbar.error = false">Close</v-btn>
        </v-snackbar>

        <!-- Confirm notification: message received -->
        <v-snackbar v-model="snackbar.confirm" color='green lighten-1'>
            Thanks for sharing your text!
            <v-btn color="white" text @click="snackbar.confirm = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
// Imports
import config from './../config';
import axios from 'axios';

// Scripted elements
export default {
    components: {
    },

    // Properties
    data() {
        return {
            messages: [],
            message: '',
            pseudo: '',
            messagesLoading: true,
            snackbar: {
                error: false,
                confirm: false
            },
            backend: config.BACKEND
        }
    },

    // Dynamic values for HTML template
    computed: {
        canSubmit() {
            return this.message.length > 10;
        }
    },

    // Initialization
    created() {
        this.loadMessages();
        setInterval(() => {
            this.loadMessages();
        }, 10*1000);
    },

    // Methods
    methods:{
        // Retrieves the last hundred messages posted on server
        loadMessages() {
            let params = {
                order: 'getshared'
            };

            let me = this;

            axios({
                method: 'post',
                url: this.backend,
                timeout: 1 * 1000,
                data: params,
            })
            .then(function (response) {
                // Response received: success
                me.messages = [];
                me.messagesLoading = false;

                let newMessages = response.data.split("||")
                for (let i = 0; i < newMessages.length; i++) {
                    if (newMessages[i] != "") {
                        let elts = newMessages[i].split("|", 3)
                        me.messages.push({
                            text: elts[0],
                            pseudo: elts[1],
                            date: elts[2]
                        });
                    }
                }
            })
            .catch(function (error) {
                // No response received: error
                console.log(error);
                me.snackbar.error = true;
            });
        },

        // Posts a text on the server
        postMessage() {
            let me = this;

            let params = {
                    order: 'share',
                    pseudo: this.pseudo,
                    text: this.message
            };

            axios({
                method: 'post',
                url: this.backend,
                timeout: 2 * 1000,
                data: params,
            })
            .then(function () {
                // Response received: success
                me.message = ''
                me.pseudo = ''
                me.snackbar.confirm = true;
            })
            .catch(function (error) {
                // No response received: error
                console.log(error);
                
                me.snackbar.error = true;
            });

            this.loadMessages();
        }
    },
};
</script>

<style lang="scss">
@import 'share.scss';
</style>
