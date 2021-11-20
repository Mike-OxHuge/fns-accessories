<template>
  <v-main id="bg" class="bg">
    <v-row style="max-width: 100%" class="ma-auto">
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="1" class="d-flex">
        <v-icon
          class="mx-auto mt-15 mb-auto"
          color="primary"
          @click="$router.push(`/${$i18n.locale}/`)"
          >arrow_back_ios_new
        </v-icon>
      </v-col>
      <v-col sm="12" md="11">
        <v-container mt-3>
          <v-row justify="space-around">
            <v-container v-if="catalog.length === 0">
              <v-row justify="space-around" style="overflow: hidden">
                <v-col v-for="n in 6" :key="n.i" sm="6" md="4" lg="3" cols="12">
                  <v-skeleton-loader type="card"></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-container>

            <v-col
              v-for="bag in catalog"
              v-else
              :key="bag._id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-container>
                <SingleBag :bag="bag" />
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import SingleBag from '~/components/CatalogComponents/SingleBag.vue'
export default {
  components: {
    SingleBag,
  },
  data() {
    return {
      catalog: [],
    }
  },
  async fetch() {
    const { data } = await this.$axios.get('/api/v1/bags')
    this.catalog = await data
  },
  head: {
    title: 'Catalog |',
    meta: [
      // not working SSG
    ],
  },
  beforeMount() {
    // this.fetching()
  },
  methods: {
    // async fetching() {
    //   await fetch(`${process.env.NUXT_APP_BACKEND_URL}/api/v1/bags`)
    //     .then((response) => response.json())
    //     .then((json) => (this.catalog = json))
    // },
  },
}
</script>

<style></style>
