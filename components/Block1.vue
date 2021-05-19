<i18n>
{
  "en": {
    "message2": "I am awesome"
  },
  "it": {
    "message2": "Sono molto awesome"
  }
}
</i18n>
<template>
  <v-main>
    <div id="main-wrap" :style="{ 'background-image': 'url(' + image + ')' }">
      <div class="d-flex justify-center fadeInDown">
        <v-avatar :size="customSize" class="mt-5 mr-5">
          <v-img src="logo.png"></v-img>
        </v-avatar>
        <div class="d-flex flex-column align-self-center ml-5">
          <h1 class="text-center">F&S</h1>
          <h3>HandmadeAccessories</h3>
        </div>
      </div>

      <div class="title">
        <h2>Awesome stuff</h2>
        <p>For awesome people</p>
        <span>{{ $t('message') }}</span>
        <span>{{ $t('message2') }}</span>
        <localeSwitch />
      </div>
    </div>
  </v-main>
</template>

<script>
import localeSwitch from '~/components/LanguageInput.vue'
export default {
  components: {
    localeSwitch,
  },
  data() {
    return {
      image: 'https://picsum.photos/1920/1080?random=1',
      images: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3',
        'https://picsum.photos/800/600?random=4',
        'https://picsum.photos/800/600?random=5',
      ],
    }
  },
  computed: {
    customHeight() {
      return this.$vuetify.breakpoint.smAndDown ? '100' : '200'
    },
    customWidth() {
      return this.$vuetify.breakpoint.mdAndUp ? 'width: 25vw' : 'width:35vw'
    },
    customSize() {
      return this.$vuetify.breakpoint.smAndDown ? '100' : '200'
    },
  },
  mounted() {
    this.resetHeight()
  },
  methods: {
    resetHeight() {
      const body = document.getElementById('main-wrap')
      body.style.height = window.innerHeight + 'px'
    },
  },
}
</script>

<style>
@import url(~/assets/css/keyframes.css);

.block-one,
.block-two {
  width: 100%;
  height: 30%;
  position: absolute;
  top: 2vh;
  bottom: 2vh;
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
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
