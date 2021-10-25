<template>
  <v-container class="accent--text">
    <v-dialog v-model="isCheckout">
      <Checkout
        :bag="selectedBag"
        :bag-name="bag.name"
        :bag-id="bag._id"
        :bag-price="bag.price"
        @hideCheckout="isCheckout = false"
      />
    </v-dialog>

    <v-card
      v-if="!isCheckout"
      style="background: rgba(0, 0, 0, 0.5)"
      outlined
      shaped
      class="accent--text"
    >
      <v-img
        ripple
        :src="!selectedImage ? bag.defaultImage : selectedImage"
        class="clickableImage"
        @click="
          $router.push(
            `/${$i18n.locale}/catalog/${bag._id}?variant=${selectedBag._id}`
          )
        "
      ></v-img>
      <v-card-title>
        <v-row justify="space-between" class="px-2">
          <p>{{ bag.name }}</p>
          <p>{{ bag.currency }} • {{ bag.price }}</p>
        </v-row>
      </v-card-title>

      <v-card-text class="accent--text">{{ bag.description }}</v-card-text>
      <v-row no-gutters justify="center">
        <v-col v-for="variant in bag.variants" :key="variant._id">
          <v-container mx-auto pa-0 class="d-flex justify-center">
            <v-chip
              :color="variant.color"
              :disabled="variant.stock === 0"
              @click="
                ;(selectedImage = variant.image),
                  (selectedBag = variant),
                  (lineItems[0].price = variant.price)
              "
            >
              {{ variant.color }}
            </v-chip>
          </v-container>
        </v-col>

        <v-col cols="8">
          <v-container mx-auto pa-0 class="text-center accent--text">
            <span class="text-center">
              {{ selectedBag.stock }} {{ selectedBag.color }} bags in stock!
            </span>
          </v-container>
        </v-col>

        <v-col cols="12">
          <v-card-actions>
            <v-container
              d-flex
              justify-space-between
              mx-auto
              pa-0
              class="text-center"
            >
              <v-btn
                color="primary"
                :disabled="selectedBag.stock === 0"
                :loading="isLoading"
                @click="handlePurchase"
              >
                Buy now
              </v-btn>
              <v-btn
                color="primary"
                @click="
                  $router.push(
                    `/${$i18n.locale}/catalog/${bag._id}?variant=${selectedBag._id}`
                  )
                "
                >Details</v-btn
              >
            </v-container>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
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
    //
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

<style>
.clickableImage:hover {
  cursor: pointer;
}
</style>
