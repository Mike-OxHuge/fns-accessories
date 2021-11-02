<template>
  <v-row
    align-content="center"
    justify="center"
    style="max-width: 100%; max-height: 100%"
    class="mx-auto"
  >
    <v-col v-if="$store.state.token" cols="12" class="d-flex">
      <v-btn
        color="red"
        block
        class="mx-auto"
        @click="$store.commit('eraseToken')"
        >force logout</v-btn
      >
    </v-col>
    <v-col v-if="error.status" cols="12"
      ><h1 class="red--text text-center">{{ error.message }}</h1></v-col
    >
    <v-col cols="auto" sm="12" md="6">
      <v-text-field
        v-model="login"
        label="Login"
        placeholder="Enter your login"
        outlined
        :rules="[rules.required]"
      ></v-text-field>
    </v-col>
    <v-col cols="auto" sm="12" md="6">
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        outlined
        :rules="[rules.required]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="d-flex">
      <v-btn
        color="primary"
        :disabled="!notEmpty"
        class="mx-auto"
        @click="submitAuth()"
        >Login</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['isLoggedIn'],
  data: () => ({
    login: '',
    password: '',
    isValid: null,
    rules: {
      required: (value) => !!value || 'Required.',
    },
    error: { message: '', status: false },
  }),
  computed: {
    notEmpty() {
      return this.login.length > 0 && this.password.length > 0
    },
  },
  methods: {
    async submitAuth() {
      this.$store.commit('eraseToken')
      try {
        const request = await this.$axios.post('/api/admin/login', {
          name: this.login,
          password: this.password,
        })
        if (request.status) {
          this.$store.commit('setToken', request.data.accessToken)
          this.$router.replace('/auth/editor')
        }
      } catch (error) {
        try {
          const { data } = await this.$axios.post('/api/admin/register', {
            name: this.login,
            password: this.password,
          })
          alert(`The user with name ${data.name} wasn't found, we registred your account. 
          However to access the CMS you'll have to ask your administrator to change your role.`)
          this.error.status = true
        } catch (error) {
          this.error.message = error.response.data.message
          this.error.status = true
        }
        this.error.message = error.response.data.message
        this.error.status = true
      }
    },
  },
}
</script>

<style></style>
