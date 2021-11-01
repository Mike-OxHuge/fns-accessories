<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h1>Editor</h1>
      <v-btn color="grey" @click="handleLogout()">logout</v-btn>
    </div>
    <CreateEditForm />
  </v-container>
</template>

<script>
import CreateEditForm from '~/components/admin/CreateEditForm.vue'

export default {
  components: { CreateEditForm },

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
