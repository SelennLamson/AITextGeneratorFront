<template>
  <v-footer app id="footer">
    <v-spacer></v-spacer>
    <div>Made with Vuetify by <a href="http://thomas-lamson.com/" target="_blank">Thomas Lamson</a>, All rights reserved &copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<style>
#footer {
    font-size: 14px;
    background-color: #d6d6d6;
    height: 30px;
    max-height: 30px;
    width: 100vw;
    max-width: 100vw;
}
</style>