<template>
  <!-- <v-container class="switcher"> -->
  <v-row style="max-width: 100%" no-gutters class="mt-1 mr-4" justify="end">
    <v-col
      v-for="(lang, i) in $i18n.availableLocales"
      :key="`Lang${i}`"
      cols="6"
      md="2"
      align-self="center"
      class="d-flex justify-center"
    >
      <nuxt-link :to="switchLocalePath(lang)">
        <v-btn
          :x-small="$vuetify.breakpoint.smAndDown"
          :medium="$vuetify.breakpoint.mdAndUp"
          color="primary"
          :outlined="lang !== $i18n.locale"
          block
          class="black--text"
          :class="{
            'ml-2': $vuetify.breakpoint.smAndDown,
            'mx-1': $vuetify.breakpoint.mdAndUp,
          }"
        >
          {{ lang.toUpperCase() }}
        </v-btn>
      </nuxt-link>
    </v-col>
  </v-row>
  <!-- </v-container> -->
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
/* .switcher {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
  max-width: fit-content;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0);
} */
</style>
