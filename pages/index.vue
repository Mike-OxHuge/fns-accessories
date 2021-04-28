<template>
  <v-main>
    <Block1 />
    <Block2 />
    <Block3 />
    <!-- <Block4 /> -->
    <!-- <Block5 /> -->
    <Social />
  </v-main>
</template>

<script>
import Social from '~/components/Social.vue'
import Block1 from '~/components/Block1.vue'
import Block2 from '~/components/Block2.vue'
import Block3 from '~/components/Block3.vue'
// import Block4 from '~/components/Block4.vue'
// import Block5 from '~/components/Block5.vue'

export default {
  components: {
    Social,
    Block1,
    Block2,
    Block3,
    // Block4,
    // Block5,
  },
  data() {
    return {}
  },
}
</script>

<style></style>
