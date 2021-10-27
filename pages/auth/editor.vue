<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h1>Editor</h1>
      <v-btn color="grey" @click="handleLogout()">logout</v-btn>
    </div>
    <p>Here you'll have things to add/delete/edit</p>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['isAdmin'],
  data() {
    return {}
  },
  methods: {
    handleLogout() {
      this.$store.commit('eraseToken')
      this.$router.replace('/en')
    },
  },
}
</script>

<style></style>
