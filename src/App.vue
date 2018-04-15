<template>
  <v-app>
    <v-toolbar class="text-xs-center" dark color="teal lighten-3" v-if="user && !chatRoomIn">
      <v-toolbar-title class="white--text">firebase chat</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-tabs icons-and-text centered dark color="teal lighten-3" v-if="user && !chatRoomIn">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab href="#tab-1" to="/userlist" @click="userIsAuth = true">
        <v-icon class="mr-2">person</v-icon>
        친구
      </v-tab>
      <v-tab href="#tab-2" to="/chatlist" @click="userIsAuth = true">
        <v-icon class="mr-2">message</v-icon>
        채팅
      </v-tab>
      <v-tab href="#tab-3" to="/setting" @click="userIsAuth = true">
        <v-icon class="mr-2">settings</v-icon>
        설정
      </v-tab>
    </v-tabs>
  </v-app>
</template>

<script>
import * as firebase from 'firebase'

export default {
  data () {
    return {
      auth: firebase.auth(),
      userIsAuth: false
    }
  },
  name: 'App',
  mounted () {
    console.log(this.userIsAuth)
    const currentUser = []
    this.auth.onAuthStateChanged(function (user) {
      if (user) {
        currentUser.push({
          name: user.displayName,
          email: user.email
        })
        console.log('user 로그인 : ', JSON.stringify(user))
      } else {
        console.log('로그아웃')
      }
    })
    console.log(currentUser)
    this.$store.dispatch('setUser', currentUser)
  },
  methods: {
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    chatRoomIn () {
      return this.$store.getters.chatRoomIn
    }
  }
}
</script>

<style lang="scss">
  .toolbar {
    position: absolute;
    top: 0;
    z-index: 10;
  }
  .toolbar__content .toolbar__title {
    margin: 0 auto;
  }
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    .subheader {
      padding: 10px;
    }
  }
  .btn_wrap {
    button, a {
      margin: auto;
    }
  }
  .tabs {
    position: fixed !important;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    .tabs__div {
      width: 50%;
    }
  }
</style>

