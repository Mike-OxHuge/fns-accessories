<template>
  <v-main id="bg" class="bg">
    <!-- skeleton -->
    <v-row
      v-if="$fetchState.pending"
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
    <!-- content with query -->
    <v-row
      v-else-if="!$fetchState.pending && $route.query.variant"
      class="accent--text ma-auto"
      justify="center"
      style="max-width: 100%"
    >
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="1" class="d-flex">
        <v-icon
          class="mx-auto mt-15 mb-auto"
          color="primary"
          @click="$router.push(`/${$i18n.locale}/catalog`)"
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
          class="my-auto pa-3"
          style="background: rgba(0, 0, 0, 0.5); border-radius: 20px"
        >
          {{ $i18n.locale === 'it' ? bag.description.it : bag.description.en }}
        </p>
        <p class="mt-auto">
          {{ variant[0].stock }}
          {{
            $i18n.locale === 'it'
              ? `borse ${variant[0].colorName.it} disponibile`
              : `${variant[0].colorName.en} bags available`
          }}
        </p>
        <v-btn
          v-if="variant"
          color="primary"
          class="mx-10 black--text"
          :loading="isLoading"
          :disabled="variant[0].stock <= 0"
          @click="buy"
          >{{ $i18n.locale === 'it' ? `Compra ora per €` : `Buy now for €`
          }}{{ variant[0].price }}</v-btn
        >
      </v-col>
    </v-row>
    <!-- content without query -->
    <v-container v-else-if="!$fetchState.pending && !$route.query.variant">
      <v-row justify="center">
        <v-col cols="auto" sm="12" md="6">
          <SingleBag :bag="bag" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import DetailedBag from '~/components/CatalogComponents/DetailedBag.vue'
import SingleBag from '~/components/CatalogComponents/SingleBag.vue'
import { handlePurchase } from '~/composables/stripeHandlers.js'

export default {
  components: { DetailedBag, SingleBag },
  data() {
    return {
      isLoading: false,
      bag: null,
      // variant: null,
    }
  },
  async fetch() {
    const wholeBag = await this.$axios.$get(
      `/api/v1/bags/${this.$route.params.id}`
    )
    this.bag = await wholeBag
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: () => this.pageTitle,
        },
        {
          property: 'og:description',
          hid: 'og:description',
          content: () => this.pageTitle,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: () => this.pageTitle,
        },
      ],
    }
  },
  computed: {
    variant() {
      return this.bag.variants.filter(
        (v) => v._id === this.$route.query.variant
      )
    },
    pageTitle() {
      let title = ''
      if (this.bag) {
        if (this.$route.query.variant) {
          title =
            this.$i18n.locale === 'it'
              ? `${this.bag.name.it} (${this.variant[0].colorName.it}) |`
              : `${this.bag.name.en} (${this.variant[0].colorName.en}) |`
        } else {
          title =
            this.$i18n.locale === 'it'
              ? this.bag.name.it + ' |'
              : this.bag.name.en + ' |'
        }
      }
      return title
    },
  },
  created() {
    //
    // this.getBag()
  },
  mounted() {
    // this.variant = this.wholeBag.variants.filter(
    //   (e) => e._id === this.$route.query.variant
    // )[0]
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
