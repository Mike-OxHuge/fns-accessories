<template>
  <a :href="href">
    <v-img :src="src" :alt="alt" eager height="100" width="200" contain></v-img>
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
}
</script>

<style></style>
