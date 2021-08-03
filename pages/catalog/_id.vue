<template>
  <v-container class="bg accent--text">
    <v-dialog v-model="isCheckout">
      <Checkout
        v-if="isCheckout"
        :bag="variant[0]"
        :bag-name="bag.name"
        :bag-id="bag._id"
        :bag-price="bag.price"
        @hideCheckout="isCheckout = false"
      />
    </v-dialog>
    <v-icon color="primary" @click="$router.go(-1)">arrow_back_ios_new</v-icon>
    <h1 v-if="bag === null">LOADING...</h1>
    <v-container v-else>
      <h1>{{ bag.name }}</h1>
      <p>{{ bag.description }}</p>
      <DetailedBag v-if="variant !== null" :bag="variant[0]" />
      <v-btn color="primary" @click="isCheckout = true"
        >Buy now for {{ bag.currency }} {{ bag.price }}</v-btn
      >
    </v-container>
  </v-container>
</template>

<script>
import DetailedBag from '~/components/CatalogComponents/DetailedBag.vue'
import Checkout from '~/components/CatalogComponents/Checkout.vue'

export default {
  components: { DetailedBag, Checkout },
  data() {
    return {
      isLoading: false,
      isCheckout: false,
      bag: null,
      variant: null,
    }
  },
  created() {
    //
    this.getBag()
  },
  updated() {
    //
  },
  methods: {
    async getBag() {
      this.isLoading = true
      const getBag = await fetch(
        `${process.env.NUXT_APP_BACKEND_URL}/api/v1/bags/${this.$route.params.id}`
      )
      this.bag = await getBag.json()
      this.variant = await this.bag.variants.filter(
        (v) => v._id === this.$route.query.variant
      )
      this.isLoading = false
    },
  },
}
</script>

<style scoped></style>
