<template>
  <v-app>
    <nuxt />
    <Social />
  </v-app>
</template>

<script>
import Social from '~/components/Social.vue'

export default {
  components: {
    Social,
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
