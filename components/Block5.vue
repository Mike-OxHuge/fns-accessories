<i18n>
{
  "en": {
     "title": "Classic",
    "article": "For book worms and coffee abusers."
  },
  "it": {
     "title": "Classica",
    "article": "Per i tarli dei libri e gli abusatori di caffè."
  }
}
</i18n>
<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="6" class="d-flex">
        <v-container
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'a'),
          }"
          class="text-center my-auto"
          :class="{
            'visible animated slideInUp': showAnimationFor.a,
            invisible: !showAnimationFor.a,
          }"
        >
          <h1>{{ $t('title') }}</h1>
          <p>{{ $t('article') }}</p>
        </v-container>
      </v-col>
      <v-col sm="12" md="6">
        <v-img
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'b'),
          }"
          src="/images/bag-and-coffee.png"
          :class="{
            'visible animated fadeIn': showAnimationFor.b,
            invisible: !showAnimationFor.b,
          }"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)

export default {
  data() {
    return {
      isVisible: false,
      showAnimationFor: {
        a: false,
        b: false,
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
.tada {
  -webkit-animation-name: tada;
  animation-name: tada;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.fadeIn {
  animation-name: fadeIn;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-iteration-count: 1;
}
.slideInUp {
  -webkit-animation-name: slideInUp;
  animation-name: slideInUp;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
