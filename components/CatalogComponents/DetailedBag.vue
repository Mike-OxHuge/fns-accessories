<template>
  <v-container pa-0 d-flex flex-column>
    <v-img
      :src="selectedImage === null ? bag.images[0] : selectedImage"
      width="800"
      :max-height="responsiveImageHeight"
      contain
      class="mx-auto"
    ></v-img>
    <div class="mt-auto">
      <v-sheet
        max-width="800"
        class="mx-auto"
        style="background: rgba(0, 0, 0, 0.5); border-radius: 0 0 20px 20px"
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
                @click="selection(image)"
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
      return this.bag.images?.length > 0 ? [...this.bag.images] : this.images
    },
    responsiveImageHeight() {
      return this.$vuetify.breakpoint.lg ? '400' : '600'
    },
  },
  methods: {
    selection(image) {
      this.selectedImage = image
    },
  },
}
</script>

<style></style>
