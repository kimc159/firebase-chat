<template>
<v-layout row class="chatListWrap">
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-list subheader>
        <v-subheader>Recent chat</v-subheader>
        <v-list-tile avatar v-for="(item,index) in roomUserName" :key="item.roomId" @click="roomEnter(index, item)">
          <v-list-tile-avatar>
            <img src="/static/image/noprofile.png">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list subheader>
        <v-subheader>Previous chats</v-subheader>
        <v-list-tile avatar v-for="item in items2" :key="item.title">
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>
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
      roomid: '',
      items2: [
        { title: 'Travis Howard', avatar: '/static/image/test_image.jpg' }
      ]
    }
  },
  created () {
    this.$store.dispatch('chatRoomList')
    this.roomId = this.$store.getters.roomId
  },
  computed: {
    roomUserName () {
      return this.$store.getters.roomUserName
    }
  },
  methods: {
    roomEnter (index, roomTitle) {
      const roomId = this.roomId
      this.$store.dispatch('loadMessageList', roomId[index])
      this.$store.dispatch('chatRoomIn', true)
      this.$store.dispatch('chatRoomInfo', {roomId: roomId, roomTitle: roomTitle + '님'})
      this.$store.dispatch('roomId', roomId[index])
      this.$router.push('/chatroom')
    }
  }
}
</script>

<style>
#app > div > main > div .chatListWrap {
  margin-top: 50px;
}
</style>
