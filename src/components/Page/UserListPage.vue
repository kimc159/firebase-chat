<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list subheader>
          <v-subheader>친구</v-subheader>
          <v-list-tile avatar v-for="item in items" :key="item.name">
            <v-list-tile-avatar>
              <img :src="item.profile">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
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
    }
  },
  computed: {
    items () {
      return this.$store.getters.userList
    }
  },
  mounted () {
    this.$store.dispatch('userList')
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
  }
</style>
