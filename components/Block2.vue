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
    <!-- <div class="title">
      <h2>{{ $t('message2') }}</h2>
    </div> -->
    <v-main style="height: 100vh" class="bg">
      <v-row no-gutters style="height: 100%">
        <v-col sm="12" md="6">
          <!-- <v-img src="/images/multiple-bags.png"></v-img> -->
          <v-sheet
            class="text-center left-one pt-10 d-flex flex-column justify-space-between"
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
                <span>{{ $t('shopNow') }}</span>
              </v-btn>
            </v-container>
          </v-sheet>
        </v-col>

        <v-col sm="12" md="6">
          <!-- <v-img src="/images/multiple-bags1.png"></v-img> -->
          <v-sheet
            class="text-center right-one pt-10 d-flex flex-column justify-space-between"
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
              fluid
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

      <!-- upper section -->
      <!-- <v-row
        justify="space-between"
        no-gutters
        :class="{
          'mt-15': $vuetify.breakpoint.mdAndUp,
          'mt-16 pt-16': $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-col
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'a'),
          }"
          offset="1"
          align-self="end"
          cols="5"
          :class="{
            'visible animated slide-from-right': showAnimationFor.a,
            invisible: !showAnimationFor.a,
          }"
        >
          <v-container>
            <ShopLogo
              src="/ebay-logo.png"
              alt="ebay-logo"
              href="https://ebay.com"
            />
          </v-container>
        </v-col>
        <v-col
          v-observe-visibility="{
            callback: (isVisible, entry) =>
              isViewableNow(isVisible, entry, 'b'),
          }"
          align-self="end"
          cols="5"
          :class="{
            'visible animated fadeIn': showAnimationFor.b,
            invisible: !showAnimationFor.b,
          }"
        >
          <v-container>
            <ShopLogo
              src="/facebook-marketplace-logo.png"
              alt="facebook-marketplace-logo"
              href="https://www.facebook.com/marketplace"
            />
          </v-container>
        </v-col>
      </v-row> -->

      <!-- bottom section -->
      <!-- <v-container style="position: absolute; bottom: 15px">
        <v-row no-gutters justify="center"
          ><v-spacer></v-spacer>
          <v-col
            v-observe-visibility="{
              callback: (isVisible, entry) =>
                isViewableNow(isVisible, entry, 'd'),
            }"
            cols="6"
            :class="{
              'visible animated slide-from-left': showAnimationFor.d,
              invisible: !showAnimationFor.d,
            }"
            style="position: relative; right: 15vh"
          >
            <v-container>
              <ShopLogo
                src="/vinted-logo.png"
                alt="vinted-logo"
                href="https://vinted.com"
              />
            </v-container>
          </v-col>
        </v-row>
      </v-container> -->
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
.left-one {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.52),
      rgba(0, 0, 0, 0.73)
    ),
    url('/images/multiple-bags.png');
  height: 100%;
}
.right-one {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.52),
      rgba(0, 0, 0, 0.73)
    ),
    url('/images/multiple-bags1.png');
  height: 100%;
}
#shop-container {
  display: flex;
  justify-content: end;
}
.bg {
  /* background-image: rgba(0, 0, 0, 0.753)
    url('https://picsum.photos/1800/600?random=1') no-repeat center; */
  /* background-image: linear-gradient(
      to bottom,
      rgba(245, 246, 252, 0.52),
      rgba(117, 19, 93, 0.73)
    ),
    url('https://picsum.photos/1800/600?random=1');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center; */
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
