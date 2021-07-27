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
    <NuxtLink :to="`/${$i18n.locale}/catalog/fullcatalog`"
      >Full catalog</NuxtLink
    >
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
        <v-btn @click="buy">Client side</v-btn>
        <v-btn @click="buyServer">YT tutorial (server)</v-btn>
        <v-btn @click="redirect">YT tutorial (client)</v-btn>

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
    <v-row justify="center">
      <v-col cols="4">
        <div id="payment-form"></div>
        <v-text-field
          v-model="billingDetails.name"
          placeholder="name"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.email"
          placeholder="email"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.address.city"
          placeholder="city"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.address.line1"
          placeholder="line 1"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.address.state"
          placeholder="state"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.address.postal_code"
          placeholder="zip"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import { loadStripe } from '@stripe/stripe-js'

export default {
  components: {
    StripeCheckout,
  },
  data() {
    return {
      stripe: null,
      elements: null,
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
      billingDetails: {
        name: '',
        email: '',
        address: {
          city: '',
          line1: '',
          state: '',
          postal_code: '',
        },
      },
    }
  },
  computed: {
    //
  },
  async mounted() {
    // const ELEMENT_TYPE = 'card'
    this.fetching()

    this.stripe = await loadStripe(this.pk)
    this.elements = await this.stripe.elements()
    const element = await this.elements.create('card')
    element.mount('#payment-form')
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
      console.log(this.$refs.checkoutRef[0].redirectToCheckout)
      await this.$refs.checkoutRef[1].redirectToCheckout()
    },
    async buyServer() {
      const billingDetails = this.billingDetails
      const element = this.elements.getElement('card')
      const response = await fetch(
        `${this.url}/api/v1/purchase/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 1999 }),
        }
      )
      const responseJson = await response.json()
      const clientSecret = responseJson.secret
      console.log(clientSecret)
      console.log(this.stripe)

      const paymentMethodReq = await this.stripe.createPaymentMethod({
        type: 'card',
        card: element,
        billing_details: billingDetails,
      })
      const { error } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      })
      if (error) return error
      this.$router.push(`/${this.$i18n.locale}/catalog/success`)
    },
    redirect() {
      this.stripe.redirectToCheckout({
        successUrl: this.successURL,
        cancelUrl: this.cancelURL,
        lineItems: this.lineItems,
        mode: 'payment',
      })
    },
  },
}
</script>

<style></style>
