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
              <v-col cols="12">
                <v-file-input
                  accept="image/*"
                  :disabled="edit"
                  chips
                  multiple
                  label="Images (ORDER MATTERS:the first (by name) will be used as default)"
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
              :disabled="edit"
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
          >{{ product ? 'save' : 'add' }}</v-btn
        >
      </v-form>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        color: '',
        colorName: { en: '', it: '' },
        price: null,
        stock: null,
        images: [],
        stripeProductId: '',
      }),
    },
    edit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      variant: {
        color: '',
        colorName: { en: '', it: '' },
        price: null,
        stock: null,
        images: [],
        stripeProductId: '',
      },
    }
  },
  computed: {
    isValid() {
      const { images, color, colorName, price, stock } = this.variant
      return (
        color &&
        colorName.en &&
        colorName.it &&
        images &&
        // eslint-disable-next-line no-self-compare
        parseInt(price) === parseInt(price) &&
        stock
      )
    },
  },
  watch: {
    product: {
      immediate: true,
      handler(newVal, oldVal) {
        if (oldVal !== newVal) {
          this.variant = newVal
        } else {
          this.variant = oldVal
        }
      },
    },
  },

  methods: {
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
