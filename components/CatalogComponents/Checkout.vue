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
      <v-container d-flex justify-space-between pa-0>
        <h3>CHECKOUT</h3>
        <v-icon class="pb-1" color="black" @click="hideCheckout">close</v-icon>
      </v-container>

      <v-container d-flex>
        <v-img :src="bag.image" max-height="100" width="100" contain></v-img>
        <v-container>
          <span>{{ bagName }}({{ bag.color }})</span>
          <span>{{ bagPrice }} EUR</span>
        </v-container>
      </v-container>

      <v-form v-model="valid">
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="billingDetails.name"
              dense
              required
              label="Name"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="billingDetails.email"
              dense
              required
              label="E-mail"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-text-field
              v-model="billingDetails.address.city"
              dense
              required
              label="City"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="billingDetails.address.state"
              dense
              required
              label="Province"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="billingDetails.address.postal_code"
              dense
              required
              label="Postal Code"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          v-model="billingDetails.address.line1"
          dense
          required
          label="Address"
        ></v-text-field>

        <div id="payment-form">
          <!-- card injected here -->
        </div>
        <v-container mx-auto pa-0 class="text-center">
          <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            color="deep-purple lighten-2"
            @click="handleSubmit"
            >Purchase</v-btn
          >
        </v-container>
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
  margin: -0.5rem 0 1rem 0;
}
</style>
