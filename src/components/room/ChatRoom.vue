<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-toolbar dark color="teal lighten-3">
          <v-btn icon @click="back">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-toolbar-title id="roomTitle">Title</v-toolbar-title>
        </v-toolbar>
        <v-list subheader>
        <v-list-tile-content>
          <ul id="messageList">
            <li v-for="list in loadMessageList" :key="list.messageList">{{list}}</li>
          </ul>
        </v-list-tile-content>
        </v-list>
        <v-container fluid class="chat-input">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="sendMessage"
                label="메시지 입력"
                id="sendMessage"
                v-model="sendMessage"
              @keyup.enter="send"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
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
      title: '',
      sendMessage: '',
      roomId: '',
      roomTitle: '',
      messageRef: ''
    }
  },
  mounted () {
    this.roomTitle = this.chatRoomInfo.split('-')[1]
    console.log(this.roomId)
    document.getElementById('roomTitle').textContent = this.roomTitle
  },
  computed: {
    chatRoomInfo () {
      return this.$store.getters.chatRoomInfo
    },
    roomId () {
      return this.$store.getters.roomId
    },
    loadMessageList () {
      console.log(this.$store.getters.loadMessageList)
      return this.$store.getters.loadMessageList
    }
  },
  methods: {
    back () {
      this.$store.dispatch('chatRoomIn', false)
      return this.$router.go(-1)
    },
    send () {
      const send = {
        Message: this.sendMessage,
        profileImg: '/static/image/noprofile.png',
        userName: firebase.auth().currentUser.displayName,
        userUid: firebase.auth().currentUser.uid
      }
      const ulMessageList = document.getElementById('messageList')
      const newLi = document.createElement('li')
      firebase.database().ref('Message/' + this.roomId).push(send)
      .then(data => {
        newLi.innerText = data.val().Message
        ulMessageList.appendChild(newLi)
      })
      .catch(error => {
        console.log(error)
      })
      this.sendMessage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .content .layout {
    height: 100%;
    .flex {
      height: 100%;
    }
    .card {
      height: 100% !important;
    }
    .list {
      position: absolute;
      top: 56px;
      width: 100%;
      height: 100%;
      > div {
        height: 100%;
      }
      div.list__tile {
        height: 100% !important;
      }
    }
    .list__tile__content {
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
      }
    }
  }
  .toolbar .btn__content i {
    font-size: 35px;
  }
  .chat-input {
    position: fixed;
    bottom: 0;
    padding: 0;
    z-index: 100;
  }
</style>
