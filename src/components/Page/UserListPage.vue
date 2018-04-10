<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list subheader>
          <v-subheader>친구</v-subheader>
          <v-list-tile avatar v-for="item in items" :key="item.name" :data-uid="item.uid" @click="onUserListClick">
            <v-list-tile-avatar>
              <img :src="item.profile">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as firebase from 'firebase'
export default {
  data () {
    return {
      auth: firebase.auth(),
      MAKEID_CHAR: '@make@',
      DATETIME_CHAR: '@time@',
      roomTitle: '',
      roomUserList: '',
      roomUserName: '',
      roomId: '',
      idOpenRoom: false,
      date: new Date()
    }
  },
  mounted () {
    this.$store.dispatch('userList')
  },
  computed: {
    items () {
      return this.$store.getters.userList
    }
  },
  methods: {
    onUserListClick (event) {
      const targetUserUid = event.currentTarget.childNodes[0].getAttribute('data-uid')
      const targetUserName = event.target.innerText
      this.roomTitle = targetUserName + '님'
      const currentUserUid = this.auth.currentUser.uid
      const currentUserName = this.auth.currentUser.displayName
      this.roomUserList = [targetUserUid, currentUserUid]
      this.roomUserName = [targetUserName, currentUserName]
      this.roomId = this.MAKEID_CHAR + currentUserUid + this.DATETIME_CHAR + this.date
      this.openChatRoom(this.roomId, this.roomTitle)
    },
    openChatRoom (roomId, roomTitle) {
      this.isOpenRoom = true
      this.$store.dispatch('chatRoomIn', true)
      this.$router.push('room/' + roomId + '-' + roomTitle)
    }
  }
}
</script>

<style lang="scss" scoped>
  .content .layout {
    height: 100%;
    margin-top: 56px;
    .flex {
      height: 100%;
    }
    .card {
      height: 100% !important;
    }
  }
</style>
