<template>
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
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>
