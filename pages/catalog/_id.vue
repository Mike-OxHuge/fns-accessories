<template>
  <v-main id="bg" class="bg">
    <v-row
      v-if="isLoading"
      justify="center"
      style="max-width: 100%"
      class="ma-auto"
    >
      <v-col cols="12" sm="12" md="6">
        <v-skeleton-loader type="card-avatar"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-skeleton-loader type="heading, paragraph@2"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row
      v-else
      class="accent--text ma-auto"
      justify="center"
      style="max-width: 100%"
    >
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="1" class="d-flex">
        <v-icon
          class="mx-auto mt-15 mb-auto"
          color="primary"
          @click="$router.go(-1)"
        >
          arrow_back_ios_new
        </v-icon>
      </v-col>

      <v-col sm="12" md="6" class="px-0">
        <DetailedBag v-if="variant !== null" :bag="variant[0]" />
      </v-col>
      <v-col sm="12" md="5" class="text-center d-flex flex-column">
        <h1>
          {{ $i18n.locale === 'it' ? bag.name.it : bag.name.en }}
        </h1>
        <p
          class="my-auto pa-2"
          style="background: rgba(0, 0, 0, 0.5); border-radius: 20px"
        >
          {{ $i18n.locale === 'it' ? bag.description.it : bag.description.en }}
        </p>
        <p class="mt-auto">
          {{ variant[0].stock }}
          {{
            $i18n.locale === 'it'
              ? `${variant[0].colorName.it} borse disponibile`
              : `${variant[0].colorName.en} bags available`
          }}
        </p>
        <v-btn
          v-if="variant"
          color="primary"
          class="mx-10"
          :loading="isLoading"
          :disabled="variant[0].stock <= 0"
          @click="buy"
          >{{
            $i18n.locale === 'it' ? `Compra ora per EUR` : `Buy now for EUR`
          }}
          {{ variant[0].price }}</v-btn
        >
      </v-col>
    </v-row>
    <v-container class="accent--text text-center" d-flex justify-center>
      <!-- <v-container v-else pt-0>
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
      </v-container> -->
    </v-container>
  </v-main>
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
