<template>
  <v-app>
    <Header />
    <!-- <v-main> -->
    <nuxt />
    <!-- </v-main> -->
    <Social />
    <Footer />
  </v-app>
</template>

<script>
import Social from '~/components/Social.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Social,
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
