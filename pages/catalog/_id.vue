<template>
  <div id="bg" class="bg">
    <v-container class="accent--text text-center" d-flex justify-center>
      <v-dialog v-model="isCheckout">
        <Checkout
          v-if="isCheckout"
          :bag="variant[0]"
          :bag-name="bag.name"
          s
          :bag-id="bag._id"
          :bag-price="bag.price"
          @hideCheckout="isCheckout = false"
        />
      </v-dialog>
      <h1 v-if="bag === null">LOADING...</h1>
      <v-container v-else pt-0>
        <div class="d-flex justify-center">
          <v-icon class="mr-auto" color="primary" @click="$router.go(-1)"
            >arrow_back_ios_new</v-icon
          >
          <h1 class="mr-auto">{{ bag.name }}</h1>
        </div>
        <p>{{ bag.description }}</p>
        <DetailedBag v-if="variant !== null" :bag="variant[0]" />
        <v-btn color="primary" @click="isCheckout = true"
          >Buy now for {{ bag.currency }} {{ bag.price }}</v-btn
        >
      </v-container>
    </v-container>
  </div>
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

<style></style>
