<template>
  <a :href="href" target="_blank">
    <v-img
      :src="src"
      :alt="alt"
      eager
      :height="customHeight"
      :width="customWidth"
      contain
    ></v-img>
  </a>
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
      return this.$vuetify.breakpoint.smAndDown ? '75' : '150'
    },
    customWidth() {
      return this.$vuetify.breakpoint.smAndDown ? '150' : '300'
    },
  },
}
</script>

<style>
/* average sizes:
height: 100;
width 200 */
</style>
