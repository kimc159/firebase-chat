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
    top: 56px;
    width: 100%;
    height: 100%;
    .subheader {
      padding: 10px;
    }
  }
  .tabs {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    .tabs__div {
      width: 50%;
    }
  }
</style>

