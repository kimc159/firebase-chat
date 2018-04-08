import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: '',
    error: null
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signup (context, payload) {
      const setUser = {
        name: payload.name,
        email: payload.email
      }
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        console.log('가입 성공')
        console.log('user : ' + JSON.stringify(user))
        alert('가입이 완료되었습니다.')
        context.commit('setUser', setUser)
      })
      .catch((error) => {
        console.log('가입 실패')
        console.log('error : ' + error)
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
        console.log(error)
        console.log(errorMessage)
        context.commit('setError', errorMessage)
      })
    },
    setError (context, payload) {
      context.commit('setError', payload)
    },
    clearError (context, payload) {
      context.commit('setError', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    }
  }
})
