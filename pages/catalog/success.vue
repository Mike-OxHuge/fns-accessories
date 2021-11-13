<i18n>
{
  "en": {
    "thanks": "Thank you for your order, ",
    "orderMessage": "Your order is on its way to: ",
    "question": "If you have any questions please do not hesitate to contact us at:",
    "purchase": "Your purchase:"
  },
  "it": {
    "thanks": "Grazie per il vostro ordine, ",
    "orderMessage": "Il tuo ordine è in viaggio per: ",
    "question": "In caso di domande, non esitate a contattarci all'indirizzo:",
    "purchase": "Il tuo acquisto:"
  }
}
</i18n>
<template>
  <v-container
    d-flex
    flex-column
    my-auto
    style="border-radius: 20px; background: rgba(0, 0, 0, 0.5)"
  >
    <h1 class="text-center">{{ $t('thanks') + data.name }}</h1>
    <div class="d-flex mx-auto">
      <p>{{ $t('orderMessage') }}</p>
      <div class="address">
        <p>{{ data.shipping.name }}</p>
        <p>
          {{
            address.line2 ? address.line1 + ' ' + address.line2 : address.line1
          }}
        </p>
        <p>
          {{
            address.postal_code + ' ' + address.city + ', ' + address.country
          }}
        </p>
      </div>
    </div>

    <!-- <p class="text-center">
      Your purchase will be delivered to: {{ data.shipping.name }},
      {{ address.postal_code }},
      {{ address.line2 ? address.line1 + ' ' + address.line2 : address.line1 }},
      {{ address.city }}, {{ address.country }}.
    </p> -->
    <h2 class="text-center">{{ $t('purchase') }}:</h2>
    <DetailedBag :bag="data.purchasedBags[0]" />
    <p>
      {{ $t('question') }}
      <a target="_blank" href="mailto:mikelitoris34@icloud.com"
        >mikelitoris34@icloud.com</a
      >
    </p>
    <v-btn
      :block="$vuetify.breakpoint.smAndDown"
      color="primary"
      class="mx-auto my-5"
      @click="$router.replace(`/${$i18n.locale}/`)"
    >
      <v-icon>home</v-icon>
      homepage</v-btn
    >
  </v-container>
</template>

<script>
import DetailedBag from '~/components/CatalogComponents/DetailedBag.vue'
export default {
  components: { DetailedBag },
  layout: 'order-status',
  // destructuring context
  async asyncData({ $axios, route, store, i18n, redirect }) {
    const { data } = await $axios.get(
      `/api/v1/purchase/order-status?session_id=${route.query.session_id}`
    )
    return { data }
  },
  data() {
    return {
      //
    }
  },
  computed: {
    address() {
      return this.data.shipping.address
    },
  },
  mounted() {
    //
  },
}
</script>

<style>
.address p {
  margin: 0 0 0 10px;
  text-align: left;
}
</style>
