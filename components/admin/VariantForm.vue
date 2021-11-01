<template>
  <v-sheet>
    <v-container>
      <v-form @submit.prevent="handleSubmit()">
        <h1 class="text-center">VARIANT FORM</h1>
        <v-main class="my-10">
          <section class="data">
            <v-row style="max-width: 100%; overflow: hidden" align="center">
              <v-col cols="12" sm="12" md="6">
                <v-color-picker
                  v-model="variant.color"
                  dot-size="25"
                  hide-inputs
                  mode="hexa"
                  swatches-max-height="200"
                ></v-color-picker>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="variant.colorName.en"
                  type="text"
                  outlined
                  label="color (the word) to display (EN)"
                  placeholder="ENGLISH"
                ></v-text-field>
                <v-text-field
                  v-model="variant.colorName.it"
                  type="text"
                  outlined
                  label="color (the word) to display (IT)"
                  placeholder="ITALIAN"
                ></v-text-field>
              </v-col>
            </v-row>
          </section>

          <section class="data">
            <v-row style="max-width: 100%; overflow: hidden" align="center">
              <v-col cols="12" sm="12" md="6">
                <v-file-input
                  accept="image/*"
                  label="Main image"
                  @change="(e) => setFile(e)"
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-file-input
                  accept="image/*"
                  chips
                  multiple
                  label="The rest images"
                  @change="(e) => setFiles(e)"
                ></v-file-input>
              </v-col>
            </v-row>
          </section>

          <section class="data">
            <v-text-field
              v-model="variant.price"
              type="tel"
              outlined
              label="price"
              placeholder="set price"
            ></v-text-field>
            <v-text-field
              v-model="variant.stock"
              type="tel"
              outlined
              label="stock"
              placeholder="how many do you have?"
            ></v-text-field>
          </section>
        </v-main>
        <v-btn
          block
          type="submit"
          color="success"
          class="mt-5"
          :disabled="!isValid"
          >add</v-btn
        >
      </v-form>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      variant: {
        color: '',
        colorName: { en: '', it: '' },
        price: null,
        stock: null,
        image: null,
        images: [],
        stripeProductId: '',
      },
    }
  },
  computed: {
    isValid() {
      const { image, images, color, colorName, price, stock } = this.variant
      return (
        color &&
        colorName.en &&
        colorName.it &&
        image &&
        images &&
        price &&
        stock
      )
    },
  },
  mounted() {
    alert('CLEAR all the file input fields!')
  },
  methods: {
    setFile(e) {
      try {
        this.variant.image = e
      } catch (error) {
        alert(error)
      }
    },
    setFiles(e) {
      try {
        this.variant.images = e
      } catch (error) {
        alert(error)
      }
    },
    handleSubmit() {
      this.$emit('add', this.variant)
      this.variant = {
        color: '',
        colorName: { en: '', it: '' },
        price: null,
        stock: null,
        image: null,
        images: [],
        stripeProductId: '',
      }
      this.setFile(null)
      this.setFiles(null)
    },
  },
}
</script>

<style scoped>
.data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.data > * {
  margin: 1rem;
}
</style>
