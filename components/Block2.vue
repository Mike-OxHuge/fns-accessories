<i18n>
{
  "en": {
    "shopNow" : "Shop now",
    "message2": "Eco. Fresh. New.",
    "message3": "Our bags will serve you well for the rest of your days.",
    "message4" : "Or visit our Vinted shop:"
  },
  "it": {
    "shopNow" : "Acquistare ora",
    "message2": "Eco. Fresco. Nuovo.",
    "message3": "Le nostre borse ti serviranno bene per il resto dei tuoi giorni.",
    "message4" : "Oppure visita il nostro negozio Vinted:"
  }
}
</i18n>
<template>
  <v-main id="main-wrap">
    <v-main style="height: 100%" class="bg">
      <v-row no-gutters style="height: 100%">
        <v-col cols="12" sm="12" md="6">
          <v-sheet
            class="
              text-center
              left-one
              pt-10
              d-flex
              flex-column
              justify-space-between
            "
          >
            <v-container fluid pt-10>
              <h3>{{ $t('message2') }}</h3>
              <p>{{ $t('message3') }}</p>
            </v-container>
            <v-container mb-15 pb-15 fluid>
              <v-btn
                class="mx-auto"
                color="primary"
                @click="$router.push(`/${$i18n.locale}/catalog`)"
              >
                <span class="black--text">{{ $t('shopNow') }}</span>
              </v-btn>
            </v-container>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <v-sheet
            class="
              text-center
              right-one
              pt-10
              d-flex
              flex-column
              justify-space-between
            "
          >
            <v-container fluid pt-10>
              <h3>{{ $t('message4') }}</h3>
            </v-container>
            <v-container
              v-observe-visibility="{
                callback: (isVisible, entry) =>
                  isViewableNow(isVisible, entry, 'a'),
              }"
              mb-15
              pb-15
              class="d-flex justify-end"
              :class="{
                'visible animated slide-from-left': showAnimationFor.a,
                invisible: !showAnimationFor.a,
              }"
            >
              <ShopLogo
                src="/vinted-logo.png"
                alt="vinted-logo"
                href="https://vinted.com"
              />
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
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
.left-one {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.52),
      rgba(0, 0, 0, 0.73)
    ),
    url('/images/multiple-bags.jpg');
  height: 100%;
  background-repeat: repeat;
}
.right-one {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.52),
      rgba(0, 0, 0, 0.73)
    ),
    url('/images/multiple-bags1.jpg');
  height: 100%;
  background-repeat: repeat;
}
#shop-container {
  display: flex;
  justify-content: flex-end;
}
h3 {
  font-size: 3rem;
}
p {
  font-size: 1.5rem;
}
h3,
p {
  color: #fff;
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
  z-index: 999;
}
</style>
