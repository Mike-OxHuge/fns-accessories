<template>
  <v-main>
    <h1>SUCCESS!!!</h1>
    <NuxtLink :to="`/${$i18n.locale}/`">HOME</NuxtLink>
  </v-main>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(
      `/api/v1/purchase/order-status?session_id=${route.query.session_id}`
    )
    return { data }
  },
  mounted() {
    console.log(this.$route.query.session_id)
  },
}
</script>

<style></style>
