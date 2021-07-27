<template>
  <v-main
    ><h3>CHECKOUT</h3>
    <v-img :src="bag.image"></v-img
  ></v-main>
</template>

<script>
export default {
  props: {
    bag: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
