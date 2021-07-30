<template>
  <v-main>
    <Checkout
      v-if="isCheckout"
      :bag="selectedBag"
      :bag-name="bag.name"
      :bag-id="bag._id"
      :bag-price="bag.price"
      @hideCheckout="isCheckout = false"
    />
    <v-card v-else>
      <!-- <v-img v-if="selectedImage === null" :src="bag.defaultImage"></v-img>
      <v-img v-else :src="selectedImage"></v-img> -->

      <v-img :src="!selectedImage ? bag.defaultImage : selectedImage"></v-img>
      <v-card-title>{{ bag.name }}</v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>{{ bag.description }}</v-card-text>
      <div class="my-4 text-subtitle-1">
        {{ bag.currency }} • {{ bag.price }}
      </div>
      <v-divider class="mx-4"></v-divider>

      <v-card-title>Available colors:</v-card-title>
      <div v-for="variant in bag.variants" :key="variant._id">
        <v-chip
          :color="variant.color"
          @click="
            ;(selectedImage = variant.image),
              (selectedBag = variant),
              (lineItems[0].price = variant.price)
          "
        >
          {{ variant.color }}
        </v-chip>
      </div>
      <span>{{ selectedBag.stock }}pcs left</span>
      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          :disabled="isLoading"
          :loading="isLoading"
          @click="handlePurchase"
        >
          Buy now
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import Checkout from './Checkout.vue'
export default {
  components: {
    Checkout,
  },
  props: {
    bag: { type: Object, required: true },
  },
  data() {
    return {
      isCheckout: false,
      isLoading: false,
      selectedImage: null,
      selectedBag: this.bag.variants[0], // default value, the bag object
      stripe: null,
      lineItems: [
        {
          price: this.bag.variants[0].price, // The price_id from Stripe dashboard // default value
          quantity: 1,
        },
      ],
      successURL: `http://localhost:8000/${this.$i18n.locale}/catalog/success`,
      cancelURL: `http://localhost:8000/${this.$i18n.locale}/catalog/cancel`,
    }
  },
  async mounted() {
    this.stripe = await loadStripe(process.env.NUXT_APP_STRIPE_PK)
  },
  updated() {
    // console.log(this.lineItems[0].price)
    // console.log(typeof this.lineItems[0].price)
    // console.log(this.lineItems)
  },
  methods: {
    handlePurchase() {
      //   this.isLoading = true
      //   this.stripe.redirectToCheckout({
      //     successUrl: this.successURL,
      //     cancelUrl: this.cancelURL,
      //     lineItems: this.lineItems,
      //     mode: 'payment',
      //   })
      this.isCheckout = true
    },
  },
}
</script>

<style></style>
