<template>
  <v-container>
    <v-row>
      <v-col v-if="isLeft || $vuetify.breakpoint.smAndDown" sm="12" md="6">
        <v-container>
          <v-img
            v-observe-visibility="{
              callback: (isVisible, entry) =>
                isViewableNow(isVisible, entry, 'b'),
            }"
            :src="image"
            :class="{
              [animatedImage]: showAnimationFor.b,
              invisible: !showAnimationFor.b,
            }"
          ></v-img>
        </v-container>
      </v-col>

      <v-col sm="12" md="6" class="d-flex">
        <v-container
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'a'),
          }"
          class="text-center my-auto"
          :class="{
            [animatedText]: showAnimationFor.a,
            invisible: !showAnimationFor.a,
          }"
        >
          <h1>{{ header }}</h1>
          <p>{{ description }}</p>
        </v-container>
      </v-col>

      <v-col v-if="!isLeft && $vuetify.breakpoint.mdAndUp" sm="12" md="6">
        <v-img
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'b'),
          }"
          :src="image"
          :class="{
            [animatedImage]: showAnimationFor.b,
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
  props: {
    isLeft: { type: Boolean, required: true },
    image: { type: String, required: true },
    header: { type: String, required: true },
    description: { type: String, required: true },
    imageAnimation: { type: String, required: true },
    textAnimation: { type: String, required: true },
  },
  data() {
    return {
      isVisible: false,
      showAnimationFor: {
        a: false,
        b: false,
      },
      animatedText: `visible animated ${this.textAnimation}`,
      animatedImage: `visible animated ${this.imageAnimation}`,
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
@import url(~/assets/css/keyframes.css);
@import url('~~/assets/css/keyframes.css');
* {
  /* overflow: hidden; */
}
</style>
