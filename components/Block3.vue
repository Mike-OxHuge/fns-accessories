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
  <v-container v-if="featuredBags.length > 0" style="overflow: hidden">
    <RowsWithImages
      v-if="featuredBags.length >= 1"
      :id="featuredBags[0]._id"
      :is-left="true"
      :image="featuredBags[0].defaultImage"
      :header="
        $i18n.locale === 'it'
          ? featuredBags[0].name.it
          : featuredBags[0].name.en
      "
      :description="
        $i18n.locale === 'it'
          ? featuredBags[0].description.it
          : featuredBags[0].description.en
      "
      :image-animation="'flipInY'"
      :text-animation="'lightSpeedIn'"
    />
    <v-divider
      v-if="featuredBags.length >= 2"
      class="mx-4 my-15 py-15"
    ></v-divider>
    <RowsWithImages
      v-if="featuredBags.length >= 2"
      :id="featuredBags[1]._id"
      :is-left="false"
      :image="featuredBags[1].defaultImage"
      :header="
        $i18n.locale === 'it'
          ? featuredBags[1].name.it
          : featuredBags[1].name.en
      "
      :description="
        $i18n.locale === 'it'
          ? featuredBags[1].description.it
          : featuredBags[1].description.en
      "
      :image-animation="'rotateInDownRight'"
      :text-animation="'tada'"
    />
    <v-divider v-if="featuredBags.length >= 3" class="mx-4 my-15"></v-divider>
    <RowsWithImages
      v-if="featuredBags.length >= 3"
      :id="featuredBags[2]._id"
      :is-left="true"
      :image="featuredBags[2].defaultImage"
      :header="
        $i18n.locale === 'it'
          ? featuredBags[2].name.it
          : featuredBags[2].name.en
      "
      :description="
        $i18n.locale === 'it'
          ? featuredBags[2].description.it
          : featuredBags[2].description.en
      "
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
  props: {
    catalog: { type: Array, default: () => [] },
  },
  data() {
    return {
      //
    }
  },
  computed: {
    featuredBags() {
      return this.catalog.filter((item) => item.featured).slice(0, 3)
    },
  },
  mounted() {
    // console.log('featured bags: ', this.featuredBags)
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
