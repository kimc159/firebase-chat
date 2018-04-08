<template>
<v-container fluid>
  <v-layout row class="logo_wrap">
    <v-flex xs12>
      <img src="/static/image/noprofile.png" alt="">
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs4>
      <v-subheader>ID</v-subheader>
    </v-flex>
    <v-flex xs8>
      <v-text-field
        name="input-1"
        label="Label Text"
        id="testing"
      ></v-text-field>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs4>
      <v-subheader>password</v-subheader>
    </v-flex>
    <v-flex xs8>
      <v-text-field
        name="input-1"
        label="Label Text"
        id="testing"
      ></v-text-field>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="btn_wrap facebook">
        <v-btn large center @click="facebookLogin">
          <v-icon></v-icon>
          페이스북으로 로그인
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="btn_wrap google">
        <v-btn large class="white" center @click="googleLogin">
          <v-icon></v-icon>
          구글계정으로 로그인
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="btn_wrap">
        <v-btn large class="primary" center>이메일로 로그인</v-btn>
      </div>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="btn_wrap">
        <v-btn large class="primary" center>이메일로 회원가입</v-btn>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
import * as firebase from 'firebase'

export default {
  data () {
    return {
      auth: firebase.auth()
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    googleLogin () {
      const googleProvider = new firebase.auth.GoogleAuthProvider()
      this.auth.signInWithPopup(googleProvider)
      .then((result) => {
        console.log('로그인 성공')
        console.log(result)
        this.$store.dispatch('setUser')
      })
      .catch((error) => {
        alert('로그인에 실패했습니다.')
        console.error('구글 로그인 에러 과정', error)
      })
    },
    facebookLogin () {
      const firebaseProvider = new firebase.auth.FacebookAuthProvider()
      this.auth.signInWithPopup(firebaseProvider)
      .then((result) => {
        console.log('로그인 성공')
        console.log(result)
      })
    },
    onAuthChange () {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('user 로그인 : ', JSON.stringify(user))
        } else {
          console.log('로그아웃')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.logo_wrap {
  margin: 50px auto;
}
.logo_wrap .flex{
  text-align: center;
  img {
    width: 100px;
    height: 100px;
  }
}
.btn_wrap {
  text-align: center;
  button {
    width: 100%;
  }
}
.google .btn__content {
  color: #7c8288;
  border: 1px solid #dadce0;
  background: white;
  i {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    background: url('../../../static/image/icon_google.svg') 50% no-repeat;
    border-radius: 50%;
  }
}
.facebook .btn__content {
  position: relative;
  color: white;
  background: #3b5998;
  i {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    background: url('../../../static/image/icon_facebook.png') 50% no-repeat;
  }
}
.input-group--text-field {
  margin-top: -10px;
}
</style>

