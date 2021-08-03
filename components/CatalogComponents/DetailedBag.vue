<template>
  <v-container>
    <span>{{ bag.stock }} {{ bag.color }} bags available</span>
    <v-img
      :src="selectedImage === null ? bag.image : selectedImage"
      width="300"
      height="300"
      contain
    ></v-img>
    <v-container>
      <v-row dense>
        <v-col v-for="image in images" :key="image.i" cols="2">
          <v-img
            :src="image"
            class="clickableImage"
            @click="selectedImage = image"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  props: {
    bag: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShown: false,
      images: [
        this.bag.image,
        'https://picsum.photos/600/600?random=1',
        'https://picsum.photos/600/600?random=2',
        'https://picsum.photos/600/600?random=3',
        'https://picsum.photos/600/600?random=4',
        'https://picsum.photos/600/600?random=5',
      ],
      selectedImage: null,
    }
  },
}
</script>

<style></style>
