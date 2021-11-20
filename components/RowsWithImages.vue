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
            eager
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
          <p>{{ description.split('.')[0] }}.</p>
          <v-btn
            color="primary"
            @click="$router.push(`/${$i18n.locale}/catalog/${id}`)"
          >
            {{ $i18n.locale === 'it' ? 'Vedi altro' : 'see more' }}
          </v-btn>
        </v-container>
      </v-col>

      <v-col v-if="!isLeft && $vuetify.breakpoint.mdAndUp" sm="12" md="6">
        <v-img
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'c'),
          }"
          eager
          :src="image"
          :class="{
            [animatedImage]: showAnimationFor.c,
            invisible: !showAnimationFor.c,
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
    id: { type: String, required: true },
  },
  data() {
    return {
      isVisible: false,
      showAnimationFor: {
        a: false,
        b: false,
        c: false,
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
