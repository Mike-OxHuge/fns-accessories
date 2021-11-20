<template>
  <div class="mx-auto">
    <a :href="href" target="_blank">
      <v-img
        :src="src"
        :alt="alt"
        eager
        :max-height="customHeight"
        :max-width="customWidth"
        contain
      ></v-img>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  computed: {
    customHeight() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return '100'
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        return '200'
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        return '230'
      } else {
        return '400'
      }
    },
    customWidth() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return '200'
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        return '400'
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        return '460'
      } else {
        return '800'
      }
    },
  },
}
</script>
