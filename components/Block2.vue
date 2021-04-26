<template>
  <v-main>
    <div
      class="main-wrap"
      :style="{ 'background-image': 'url(' + image + ')' }"
    >
      <div>
        <div class="title">Second image</div>
      </div>
    </div>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      image: 'https://picsum.photos/1920/1080?random=2',
    }
  },
}
</script>

<style>
#bg-img {
  height: 30vh;
  background-attachment: fixed;
  position: relative;
  margin: 0px 10vw 0px 10vw;
  background-image: url('https://picsum.photos/1920/1080?random=2');
}
</style>
