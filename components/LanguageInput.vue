<template>
  <v-sheet class="switcher">
    <v-row style="max-width: 100%">
      <v-col
        v-for="(lang, i) in $i18n.availableLocales"
        :key="`Lang${i}`"
        cols="6"
      >
        <nuxt-link :to="switchLocalePath(lang)">
          <span @click="test()">
            {{ lang.toUpperCase() }}
          </span>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  methods: {
    test() {
      // console.log(this.$route.name, 'route name')
      // console.log(this.$route.fullPath, 'route fullPath')
      // console.log(this.$router.history.current.path, 'router curent path')
      // console.log(this.$router.history)
      // console.log('_startLocation:', this.$router.history._startLocation)
      // console.log('current.fullPath:', this.$router.history.current.fullPath)
      // console.log('current.path: ', this.$router.history.current.path)
      // console.log(window.location.href, 'window location')
      // console.log('current locale: ', this.$i18n.locale)
    },
    //
  },
}
</script>

<style scoped>
.switcher {
  position: absolute;
  top: 0;
  right: 0;
  /* left: translateX(60%); */
  /* left: 70vw; */
  z-index: 9999;
  max-width: fit-content;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0);
}
.switcher span {
  padding: 0.5rem 1rem;
}
</style>
