<template>
  <v-main>
    <div class="title">
      <h2>Shop with us at:</h2>
    </div>
    <v-main style="height: 100vh" class="bg">
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
            src="amazon-logo.png"
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
            src="facebook-marketplace-logo.png"
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
            src="etsy-logo.png"
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
            src="ebay-logo.png"
            alt="ebay-logo"
            href="https://ebay.com"
          />
        </div>
      </div>
    </v-main>

    <!-- <div id="demo">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ratione.
        Tempore, sit! Repudiandae dolorem sapiente dolores quos ipsum libero
        tenetur, non explicabo sed nobis labore exercitationem dolore nam,
        architecto harum ab corrupti totam ipsam ipsa enim adipisci possimus
        perspiciatis animi. Voluptate, eos! Praesentium architecto distinctio
        minus? Optio sequi ut odit.
      </p>
      <div
        v-observe-visibility="{
          callback: (isVisible, entry) => isViewableNow(isVisible, entry, 'a'),
        }"
        :class="{
          'visible animated slideInRight': showAnimationFor.a,
          invisible: !showAnimationFor.a,
        }"
      >
        <ShopLogo
          src="amazon-logo.png"
          alt="amazon-logo"
          href="https://amazon.com"
        />
        <ShopLogo
          src="facebook-marketplace-logo.png"
          alt="facebook-marketplace-logo"
          href="https://www.facebook.com/marketplace"
        />
      </div>

      <div
        v-observe-visibility="{
          callback: (isVisible, entry) => isViewableNow(isVisible, entry, 'b'),
        }"
        :class="{
          'visible animated slideInLeft': showAnimationFor.b,
          invisible: !showAnimationFor.b,
        }"
      >
        <ShopLogo src="ebay-logo.png" alt="ebay-logo" href="https://ebay.com" />
        <ShopLogo src="etsy-logo.png" alt="etsy-logo" href="https://etsy.com" />
      </div>
    </div> -->
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
  methods: {
    isViewableNow(isVisible, entry, section) {
      this.showAnimationFor[section] = isVisible
    },
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
  bottom: 10%;
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
  -webkit-animation-name: slide-from-left;
  animation-name: slide-from-left;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.slide-from-right {
  -webkit-animation-name: slide-from-right;
  animation-name: slide-from-right;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
