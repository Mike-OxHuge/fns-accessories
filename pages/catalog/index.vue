<i18n>
{
  "en": {
     "message": "Products"
  },
  "it": {
     "message": "Prodotti"
  }
}
</i18n>
<template>
  <v-main>
    <h1 @click="fetching()">{{ $t('message') }}</h1>
    <h3 v-if="isLoading">Loading...</h3>
    <v-row v-else>
      <v-col v-for="bag in bags" :key="bag._id" cols="6">
        <v-avatar>
          <img :src="bag.cover" alt="bag" />
        </v-avatar>
        <h2>{{ bag.title }}</h2>
        <p>{{ bag.description }}</p>
        <span>Available: {{ bag.quantity }}</span>
        <v-text-field :id="bag._id" type="number" label="Quantity" />

        <v-btn :disabled="bag.quantity <= 0" @click="handlePurchase(bag)">
          <span v-if="bag.quantity <= 0">Out of stock</span>
          <span v-else>Buy Now!</span>
        </v-btn>
        <v-btn @click="buy">Test</v-btn>
        <StripeCheckout
          ref="checkoutRef"
          :pk="pk"
          mode="payment"
          :line-items="lineItems"
          :success-url="successURL"
          :cancel-url="cancelURL"
        />
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import * as StripePlugin from '~/plugins/stripe.js'
export default {
  components: {
    StripeCheckout,
  },
  data() {
    return {
      pk: process.env.NUXT_APP_STRIPE_PK,
      bags: [],
      isLoading: null,
      url: process.env.NUXT_APP_BACKEND_URL,
      localurl: 'http://localhost:3001/api/v1',
      quantityRules: [
        (v) => !!v || 'Quantity is required',
        (v) => typeof v !== `number` || 'It has to be a number!',
      ],
      lineItems: [
        {
          price: 'price_1J40jlKuBnFIZzDsFA0PJVoJ', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: `http://localhost:8000/${this.$i18n.locale}/catalog/success`,
      cancelURL: `http://localhost:8000/${this.$i18n.locale}/catalog/cancel`,
    }
  },
  computed: {
    //
  },
  mounted() {
    this.fetching()
    console.log(StripePlugin)
    console.log(this.$stripe)
  },
  methods: {
    async fetching() {
      this.isLoading = true
      const products = await fetch(`${this.url}/api/v1/items`)
      const response = await products.json()
      this.bags = await response
      this.isLoading = false
    },
    async handlePurchase(bag) {
      const id = bag._id
      const quantity = parseInt(document.getElementById(bag._id).value)
      await fetch(`${this.url}/items/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          purchasedAmount: Math.floor(Math.abs(quantity)),
        }),
      })
      await this.fetching()
    },
    async buy() {
      const response = await fetch(`${this.url}/api/v1/purchase`)
      const responseJson = await response.json()
      const clientSecret = responseJson.client_secret
      console.log(clientSecret)
      console.log(this.$refs.checkoutRef[0].redirectToCheckout)
      this.$refs.checkoutRef[1].redirectToCheckout()
    },
  },
}
</script>

<style></style>
