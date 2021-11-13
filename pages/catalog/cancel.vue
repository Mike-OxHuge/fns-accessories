<i18n>
{
  "en": {
    "cancelled": "Your order has been cancelled.",
    "question": "If you believe this is a mistake or have had any other issues, please contact us at:",
    "stripe": "The payments are processed by Stripe. Find out more about Stripe:",
    "choose": "Choose your way to proceed:"
  },
  "it": {
    "cancelled": "Il tuo ordine è stato annullato.",
    "question": "Se ritieni che si tratti di un errore o di altri problemi, contattaci all'indirizzo:",
    "stripe": "I pagamenti vengono elaborati da Stripe. Scopri di più su Stripe:",
    "choose": "Scegli il tuo modo di procedere:"
  }
}
</i18n>
<template>
  <v-container
    my-auto
    style="border-radius: 20px; background: rgba(0, 0, 0, 0.5)"
  >
    <h1>{{ $t('cancelled') }}</h1>
    <v-divider class="mx-4 my-2"></v-divider>
    <p>
      {{ $t('question') }}
      <a target="_blank" href="mailto:mikelitoris34@icloud.com"
        >mikelitoris34@icloud.com</a
      >
    </p>
    <v-divider class="mx-4 my-2"></v-divider>
    <p>
      {{ $t('stripe') }}
      <a target="_blank" href="https://stripe.com/" rel="noopener noreferrer">
        <v-icon color="primary">public</v-icon>stripe.com
      </a>
      |
      <a
        :href="
          $i18n.locale === 'it'
            ? 'https://it.wikipedia.org/wiki/Stripe'
            : 'https://en.wikipedia.org/wiki/Stripe_(company)'
        "
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon color="primary">menu_book</v-icon> wikipedia
      </a>
    </p>
    <v-divider class="mx-4 my-2"></v-divider>
    <v-row style="max-width: 100%" dense justify="space-around">
      <v-col cols="12">
        <h2>{{ $t('choose') }}</h2>
      </v-col>
      <v-col v-for="btn in btns" :key="btn.i" cols="8" sm="6" md="3">
        <v-btn class="black--text" block :color="btn.color" :href="btn.to">
          <v-icon> {{ btn.icon }} </v-icon>
          {{ btn.text }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'order-status',
  data() {
    return {
      sessionLink: null,
      btns: [
        {
          text: this.$i18n.locale === 'it' ? 'catalogare' : 'to catalog',
          to: `/${this.$i18n.locale}/catalog`,
          color: 'warning',
          icon: 'store',
        },
        {
          text:
            this.$i18n.locale === 'it'
              ? 'Torna al checkout'
              : 'back to checkout',
          to: '',
          color: 'success',
          icon: 'receipt_long',
        },
        {
          text: this.$i18n.locale === 'it' ? 'alla home page' : 'back home',
          to: `/${this.$i18n.locale}`,
          color: 'primary',
          icon: 'home',
        },
      ],
    }
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get(
        `/api/v1/purchase/order-status?session_id=${this.$route.query.session_id}&cancelled=true`
      )
      this.btns.forEach((e) =>
        e.text.includes('checkout') ? (e.to = data.url) : null
      )
    } catch (error) {
      this.redirect(`/${this.$i18n.locale}/`)
    }
  },
}
</script>

<style></style>
