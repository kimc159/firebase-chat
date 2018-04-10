import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: '',
    userList: '',
    error: null
  },
  mutations: {
    userList (state, payload) {
      state.userList = payload
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
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
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
    },
    userList (context) {
      firebase.database().ref('users').once('value')
      .then((data) => {
        const users = []
        const obj = data.val()
        for (let key in obj) {
          users.push({
            name: obj[key].name,
            profile: obj[key].profile
          })
        }
        context.commit('userList', users)
      })
      .catch((error) => {
        console.log(error)
      })
      // firebase.database().ref('users').once('value')
      // .then((data) => {
      //   const obj = data.val()
      //   console.log(obj)
      //   for (let key in obj) {
      //     console.log(key)
      //     console.log(obj[key])
      //   }
      // })
      // .catch((error) => {
      //   console.log(error)
      // })
    },
    setUser (context, payload) {
      const setUser = {
        name: payload.name,
        email: payload.email
      }
      context.commit('setUser', setUser)
    },
    signout (context) {
      firebase.auth().signOut()
      context.commit('setUser', null)
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
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    }
  }
})
