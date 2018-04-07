<template>
  <v-app>
    <v-toolbar dark color="teal lighten-3" v-if="userIsAuth">
      <v-toolbar-items>
        <v-btn flat to="/chatlist" @click="userIsAuth = true">
          <v-icon class="mr-2">message</v-icon>
          채팅
        </v-btn>
        <v-btn flat to="/setting" @click="userIsAuth = true">
          <v-icon class="mr-2">settings</v-icon>
          설정
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import * as firebase from 'firebase'

export default {
  data () {
    return {
      userIsAuth: false
    }
  },
  name: 'App',
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .toolbar__items{
    width: 100%;
    a{
      width: 50%;
    }
  }
</style>

