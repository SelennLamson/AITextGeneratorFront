<template>
  <v-app-bar app id="app-toolbar">
    <v-toolbar-title>AI Text Editor</v-toolbar-title>
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
      <router-link to='/feedback'>
        <v-btn text>Feedback</v-btn>
      </router-link>
    </v-toolbar-items>
  </v-app-bar>
</template>

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
</style>