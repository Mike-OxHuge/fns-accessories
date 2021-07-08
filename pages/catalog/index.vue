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
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      bags: [],
      isLoading: null,
      url: process.env.NUXT_APP_BACKEND_URL,
      localurl: 'http://localhost:3001',
      quantityRules: [
        (v) => !!v || 'Quantity is required',
        (v) => typeof v !== `number` || 'It has to be a number!',
      ],
    }
  },
  computed: {
    //
  },
  mounted() {
    this.fetching()
    this.bitchin()
  },
  methods: {
    async fetching() {
      this.isLoading = true
      const products = await fetch(`${this.url}/items`)
      const response = await products.json()
      this.bags = await response
      this.isLoading = false
    },
    async handlePurchase(bag) {
      const id = bag._id
      const quantity = parseInt(document.getElementById(bag._id).value)
      await fetch(`${this.localurl}/items/${id}`, {
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
    bitchin() {
      // console.log(`
      //   NUXT_APP_BACKEND_URL: ${process.env.NUXT_APP_BACKEND_URL},
      //   BASE_URL: ${process.env.BASE_URL},
      //   NUXT_APP_TEST: ${process.env.NUXT_APP_TEST},
      //   NUXT_ENV_TEST: ${process.env.NUXT_ENV_TEST},
      // `)
      console.log('env works well')
    },
  },
}
</script>

<style></style>
