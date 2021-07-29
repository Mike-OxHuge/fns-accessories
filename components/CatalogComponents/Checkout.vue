<template>
  <v-main>
    <div v-if="isError"><CheckoutError :error="errorObject" /></div>
    <div v-else-if="isSuccess">
      <CheckoutSuccess
        :bag-name="bagName"
        :bag="bag"
        :address="billingDetails"
      />
    </div>
    <div v-else>
      <h3>CHECKOUT</h3>
      <v-btn @click="hideCheckout">X</v-btn>
      <v-img :src="bag.image" max-height="150"></v-img>
      <span>{{ bagName }}({{ bag.color }})</span>
      <v-form v-model="valid">
        <v-text-field
          v-model="billingDetails.name"
          required
          label="Name"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.email"
          required
          label="E-mail"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.address.city"
          required
          label="City"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.address.line1"
          required
          label="Address"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.address.state"
          required
          label="Province"
        ></v-text-field>
        <v-text-field
          v-model="billingDetails.address.postal_code"
          required
          label="Postal Code"
        ></v-text-field>
        <div id="payment-form">
          <!-- card injected here -->
        </div>
        <v-btn :disabled="isLoading" :loading="isLoading" @click="handleSubmit"
          >Submit</v-btn
        >
      </v-form>
    </div>
  </v-main>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import CheckoutError from './CheckoutError.vue'
import CheckoutSuccess from './CheckoutSuccess.vue'
export default {
  components: {
    CheckoutError,
    CheckoutSuccess,
  },
  props: {
    bag: {
      type: Object,
      required: true,
    },
    bagName: { type: String, required: true },
    bagId: { type: String, required: true },
    bagPrice: { type: Number, required: true },
  },
  data() {
    return {
      isError: false,
      errorObject: null,
      isSuccess: false,
      isLoading: false,
      valid: false,
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
      stripe: null,
      elements: null,
    }
  },
  async mounted() {
    this.stripe = await loadStripe(process.env.NUXT_APP_STRIPE_PK)
    this.elements = await this.stripe.elements()
    const element = await this.elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#151515',
          fontWeight: '500',
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: '#87BBFD',
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },
    })
    element.mount('#payment-form')
  },
  methods: {
    hideCheckout() {
      this.$emit('hideCheckout')
    },
    async handleSubmit() {
      this.isLoading = true
      const billingDetails = this.billingDetails
      const element = this.elements.getElement('card')

      const findBagRaw = await fetch(
        `${process.env.NUXT_APP_BACKEND_URL}/api/v1/bags/${this.bagId}`
      )
      const findBagJSON = await findBagRaw.json()
      const variant = findBagJSON.variants.find(
        (variant) => variant._id === this.bag._id
      )

      const response = await fetch(
        `${process.env.NUXT_APP_BACKEND_URL}/api/v1/purchase/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: this.bagId }),
        }
      )
      const responseJson = await response.json()
      const clientSecret = responseJson.secret

      const paymentMethodReq = await this.stripe.createPaymentMethod({
        type: 'card',
        card: element,
        billing_details: billingDetails,
      })
      const { error } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      })
      if (error) {
        this.isError = true
        this.errorObject = error
        return error
      } else {
        this.isSuccess = true
        await fetch(
          `${process.env.NUXT_APP_BACKEND_URL}/api/v1/bags/${this.bagId}/${variant._id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: 1 }),
          }
        )
      }
    },
  },
}
</script>

<style scoped>
#payment-form {
  margin: 2rem 0;
}
</style>
