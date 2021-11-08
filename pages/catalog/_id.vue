<template>
  <div id="bg" class="bg">
    <v-container class="accent--text text-center" d-flex justify-center>
      <h1 v-if="bag === null">LOADING...</h1>
      <v-container v-else pt-0>
        <div class="d-flex justify-center">
          <v-icon class="mr-auto" color="primary" @click="$router.go(-1)"
            >arrow_back_ios_new</v-icon
          >
          <h1 class="mr-auto">
            {{ $i18n.locale === 'it' ? bag.name.it : bag.name.en }}
          </h1>
        </div>
        <p>
          {{ $i18n.locale === 'it' ? bag.description.it : bag.description.en }}
        </p>
        <DetailedBag v-if="variant !== null" :bag="variant[0]" />
        <v-btn
          v-if="variant"
          color="primary"
          :loading="isLoading"
          :disabled="variant[0].stock <= 0"
          @click="buy"
          >Buy now for EUR {{ variant[0].price }}</v-btn
        >
      </v-container>
    </v-container>
  </div>
</template>

<script>
import DetailedBag from '~/components/CatalogComponents/DetailedBag.vue'
import { handlePurchase } from '~/composables/stripeHandlers.js'

export default {
  components: { DetailedBag },
  data() {
    return {
      isLoading: false,
      bag: null,
      variant: null,
    }
  },
  created() {
    //
    this.getBag()
  },
  mounted() {
    // this.$store.commit('resetCounter')
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
    async buy() {
      this.isLoading = true
      await handlePurchase(this.variant[0], this.$route.params.id)
    },
  },
}
</script>

<style></style>
