<template>
  <v-main>
    <h3>Something went wrong</h3>
    <p>Please reach me out on email: example@example.com</p>
    <p>Error message: {{ error.message }}</p>
  </v-main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
