<template>
  <v-app-bar app id="app-toolbar">
    <v-toolbar-title>AI Text Editor</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-checkbox
    v-model="local_server"
    @change="changedLocalServer()"
    :ripple='false'
    class="check-box"
    ></v-checkbox>
    <p style="margin: 0px;"><span style='color: #888888;'>Run on local server? (requires to download and setup the <a href="https://github.com/WeazelDev/AITextGenerator" target="_blank">project</a>)</span></p>
    <v-text-field
    label="Local port"
    placeholder="7777"
    outlined
    dense
    v-model="local_port"
    :rules="[validatePort]"
    style="padding-top: 10px; padding-left: 20px; max-width: 100px;"
    ></v-text-field>

    <v-spacer></v-spacer>

    <!-- <div style="width: 65%; font-size:14px; color:grey;">
        <v-icon>mdi-alert-box</v-icon>
        Text entered in the editor will be sent, analysed and registered on our server for analysis. Check Home page for further details.
    </div> -->
    <v-toolbar-items>

        <router-link to='/'>
            <v-btn text>Home</v-btn>
        </router-link>
        <router-link to='/editor'>
            <v-btn text>Editor</v-btn>
        </router-link>
        <router-link to='/share'>
            <v-btn text>Share</v-btn>
        </router-link>
        <router-link to='/feedback'>
            <v-btn text>Feedback</v-btn>
        </router-link>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            local_server: false,
            local_port: ""
        }
    },
    created() {
        this.changedLocalServer()
    },
    methods: {
        changedLocalServer() {
            localStorage["local_server"] = this.local_server ? '1' : '0'

            if (this.local_port == "" || !this.validatePort(this.local_port)) {
                localStorage["local_port"] = "7777"
            } else {
                localStorage["local_port"] = this.local_port
            }
        },
        validatePort(port) {
            if (port == "") {
                return true
            }
            let num = parseInt(port)
            if (isNaN(num)) {
                return false
            }
            let forbiden_ports = [25, 80, 443, 20, 21, 23, 143, 3389, 22, 53, 67, 68, 110]
            if (forbiden_ports.includes(num)) {
                return false
            }
            return port.length > 0 && port.length < 6
        }
    }
}
</script>

<style>
#app-toolbar {
    align-items: stretch;
    height: 60px;
    max-height: 60px;
    width: 100vw;
    max-width: 100vw;
}

#app-toolbar div {
    padding-top: 0px;
    padding-bottom: 0px;
    max-height: 100%;
}

#app-toolbar button {
    height: 100%;
    border-radius: 0px;
}

#app-toolbar a {
    text-decoration: none;
}

.check-box > div {
    display: flex;
    flex-flow: row;
    margin-top: 7px;
}
</style>