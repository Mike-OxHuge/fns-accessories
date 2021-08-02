<i18n>
{
  "en": {
     "title": "Skyblue",
    "article": "As blue as a clear sky. As bright as morning star."
  },
  "it": {
     "title": "Cielo blu",
    "article": "Blu come un cielo limpido. Brillante come la stella del mattino."
  }
}
</i18n>
<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="12" md="6" class="d-flex">
        <v-container
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'a'),
          }"
          class="text-center my-auto"
          :class="{
            'visible animated tada': showAnimationFor.a,
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
          src="/images/bag-in-use-2.png"
          :class="{
            'visible animated animated-flip': showAnimationFor.b,
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
.animated-flip {
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  -webkit-animation-name: flip;
  animation-name: flip;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
