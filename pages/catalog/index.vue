<template>
  <div id="bg" class="bg">
    <v-container mt-3>
      <v-icon color="black" @click="$router.go(-1)">arrow_back_ios_new</v-icon>
      <h1 v-if="catalog.length === 0">Loading...</h1>
      <v-row v-else justify="space-around">
        <v-col v-for="bag in catalog" :key="bag._id" sm="6" md="4" lg="3">
          <SingleBag :bag="bag" />
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
    this.resetHeight()
  },
  methods: {
    async fetching() {
      await fetch(`${process.env.NUXT_APP_BACKEND_URL}/api/v1/bags`)
        .then((response) => response.json())
        .then((json) => (this.catalog = json))
    },
    resetHeight() {
      const body = document.getElementById('bg')
      body.style.height = window.innerHeight + 'px'
    },
  },
}
</script>

<style>
.bg {
  background-image: linear-gradient(
      to bottom,
      rgba(245, 246, 252, 0.52),
      rgba(117, 19, 93, 0.73)
    ),
    url('https://picsum.photos/1800/600?random=3');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
