<template>
  <v-main>
    <h3>Thank you, {{ address.name }}! Your order on its way!</h3>
    <v-img :src="bag.image"></v-img>
    <h4>{{ bagName }}({{ bag.color }})</h4>
    <h5>Please check {{ address.email }} for a receipt.</h5>
    <h6>
      The item will be delivered to: {{ address.address.postal_code }},
      {{ address.address.city }} ({{ address.address.state }}),
      {{ address.address.line1 }}
    </h6>
  </v-main>
</template>

<script>
export default {
  props: {
    bag: {
      type: Object,
      required: true,
    },
    bagName: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
