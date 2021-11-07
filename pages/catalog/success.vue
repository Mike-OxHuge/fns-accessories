<template>
  <v-main>
    <v-container d-flex flex-column>
      <h1 class="text-center">Thank you for your order, {{ data.name }}</h1>
      <p class="text-center">
        Your purchase will be delivered to: {{ data.shipping.name }},
        {{ address.postal_code }},
        {{
          address.line2 ? address.line1 + ' ' + address.line2 : address.line1
        }}, {{ address.city }}, {{ address.country }}.
      </p>
      <h2 class="text-center">
        Purchased {{ data.purchasedBags.length > 1 ? 'items' : 'item' }}:
      </h2>
      <v-row>
        <v-col v-for="bag in data.purchasedBags" :key="bag._id" cols="12">
          <h4 class="text-center my-2">
            {{
              $i18n.locale === 'it'
                ? data.bagName.name.it +
                  ' (' +
                  bag.colorName.it +
                  ') ' +
                  'por ' +
                  bag.price +
                  '€'
                : data.bagName.name.en +
                  ' (' +
                  bag.colorName.en +
                  ') ' +
                  'for ' +
                  bag.price +
                  '€'
            }}
          </h4>
          <v-row justify="center">
            <v-col
              v-for="image in bag.images"
              :key="image.i"
              cols="12"
              sm="6"
              md="4"
            >
              <v-img width="auto" :src="image"></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-btn
        :block="$vuetify.breakpoint.smAndDown"
        color="primary"
        class="mx-auto my-5"
        @click="$router.replace(`/${$i18n.locale}/`)"
        >HOME</v-btn
      >
    </v-container>
  </v-main>
</template>

<script>
export default {
  // destructuring context
  async asyncData({ $axios, route, store, i18n, redirect }) {
    if (store.state.counter > 0) {
      redirect(`/${i18n.locale}/`)
    } else {
      const { data } = await $axios.get(
        `/api/v1/purchase/order-status?session_id=${route.query.session_id}`
      )
      // console.log('fetch')
      return { data }
    }
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
    this.$store.commit('incCounter')
  },
}
</script>

<style></style>
