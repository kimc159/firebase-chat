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
      targetUserName: '',
      roomId: '',
      idOpenRoom: false,
      date: new Date()
    }
  },
  created () {
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
      this.targetUserName = event.target.innerText
      const currentUserUid = this.auth.currentUser.uid
      const currentUserName = this.auth.currentUser.displayName
      this.roomTitle = this.targetUserName + '님'
      this.roomUserList = [targetUserUid, currentUserUid]
      this.roomUserName = [this.targetUserName, currentUserName]
      this.roomId = this.MAKEID_CHAR + currentUserUid + this.MAKEID_CHAR + targetUserUid
      this.openChatRoom(this.roomId, this.roomTitle, targetUserUid)
    },
    openChatRoom (roomId, roomTitle, targetUserUid) {
      const roomInfo = {
        roomId: this.roomId,
        userUid: this.auth.currentUser.uid,
        Message: '방을 생성했습니다.',
        profileImg: '/static/image/noprofile.png',
        timestamp: this.date,
        userName: this.auth.currentUser.displayName
      }
      const users = {
        roomId: this.roomId,
        roomUserUid: [targetUserUid, this.auth.currentUser.uid],
        roomUserName: [this.targetUserName, this.auth.currentUser.displayName]
      }
      console.log(roomInfo)
      this.isOpenRoom = true
      this.$store.dispatch('chatRoomIn', true)
      this.$store.dispatch('createChatRoom', roomInfo)
      this.$store.dispatch('roomUsers', users)
      this.$store.dispatch('chatRoomInfo', {roomId: roomId, roomTitle: roomTitle})
      this.$router.push('/chatroom')
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
