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
    <div
      id="main-wrap"
      :style="{ 'background-image': mainBackgroundImage }"
      style="background-size: cover; background-repeat: no-repeat"
    >
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
          <a :href="`/${$i18n.locale}/`">
            <v-avatar :size="customSize" class="mt-5 mr-5">
              <v-img eager src="/logo.png"></v-img>
            </v-avatar>
          </a>
          <div class="d-flex flex-column align-self-center justify-center">
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
        <h2>{{ $t('message') }}</h2>
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
    mainBackgroundImage() {
      return this.$vuetify.breakpoint.smAndDown
        ? 'url(/mobile-bg.jpg)'
        : 'url(/desktop-bg.jpg)'
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
  transform: translateY(-80%);
  width: 100vw;
  text-align: center;
  padding: 1vh 0px;
  background-color: rgba(0, 0, 0, 0.37);
  color: whitesmoke;
}
</style>
