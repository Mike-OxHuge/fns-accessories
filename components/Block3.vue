<template>
  <v-carousel>
    <v-carousel-item
      v-for="item in items"
      :key="item.i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { src: 'https://picsum.photos/1600/900?random=1' },
        { src: 'https://picsum.photos/1600/900?random=2' },
        { src: 'https://picsum.photos/1600/900?random=3' },
        { src: 'https://picsum.photos/1600/900?random=4' },
        { src: 'https://picsum.photos/1600/900?random=5' },
        { src: 'https://picsum.photos/1600/900?random=6' },
        { src: 'https://picsum.photos/1600/900?random=7' },
      ],
    }
  },
}
</script>

<style></style>
