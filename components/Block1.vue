<template>
  <v-main>
    <div
      class="main-wrap"
      :style="{ 'background-image': 'url(' + image + ')' }"
    >
      <div class="awesome-pics-mobile">
        <div
          class="bg-img"
          :style="{ 'background-image': 'url(' + images[0] + ')' }"
          style="top: 0vh; left: 10vw"
        ></div>
        <div
          class="bg-img"
          :style="{ 'background-image': 'url(' + images[1] + ')' }"
          style="top: -5vh; left: 20vw"
        ></div>
      </div>
      <div class="title">
        <h2>Lorem, ipsum dolor.</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="awesome-pics-mobile" style="top: 62vh; left: 30vw">
        <div
          class="bg-img"
          :style="{ 'background-image': 'url(' + images[2] + ')' }"
          style="top: 0vh; left: 20vw"
        ></div>
        <div
          class="bg-img"
          :style="{ 'background-image': 'url(' + images[3] + ')' }"
          style="bottom: 13vh; right: 9vw"
        ></div>
      </div>
      <section></section>
    </div>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      image: 'https://picsum.photos/1920/1080?random=1',
      images: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3',
        'https://picsum.photos/800/600?random=4',
      ],
    }
  },
  computed: {},
}
</script>

<style>
.main-wrap {
  height: 100vh;
}
.bg-img {
  height: 20vh;
  width: 20vh;
  background-attachment: fixed;
  position: relative;
  box-shadow: whitesmoke 0px 0px 3px 3px;
}
.awesome-pics-mobile {
  position: absolute;
  top: 5vh;
  left: 1vw;
  height: 30vh;
  width: 50vw;
}
.title {
  position: absolute;
  top: 53%;
  transform: translateY(-60%);
  width: 100vw;
  /* left: 25%; */
  text-align: center;
  padding: 1vh 0px;
  /* text-transform: uppercase; */
  background-color: rgba(0, 0, 0, 0.37);
  color: whitesmoke;
}
</style>
