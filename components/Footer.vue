<i18n>
{
  "en": {
     "message": "Warning: currenty we ship only to Italy, please contact us for shipping to another country (additional charges may apply)."
  },
  "it": {
     "message": "Attenzione: attualmente spediamo solo in Italia, vi preghiamo di contattarci per la spedizione in un altro paese (potrebbero essere applicati costi aggiuntivi)."
  }
}
</i18n>
<template>
  <v-main id="header">
    <v-container class="text-center">
      <p class="my-2 px-5">{{ $t('message') }}</p>
    </v-container>
  </v-main>
</template>

<script>
export default {}
</script>

<style scoped>
#header {
  background: black;
  color: whitesmoke;
}
</style>
