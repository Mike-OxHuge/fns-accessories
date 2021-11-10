import Vue from 'vue'
import {
  StripePlugin,
  StripeCheckout,
  StripeElementCard,
} from '@vue-stripe/vue-stripe'

export default () => {
  Vue.component('StripeCheckout', StripeCheckout)
  Vue.component('StripeElementCard', StripeElementCard)
  Vue.use(StripePlugin, { pk: process.env.NUXT_APP_STRIPE_PK })
}
