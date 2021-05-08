<template>
  <v-main>
    <div
      class="main-wrap"
      :style="{ 'background-image': 'url(' + image + ')' }"
    >
      <div class="d-flex justify-center fadeInDown">
        <v-avatar :size="customSize" class="mt-5 ml-5">
          <v-img src="logo.png"></v-img>
        </v-avatar>
        <div class="d-flex flex-column align-self-center">
          <h1 class="text-center">F&S -</h1>
          <h3>- HandmadeAccessories</h3>
        </div>
      </div>

      <div class="title">
        <h2>Awesome stuff</h2>
        <p>For the awesome people</p>
      </div>
    </div>
  </v-main>
</template>

<script>
export default {
  // components: {  },
  data() {
    return {
      image: 'https://picsum.photos/1920/1080?random=1',
      images: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3',
        'https://picsum.photos/800/600?random=4',
        'https://picsum.photos/800/600?random=5',
      ],
    }
  },
  computed: {
    customHeight() {
      return this.$vuetify.breakpoint.smAndDown ? '100' : '200'
    },
    customWidth() {
      return this.$vuetify.breakpoint.mdAndUp ? 'width: 25vw' : 'width:35vw'
    },
    customSize() {
      return this.$vuetify.breakpoint.smAndDown ? '100' : '200'
    },
  },
}
</script>

<style>
@import url(~/assets/css/keyframes.css);

.block-one,
.block-two {
  width: 100%;
  height: 30%;
  position: absolute;
  top: 2vh;
  bottom: 2vh;
}
.main-wrap {
  height: 100vh;
}
.parallax {
  width: 25vw;
  /* background-attachment: fixed; */
  /* background-position: center !important; */
  /* background-repeat: no-repeat !important; */
  /* background-size: cover !important; */
  /* position: absolute; */
  box-shadow: whitesmoke 0px 0px 3px 3px;
}

.title {
  position: absolute;
  top: 53%;
  transform: translateY(-60%);
  width: 100vw;
  text-align: center;
  padding: 1vh 0px;
  background-color: rgba(0, 0, 0, 0.37);
  color: whitesmoke;
}
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
