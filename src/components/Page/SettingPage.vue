<template>
  <v-layout row class="settingListWrap">
    <v-flex xs12>
      <v-card>
        <v-list two-line subheader>
          <v-subheader>setting</v-subheader>
          <v-list-tile avatar v-for="item in items" :key="item.title">
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="blue-grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile v-for="item in items2" :key="item.title" avatar>
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="blue-grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="signout">
            <v-list-tile-avatar>
              <v-icon class="teal lighten-3 white--text">exit_to_app</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>로그아웃</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="blue-grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      items: [
        {icon: 'volume_mute', iconClass: 'teal lighten-3 white--text', title: '공지사항'},
        {icon: 'room', iconClass: 'teal lighten-3 white--text', title: '실험실'},
        {icon: 'new_releases', iconClass: 'teal lighten-3 white--text', title: '버전정보'}
      ],
      items2: [
        {icon: 'chat_bubble', iconClass: 'teal lighten-3 white--text', title: '채팅'},
        {icon: 'lock', iconClass: 'teal lighten-3 white--text', title: '개인/보안'},
        {icon: 'add_alert', iconClass: 'teal lighten-3 white--text', title: '알림'},
        {icon: 'perm_identity', iconClass: 'teal lighten-3 white--text', title: '친구'},
        {icon: 'more_horiz', iconClass: 'teal lighten-3 white--text', title: '기타'},
        {icon: 'help', iconClass: 'teal lighten-3 white--text', title: '고객센터/도움말'}
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value === null || value === undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    signout () {
      console.log('signout')
      alert('로그아웃 되었습니다.')
      this.$store.dispatch('signout')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
#app > div > main > div .settingListWrap {
  margin-top: 50px;
}
.list--two-line .list__tile {
  height: 50px;
}
.content--wrap {
  width: 100%;
  height: 100%;
}
.content--wrap .layout {
  width: 100%;
  height: 100%;
  .flex {
    width: 100%;
    height: 100%;
  }
  .card {
    width: 100%;
    height: 500px !important;
  }
  .list {
    width: 100%;
    height: 100%;
    > div {
      height: 10%;
    }
  }
}

</style>
