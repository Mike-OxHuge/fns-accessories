<template>
  <v-container d-flex>
    <div
      class="colorfulBox"
      :style="{ 'background-color': variant.color }"
    ></div>
    <p>
      Displayed color: {{ variant.colorName.en }} // {{ variant.colorName.it }}
    </p>
    <p>Price: {{ variant.price }} || Stock: {{ variant.stock }}</p>
    <p>Amount of images: {{ variant.images.length }}</p>
    <v-btn color="error" @click="$emit('deleteVariant', variant)">delete</v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    variant: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.colorfulBox {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
p {
  margin: auto;
}
</style>
