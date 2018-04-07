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
        <v-btn large center>
          <span></span>
          페이스북으로 로그인</v-btn>
      </div>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="btn_wrap google">
        <v-btn large class="white" center>
          <v-icon></v-icon>
          구글계정으로 로그인</v-btn>
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
}
.facebook .btn__content {
  color: white;
  background: #3b5998;
}
.input-group--text-field {
  margin-top: -10px;
}
</style>

