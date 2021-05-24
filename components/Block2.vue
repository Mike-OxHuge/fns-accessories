<i18n>
{
  "en": {
    "message2": "Shop with us at:"
  },
  "it": {
    "message2": "Acquista con noi su:"
  }
}
</i18n>
<template>
  <v-main id="main-wrap">
    <div class="title">
      <h2>{{ $t('message2') }}</h2>
    </div>
    <v-main style="height: 100vh" class="bg">
      <!-- upper section -->
      <div class="upper-section">
        <div
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'a'),
          }"
          :class="{
            'visible animated slide-from-right': showAnimationFor.a,
            invisible: !showAnimationFor.a,
          }"
        >
          <ShopLogo
            src="../static/amazon-logo.png"
            alt="amazon-logo"
            href="https://amazon.com"
          />
        </div>
        <div
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'b'),
          }"
          :class="{
            'visible animated slide-from-right': showAnimationFor.b,
            invisible: !showAnimationFor.b,
          }"
          style="position: relative; left: 10vw"
        >
          <ShopLogo
            src="../static/facebook-marketplace-logo.png"
            alt="facebook-marketplace-logo"
            href="https://www.facebook.com/marketplace"
          />
        </div>
      </div>

      <!-- bottom section -->
      <div class="bottom-section">
        <div
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'c'),
          }"
          :class="{
            'visible animated slide-from-left': showAnimationFor.c,
            invisible: !showAnimationFor.c,
          }"
        >
          <ShopLogo
            src="../static/etsy-logo.png"
            alt="etsy-logo"
            href="https://etsy.com"
          />
        </div>
        <div
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'd'),
          }"
          :class="{
            'visible animated slide-from-left': showAnimationFor.d,
            invisible: !showAnimationFor.d,
          }"
          style="position: relative; right: 15vh"
        >
          <ShopLogo
            src="../static/ebay-logo.png"
            alt="ebay-logo"
            href="https://ebay.com"
          />
        </div>
      </div>
    </v-main>
  </v-main>
</template>

<script>
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'
import ShopLogo from '~~/components/ShopLogo.vue'

Vue.use(VueObserveVisibility)

export default {
  components: {
    ShopLogo,
  },
  data() {
    return {
      isVisible: false,
      showAnimationFor: {
        a: false,
        b: false,
        c: false,
        d: false,
      },
    }
  },
  mounted() {
    this.resetHeight()
    //
  },
  methods: {
    isViewableNow(isVisible, entry, section) {
      this.showAnimationFor[section] = isVisible
    },
    resetHeight() {
      const body = document.getElementById('main-wrap')
      body.style.height = window.innerHeight + 'px'
    },
    //
  },
}
</script>

<style scoped>
.bg {
  /* background-image: rgba(0, 0, 0, 0.753)
    url('https://picsum.photos/1800/600?random=1') no-repeat center; */
  background-image: linear-gradient(
      to bottom,
      rgba(245, 246, 252, 0.52),
      rgba(117, 19, 93, 0.73)
    ),
    url('https://picsum.photos/1800/600?random=1');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.upper-section {
  position: absolute;
  top: 5%;
  left: 5%;
}
.bottom-section {
  position: absolute;
  bottom: 5%;
  right: 5%;
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

.slide-from-left {
  animation-name: slide-from-left;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.slide-from-right {
  animation-name: slide-from-right;
  animation-duration: 1s;
  animation-fill-mode: both;
}
</style>
