<template>
  <v-app>
    <v-toolbar fixed>
      <v-toolbar-title>Bot Roster</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content style="margin-top: 70px">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
