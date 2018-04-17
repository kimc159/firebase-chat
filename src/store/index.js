import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: '',
    userList: '',
    chatRoomIn: false,
    roomId: '',
    roomTitle: '',
    roomUsers: '',
    chatRoomList: '',
    roomUserName: '',
    messageList: '',
    error: null
  },
  mutations: {
    userList (state, payload) {
      state.userList = payload
    },
    chatRoomInfo (state, payload) {
      state.roomId = payload.roomId
      state.roomTitle = payload.roomTitle
    },
    roomUsers (state, payload) {
      state.roomUsers = payload
    },
    chatRoomList (state, payload) {
      const roomUserName = payload.chatUserList.split(' ')
      const roomIdList = payload.chatRoomIdList.split(' ')
      roomUserName.pop()
      roomIdList.pop()
      state.roomUserName = roomUserName
      state.roomId = roomIdList
    },
    loadMessageList (state, payload) {
      state.messageList = payload
    },
    roomId (state, payload) {
      state.roomId = payload
    },
    chatRoomIn (state, payload) {
      state.chatRoomIn = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    signin (context, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        const setUser = {
          name: user.displayName,
          email: user.email
        }
        context.commit('setUser', setUser)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    signup (context, payload) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const nameUpdate = function () {
            firebase.auth().currentUser.updateProfile({
              displayName: payload.name
            })
            .then(() => {
              console.log('displayName update success')
              const setUser = {
                name: payload.name,
                email: payload.email
              }
              const saveUser = {
                uid: user.user.uid,
                name: payload.name,
                email: payload.email,
                profile: payload.profile,
                date: new Date().toISOString()
              }
              firebase.database().ref('users').push(saveUser)
              .then((data) => {
                context.commit('setUser', setUser)
              })
              .catch((error) => {
                console.log(error)
              })
            })
            .catch(error => {
              console.log(error)
            })
          }
          nameUpdate()
        })
        .catch((error) => {
          console.log('가입 실패')
          console.log('error : ' + error)
          context.commit('setUser', null)
          let errorMessage
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = '이미 사용중인 이메일 입니다.'
              break
            case 'auth/invalid-email':
              errorMessage = '유효하지 않은 메일입니다'
              break
            case 'auth/operation-not-allowed':
              errorMessage = '이메일 가입이 중지되었습니다.'
              break
            case 'auth/weak-password':
              errorMessage = '비밀번호는 6자리 이상 필요합니다'
              break
          }
          context.commit('setError', errorMessage)
        })
      })
    },
    userList (context) {
      const userRef = firebase.database().ref('users')
      userRef.off()
      firebase.database().ref('users').once('value')
      .then((data) => {
        const users = []
        const obj = data.val()
        for (let key in obj) {
          users.push({
            name: obj[key].name,
            profile: obj[key].profile,
            uid: obj[key].uid
          })
        }
        context.commit('userList', users)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    chatRoomInfo (context, payload) {
      const roomInfo = {
        roomId: payload.roomId,
        roomTitle: payload.roomTitle
      }
      context.commit('chatRoomInfo', roomInfo)
    },
    createChatRoom (context, payload) {
      const roomId = payload.roomId
      const roominfo = {
        userUid: payload.userUid,
        Message: payload.Message,
        profileImg: payload.profileImg,
        timestamp: payload.timestamp,
        userName: payload.userName
      }
      const check = payload.MAKEID_CHAR + payload.userUid + payload.MAKEID_CHAR + payload.targetUid
      const check2 = payload.MAKEID_CHAR + payload.targetUid + payload.MAKEID_CHAR + payload.userUid
      let count = 0
      firebase.database().ref('Message').once('value')
      .then(data => {
        const obj = data.val()
        console.log(check)
        for (let key in obj) {
          if (key.match(check) || key.match(check2)) {
            count++
          }
        }
        return count
      })
      .then(count => {
        if (count === 0) {
          firebase.database().ref('Message/' + roomId).push(roominfo)
          .then((data) => {
            console.log('방생성 성공')
          })
          .catch((error) => {
            console.log('방생성 실패 ' + error)
          })
        } else {
          console.log('이미 방이 있습니다.')
        }
      })
    },
    roomUsers (context, payload) {
      const users = {
        roomId: payload.roomId,
        roomUserUid: payload.roomUserUid,
        roomUserName: payload.roomUserName
      }
      firebase.database().ref('roomUsers/' + users.roomId).once('value')
      .then(data => {
        if (data.val() === null) {
          firebase.database().ref('roomUsers/' + users.roomId).push(users)
          .then(data => {
            context.commit('roomUsers', users)
          })
          .catch(error => {
            console.log(error)
          })
        }
      })
    },
    messageList (context, payload) {
      console.log('message List in')
      const roomId = payload
      firebase.database().ref('Message/' + roomId).on('child_added', function (data) {
      })
    },
    chatRoomList (context) {
      let chatUserList = ''
      let chatRoomIdList = ''
      let count = 0
      const currentUserName = firebase.auth().currentUser.displayName
      firebase.database().ref('roomUsers').on('child_added', function (data) {
        const obj = data.val()
        for (let key in obj) {
          obj[key].roomUserName.map(function (v, i) {
            if (currentUserName === v && count < 1) {
              chatUserList += obj[key].roomUserName + ' '
              chatRoomIdList += obj[key].roomId + ' '
              count++
            } else {
              count = 0
            }
          })
        }
        context.commit('chatRoomList', {chatUserList, chatRoomIdList})
      })
    },
    loadMessageList (context, payload) {
      const roomId = payload
      console.log(roomId)
      let roomMessage = []
      firebase.database().ref('Message/' + roomId).on('child_added', function (data) {
        roomMessage.push(data.val())
      })
      console.log(roomMessage)
      context.commit('loadMessageList', roomMessage)
    },
    chatRoomIn (context, payload) {
      context.commit('chatRoomIn', payload)
    },
    roomId (context, payload) {
      context.commit('roomId', payload)
    },
    setUser (context, payload) {
      const setUser = {
        name: payload.name,
        email: payload.email
      }
      context.commit('setUser', setUser)
    },
    signout (context) {
      const setUser = {
        name: null,
        email: null
      }
      firebase.auth().signOut()
      context.commit('setUser', setUser)
    },
    setError (context, payload) {
      context.commit('setError', payload)
    },
    clearError (context, payload) {
      context.commit('setError', null)
    }
  },
  getters: {
    userList (state) {
      return state.userList
    },
    chatRoomInfo (state) {
      return state.roomId + '-' + state.roomTitle
    },
    chatRoomList (state) {
      return state.chatRoomList
    },
    roomUserName (state) {
      return state.roomUserName
    },
    loadMessageList (state) {
      return state.messageList
    },
    chatRoomIn (state) {
      return state.chatRoomIn
    },
    roomId (state) {
      return state.roomId
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    }
  }
})
