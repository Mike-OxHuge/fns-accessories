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
          <p>€{{ selectedBag.price }}</p>
        </v-row>
        <v-btn
          v-if="isAdmin"
          color="primary"
          :outlined="!isFeatured"
          class="ma-auto"
          block
          @click="setFeatured(bag)"
          >{{ isFeatured ? 'remove ' : 'set ' }} featured
        </v-btn>
      </v-card-title>

      <v-row dense justify="center">
        <v-col v-for="variant in bag.variants" :key="variant._id" cols="auto">
          <v-container mx-auto pa-0 class="d-flex justify-center">
            <v-chip
              :color="variant.color"
              :disabled="variant.stock <= 0"
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

        <v-col cols="12">
          <v-container mx-auto pa-0 class="text-center accent--text">
            <span class="text-center">
              {{ selectedBag.stock }}
              {{
                $i18n.locale === 'it'
                  ? `${selectedBag.colorName.it} disponibile`
                  : `${selectedBag.colorName.en} in stock`
              }}
            </span>
          </v-container>
        </v-col>

        <v-col cols="12">
          <v-card-actions class="px-0 pb-0">
            <v-container
              v-if="!isAdmin"
              d-flex
              justify-space-between
              mx-auto
              pa-0
              class="text-center"
            >
              <v-btn
                medium
                color="primary"
                :disabled="selectedBag.stock <= 0"
                :loading="isLoading"
                class="black--text"
                @click="buy"
              >
                {{ $i18n.locale === 'it' ? `Compra ora` : `Buy now` }}
              </v-btn>
              <v-btn
                medium
                color="primary"
                class="black--text"
                @click="
                  $router.push(
                    `/${$i18n.locale}/catalog/${bag._id}?variant=${selectedBag._id}`
                  )
                "
              >
                {{ $i18n.locale === 'it' ? 'Vedi altro' : 'see more' }}
              </v-btn>
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
      selectedBag: this.bag.variants.find((e) => e.stock > 0),
      stripe: null,
      isFeatured: this.bag.featured,
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
    setFeatured(payload) {
      this.isFeatured = !this.isFeatured
      this.$emit('setFeatured', { bag: payload, status: this.isFeatured })
    },
  },
}
</script>

<style>
.clickableImage:hover {
  cursor: pointer;
}
</style>
