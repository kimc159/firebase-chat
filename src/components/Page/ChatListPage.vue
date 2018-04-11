<template>
<v-layout row>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-list subheader>
        <v-subheader>Recent chat</v-subheader>
        <v-list-tile avatar v-for="item in chatRoomList" :key="item.roomId" @click="roomEnter(item.roomId, item.targetUserName)">
          <v-list-tile-avatar>
            <img src="/static/image/noprofile.png">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.targetUserName"></v-list-tile-title>
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
      items: [
        { active: true, title: 'Jason Oner', avatar: '/static/image/test_image.jpg' },
        { active: true, title: 'Ranee Carlson', avatar: '/static/image/test_image2.jpg' },
        { title: 'Cindy Baker', avatar: '/static/image/test_image.jpg' },
        { title: 'Ali Connors', avatar: '/static/image/test_image.jpg' }
      ],
      items2: [
        { title: 'Travis Howard', avatar: '/static/image/test_image.jpg' }
      ]
    }
  },
  created () {
    this.$store.dispatch('chatRoomList')
  },
  computed: {
    chatRoomList () {
      return this.$store.getters.chatRoomList
    }
  },
  methods: {
    roomEnter (roomId, roomTitle) {
      this.$store.dispatch('loadMessageList', roomId)
      this.$store.dispatch('chatRoomIn', true)
      this.$store.dispatch('chatRoomInfo', {roomId: roomId, roomTitle: roomTitle + '님'})
      this.$router.push('/chatroom')
    }
  }
}
</script>

<style>

</style>
