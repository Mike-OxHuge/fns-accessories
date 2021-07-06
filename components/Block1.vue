<i18n>
{
  "en": {
     "message": "Hi!",
    "message2": "Awesome stuff. For awesome people."
  },
  "it": {
     "message": "Ciao!",
    "message2": "Roba impressionante. Per persone fantastiche."
  }
}
</i18n>
<template>
  <v-main>
    <div id="main-wrap" :style="{ 'background-image': 'url(' + image + ')' }">
      <div
        v-observe-visibility="{
          callback: (isVisible, entry) => isViewableNow(isVisible, entry, 'a'),
        }"
        :class="{
          'visible animated  fadeIn': showAnimationFor.a,
          invisible: !showAnimationFor.a,
        }"
      >
        <div class="d-flex justify-center">
          <NuxtLink :to="`/${$i18n.locale}/catalog`">
            <v-avatar :size="customSize" class="mt-5 mr-5">
              <v-img eager src="/logo.png"></v-img>
            </v-avatar>
          </NuxtLink>
          <div class="d-flex flex-column align-self-center justify-center">
            <!-- <h1 class="text-center">F&S</h1> -->
            <h2
              class="text-center white--text px-2 py-1 mt-5 mb-n1"
              style="background-color: rgba(0, 0, 0, 0.4); border-radius: 1rem"
            >
              HandmadeAccessories
            </h2>
          </div>
        </div>
      </div>

      <div class="title">
        <h2>Firebase project is abandonded!</h2>
        <p>{{ $t('message2') }}</p>
      </div>
    </div>
  </v-main>
</template>

<script>
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)

export default {
  components: {},
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
      isVisible: false,
      showAnimationFor: {
        a: false,
      },
    }
  },
  computed: {
    customSize() {
      return this.$vuetify.breakpoint.smAndDown ? '100' : '200'
    },
  },
  mounted() {
    this.resetHeight()
  },
  methods: {
    resetHeight() {
      const body = document.getElementById('main-wrap')
      body.style.height = window.innerHeight + 'px'
    },
    isViewableNow(isVisible, entry, section) {
      this.showAnimationFor[section] = isVisible
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
.fadeIn {
  animation-name: fadeIn;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-iteration-count: 1;
}
</style>
