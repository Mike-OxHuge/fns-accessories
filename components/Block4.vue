<template>
  <v-main>
    <v-row no-gutters>
      <v-col style="background-color: #08b1ba">
        <v-container>left</v-container>
      </v-col>
      <v-col>
        <v-container>
          <ShopLogo
            src="/vinted-logo.png"
            alt="vinted-logo"
            href="https://vinted.com"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import ShopLogo from './ShopLogo.vue'
export default {
  components: {
    ShopLogo,
  },
}
</script>

<style scoped></style>
