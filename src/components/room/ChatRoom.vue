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
          <v-list-tile avatar>
            <v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-container fluid class="chat-input">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="input-7-1"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: ['id'],
  mounted () {
    const title = this.id.split('-')
    document.getElementById('roomTitle').textContent = title[1]
  },
  methods: {
    back () {
      this.$store.dispatch('chatRoomIn', false)
      return this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
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
