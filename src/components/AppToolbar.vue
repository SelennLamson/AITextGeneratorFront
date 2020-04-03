<template>
  <v-app-bar app id="app-toolbar">
    <v-toolbar-title>AI Text Editor</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <router-link to='/'>
        <v-btn text>Home</v-btn>
      </router-link>
      <router-link to='/editor'>
        <v-btn text>Editor</v-btn>
      </router-link>
      <router-link to='/login'>
        <v-btn text>Login</v-btn>
      </router-link>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style>
#app-toolbar {
    align-items: stretch;
    height: 7vh;
    max-height: 7vh;
}

#app-toolbar button {
    height: 100%;
    border-radius: 0px;
}

#app-toolbar a {
    text-decoration: none;
}
</style>