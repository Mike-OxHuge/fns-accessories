<template>
  <v-app>
    <Header />
    <LocaleSwitcher />
    <nuxt />
    <Social />
    <Footer />
  </v-app>
</template>

<script>
import Social from '~/components/Social.vue'
import LocaleSwitcher from '~/components/LanguageInput.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Social,
    LocaleSwitcher,
    Header,
    Footer,
  },
  data() {
    return {}
  },
  mounted() {
    //
  },
  methods: {
    //
  },
}
</script>

<style>
v-app {
  max-width: 100vw;
}
</style>
