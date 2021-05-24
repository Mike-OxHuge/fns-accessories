<i18n>
{
  "en": {
     "message": "Hello!",
    "message2": "This is the third page"
  },
  "it": {
     "message": "Ciao!",
    "message2": "Questa è la terza pagina"
  }
}
</i18n>
<template>
  <v-carousel continuous cycle>
    <v-carousel-item v-for="item in items" :key="item.i">
      <v-sheet>
        <v-img :src="item.src" position="center" contain></v-img>
        <div
          style="
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            width: 100vw;
            background-color: rgba(0, 0, 0, 0.55);
            padding: 5% 0px;
          "
        >
          <h2>{{ $t('message') }}</h2>
          <p>{{ $t('message2') }}</p>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { src: 'https://picsum.photos/900/1600?random=1' },
        { src: 'https://picsum.photos/900/1600?random=2' },
        { src: 'https://picsum.photos/900/1600?random=3' },
        { src: 'https://picsum.photos/900/1600?random=4' },
        { src: 'https://picsum.photos/900/1600?random=5' },
        { src: 'https://picsum.photos/900/1600?random=6' },
        { src: 'https://picsum.photos/900/1600?random=7' },
      ],
    }
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
