<template>
  <v-container>
    <span
      >{{ bag.stock }}
      {{
        $i18n.locale === 'it'
          ? `${bag.colorName.it} disponibile`
          : `${bag.colorName.en} available`
      }}</span
    >
    <v-img
      :src="selectedImage === null ? bag.image : selectedImage"
      width="300"
      height="300"
      contain
      class="mx-auto"
    ></v-img>
    <div>
      <v-sheet
        elevation="8"
        max-width="800"
        class="mx-auto my-2"
        style="background: rgba(0, 0, 0, 0.5); border-radius: 20px"
      >
        <v-slide-group v-model="model">
          <v-slide-item
            v-for="image in variantImages"
            :key="image.i"
            v-slot="{ toggle }"
          >
            <v-card class="ma-3" height="auto" width="auto" @click="toggle">
              <v-img
                :src="image"
                class="clickableImage"
                :max-width="$vuetify.breakpoint.smAndDown ? '50' : '100'"
                @click="selectedImage = image"
              ></v-img>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    bag: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShown: false,
      images: [
        this.bag.image,
        'https://picsum.photos/600/600?random=1',
        'https://picsum.photos/600/600?random=2',
        'https://picsum.photos/600/600?random=3',
        'https://picsum.photos/600/600?random=4',
        'https://picsum.photos/600/600?random=5',
      ],
      selectedImage: null,
      model: null,
    }
  },
  computed: {
    variantImages() {
      return this.bag.images?.length > 0
        ? [...this.bag.images, this.bag.image]
        : this.images
    },
  },
}
</script>

<style></style>
