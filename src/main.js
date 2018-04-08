// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as firebase from 'firebase'
import { store } from './store'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  created () {
    var config = {
      apiKey: 'AIzaSyDN9FtpQV0M20d35CCv7syNXDdtAPlcfIg',
      authDomain: 'fir-chat-16b59.firebaseapp.com',
      databaseURL: 'https://fir-chat-16b59.firebaseio.com',
      projectId: 'fir-chat-16b59',
      storageBucket: 'fir-chat-16b59.appspot.com',
      messagingSenderId: '479765357463'
    }
    firebase.initializeApp(config)
  }
})
