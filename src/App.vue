<template>
  <v-app>
    <v-toolbar class="text-xs-center" dark color="teal lighten-3" v-if="user">
      <v-toolbar-title class="white--text">firebase chat</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-tabs icons-and-text centered dark color="teal lighten-3" v-if="user">
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

export default {
  data () {
    return {
      userIsAuth: false
    }
  },
  name: 'App',
  methods: {
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="scss">
  .toolbar__content .toolbar__title {
    margin: 0 auto;
  }
  .content {
    width: 100%;
    height: auto;
  }
  .tabs .tabs__div {
    width: 50%;
  }
</style>

