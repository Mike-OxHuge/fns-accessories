<template>
  <v-main>
    <Block1 />
    <Block2 />
    <Block3 :catalog="catalog" />
  </v-main>
</template>

<script>
import Block1 from '~/components/Block1.vue'
import Block2 from '~/components/Block2.vue'
import Block3 from '~/components/Block3.vue'

export default {
  components: {
    Block1,
    Block2,
    Block3,
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
    title: 'Home page |',
    meta: [
      // not working SSG
    ],
  },
  mounted() {
    //
  },
  methods: {
    //
  },
}
</script>

<style></style>
