<template>
  <v-container class="accent--text">
    <v-card
      style="background: rgba(0, 0, 0, 0.5)"
      outlined
      shaped
      class="accent--text"
    >
      <v-img
        ripple
        :src="!selectedImage ? bag.variants[0].images[0] : selectedImage"
        class="clickableImage"
        @click="
          isAdmin
            ? adminSelection(bag)
            : $router.push(
                `/${$i18n.locale}/catalog/${bag._id}?variant=${selectedBag._id}`
              )
        "
      ></v-img>
      <v-card-title>
        <v-row justify="space-between" class="px-2">
          <p>{{ $i18n.locale === 'it' ? bag.name.it : bag.name.en }}</p>
          <p>EUR • {{ selectedBag.price }}</p>
        </v-row>
      </v-card-title>

      <v-card-text class="accent--text">{{
        $i18n.locale === 'it' ? bag.description.it : bag.description.en
      }}</v-card-text>
      <v-row no-gutters justify="center">
        <v-col v-for="variant in bag.variants" :key="variant._id">
          <v-container mx-auto pa-0 class="d-flex justify-center">
            <v-chip
              :color="variant.color"
              :disabled="variant.stock === 0"
              @click="
                ;(selectedImage = variant.images[0]), (selectedBag = variant)
              "
            >
              {{
                $i18n.locale === 'it'
                  ? variant.colorName.it
                  : variant.colorName.en
              }}
            </v-chip>
          </v-container>
        </v-col>

        <v-col cols="8">
          <v-container mx-auto pa-0 class="text-center accent--text">
            <span class="text-center">
              {{ selectedBag.stock }}
              {{
                $i18n.locale === 'it'
                  ? `${selectedBag.colorName.it} disponibile`
                  : `${selectedBag.colorName.en} available`
              }}
            </span>
          </v-container>
        </v-col>

        <v-col cols="12">
          <v-card-actions>
            <v-container
              v-if="!isAdmin"
              d-flex
              justify-space-between
              mx-auto
              pa-0
              class="text-center"
            >
              <v-btn
                color="primary"
                :disabled="selectedBag.stock === 0"
                :loading="isLoading"
                @click="buy"
              >
                Buy now
              </v-btn>
              <v-btn
                color="primary"
                @click="
                  $router.push(
                    `/${$i18n.locale}/catalog/${bag._id}?variant=${selectedBag._id}`
                  )
                "
                >Details</v-btn
              >
            </v-container>

            <v-container
              v-if="isAdmin"
              d-flex
              justify-space-between
              mx-auto
              pa-0
            >
              <v-btn
                class="mx-auto"
                color="success"
                @click="adminSelection(bag)"
              >
                edit
              </v-btn>
              <v-btn
                class="mx-auto"
                color="error"
                :loading="isLoading"
                @click="adminDelete(bag)"
              >
                Delete
              </v-btn>
            </v-container>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { handlePurchase } from '~/composables/stripeHandlers.js'
export default {
  components: {},
  props: {
    bag: { type: Object, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  data() {
    return {
      isLoading: false,
      selectedImage: null,
      selectedBag: this.bag.variants[0], // default value, the bag object
      stripe: null,
    }
  },
  mounted() {
    //
  },
  updated() {
    //
  },
  methods: {
    async buy() {
      this.isLoading = true
      await handlePurchase(this.selectedBag, this.bag._id)
    },
    adminSelection(payload) {
      this.$emit('bagSelected', payload)
    },
    adminDelete(payload) {
      this.isLoading = true
      this.$emit('bagDeleted', payload)
    },
  },
}
</script>

<style>
.clickableImage:hover {
  cursor: pointer;
}
</style>
