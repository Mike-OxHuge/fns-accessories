<template>
  <v-container>
    <h1 v-if="catalog.length === 0">Loading...</h1>
    <v-row v-else justify="center">
      <v-col v-for="bag in catalog" :key="bag._id" cols="4">
        <SingleBag :bag="bag" />
      </v-col>
    </v-row>
  </v-container>
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
  beforeMount() {
    this.fetching()
  },
  methods: {
    async fetching() {
      await fetch(`${process.env.NUXT_APP_BACKEND_URL}/api/v1/bags`)
        .then((response) => response.json())
        .then((json) => (this.catalog = json))
    },
  },
}
</script>

<style></style>
