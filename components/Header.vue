<i18n>
{
  "en": {
     "message": "Warning: currenty we ship only to Italy, France and Spain, please contact us for shipping to another country (additional charges may apply)."
  },
  "it": {
     "message": "Attenzione: attualmente spediamo solo in Italia, Francia e Spagna, vi preghiamo di contattarci per la spedizione in un altro paese (potrebbero essere applicati costi aggiuntivi)."
  }
}
</i18n>
<template>
  <div id="header">
    <v-container py-0 fluid>
      <v-row style="max-width: 100%" no-gutters justify="center">
        <v-col cols="4" offset="8" align-self="center">
          <LocaleSwitcher />
        </v-col>
        <v-col cols="12" align-self="center">
          <p class="mb-2 text-center">{{ $t('message') }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LocaleSwitcher from '~/components/LanguageInput.vue'

export default {
  components: {
    LocaleSwitcher,
  },
}
</script>

<style scoped>
#header {
  background: black;
  color: whitesmoke;
}
</style>
