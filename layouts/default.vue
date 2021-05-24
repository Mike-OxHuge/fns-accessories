<template>
  <v-app>
    <LocaleSwitcher />
    <nuxt />
    <Social />
  </v-app>
</template>

<script>
import Social from '~/components/Social.vue'
import LocaleSwitcher from '~/components/LanguageInput.vue'
export default {
  components: {
    Social,
    LocaleSwitcher,
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
