<template>
  <v-main>
    <Block1 />
    <Block2 />
    <Block3 :catalog="catalog" />
    <!-- <v-divider v-if="$vuetify.breakpoint.smAndDown" class="mx-4"></v-divider>
    <Block4 />
    <v-divider v-if="$vuetify.breakpoint.smAndDown" class="mx-4"></v-divider>
    <Block5 /> -->
  </v-main>
</template>

<script>
import Block1 from '~/components/Block1.vue'
import Block2 from '~/components/Block2.vue'
import Block3 from '~/components/Block3.vue'
// import Block4 from '~/components/Block4.vue'
// import Block5 from '~/components/Block5.vue'

export default {
  components: {
    Block1,
    Block2,
    Block3,
    // Block4,
    // Block5,
  },
  data() {
    return {
      catalog: [],
    }
  },
  async fetch() {
    const { data } = await this.$axios.get('/api/v1/bags')
    this.catalog = await data
    // return data
  },
  head: {
    title: 'Home page |',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Nice cool fresh and awesome bags. Get one and be the happiest person in the room.',
      },
      {
        property: 'og:description',
        hid: 'og:description',
        content:
          'Nice cool fresh and awesome bags. Get one and be the happiest person in the room.',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Nice cool fresh and awesome bags. Get one and be the happiest person in the room.',
      },
    ],
  },
  mounted() {
    // this.wakeup()
  },
  methods: {
    async wakeup() {
      await fetch(`${process.env.NUXT_APP_BACKEND_URL}/api/v1/wakeup`)
    },
  },
}
</script>

<style></style>
