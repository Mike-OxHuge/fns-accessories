<template>
  <div id="bg" class="bg">
    <v-container mt-3>
      <v-icon color="primary" @click="$router.go(-1)"
        >arrow_back_ios_new
      </v-icon>
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
  </div>
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
  mounted() {
    //
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
