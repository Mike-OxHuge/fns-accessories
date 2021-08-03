<i18n>
{
  "en": {
    "title1": "Merry Autumn",
    "article1": "Our warm colors will light your most disgraceful day up.",

    "title2" : "Skyblue",
    "article2" : "As blue as a clear sky. As bright as morning star.",

    "title3": "Classic",
    "article3" : "For book worms and coffee abusers."
  },
  "it": {
    "title1": "Buon autunno",
    "article1": "I nostri colori caldi illumineranno il tuo giorno più vergognoso.",

    "title2" : "Cielo blu",
    "article2" : "Blu come un cielo limpido. Brillante come la stella del mattino.",

    "title3": "Classica",
    "article3" : "Per i tarli dei libri e gli abusatori di caffè."
  }
}
</i18n>
<template>
  <v-container style="overflow: hidden">
    <RowsWithImages
      :is-left="true"
      :image="'/images/bag-in-use.png'"
      :header="`${$t('title1')}`"
      :description="`${$t('article1')}`"
      :image-animation="'flipInY'"
      :text-animation="'lightSpeedIn'"
    />
    <v-divider class="mx-4 my-15 py-15"></v-divider>
    <RowsWithImages
      :is-left="false"
      :image="'/images/bag-in-use-2.png'"
      :header="`${$t('title2')}`"
      :description="`${$t('article2')}`"
      :image-animation="'animated-flip'"
      :text-animation="'tada'"
    />
    <v-divider class="mx-4 my-15"></v-divider>
    <RowsWithImages
      :is-left="true"
      :image="'/images/bag-and-coffee.png'"
      :header="`${$t('title3')}`"
      :description="`${$t('article3')}`"
      :image-animation="'fadeIn'"
      :text-animation="'fadeInSlow'"
    />
  </v-container>
</template>

<script>
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'

import RowsWithImages from '~~/components/RowsWithImages.vue'
Vue.use(VueObserveVisibility)

export default {
  components: { RowsWithImages },
  data() {
    return {
      //
    }
  },
  methods: {
    //
  },
}
</script>

<style scoped>
/* .title {
  position: absolute;
  top: 53%;
  transform: translateY(-60%);
  width: 100vw;
  text-align: center;
  padding: 1vh 0px;
  background-color: rgba(0, 0, 0, 0.37);
  color: whitesmoke;
} */
</style>
