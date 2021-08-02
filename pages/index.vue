<template>
  <v-main>
    <Block1 />
    <Block2 />
    <Block3 />
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
    return {}
  },
  mounted() {
    this.wakeup()
  },
  methods: {
    async wakeup() {
      await fetch(`${process.env.NUXT_APP_BACKEND_URL}/api/v1/wakeup`)
    },
  },
}
</script>

<style></style>
