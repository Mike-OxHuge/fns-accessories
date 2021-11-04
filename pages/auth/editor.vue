<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <NuxtLink to="/">
          <v-btn color="success">
            <v-icon small>arrow_back_ios_new</v-icon>
            Back home
          </v-btn>
        </NuxtLink>
      </v-col>

      <v-col cols="4" align-self="center">
        <h1 class="text-right" @click="stage = null">Admin panel:</h1>
      </v-col>

      <v-col cols="4">
        <v-select
          v-model="stage"
          class="mr-auto"
          :items="items"
          label="Select action"
        ></v-select>
      </v-col>

      <v-col cols="2">
        <v-btn color="grey" @click="handleLogout()">logout</v-btn>
      </v-col>
    </v-row>
    <v-container>
      <div v-if="!currentStage" class="d-flex flex-column">
        <h1 class="text-center my-auto">Choose the action.</h1>
        <v-btn
          class="mx-auto"
          color="primary"
          :disabled="amountOfFiles.length < 4"
          :loading="isLoading"
          @click="createDummyBag()"
          >Or create a test bag</v-btn
        >
        <v-file-input
          accept="image/*"
          chips
          multiple
          label="but select some images first! (5 is enough)"
          @change="(e) => setFiles(e)"
        ></v-file-input>
      </div>
      <CreateEditForm v-if="currentStage === 'create'" />
      <BagSelector
        v-if="currentStage === 'edit'"
        :bags="bags"
        @bagDeleted="(payload) => (bags = bags.filter((e) => e !== payload))"
      />
    </v-container>
  </v-container>
</template>

<script>
import {
  uploadDefaultImage,
  uploadVariantImages,
  saveToDB,
} from '../../composables/uploadHandlers.js'
import CreateEditForm from '~/components/admin/CreateEditForm.vue'
import BagSelector from '~/components/admin/BagSelector.vue'

export default {
  components: { CreateEditForm, BagSelector },

  layout: 'admin',
  middleware: ['isAdmin'],

  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/v1/bags')
    return { bags: data }
  },
  data() {
    return {
      stage: '',
      items: ['Add new bag', 'Edit/Delete bag'],
      isLoading: false,
      // dummy data to create a bag
      amountOfFiles: [],
      bag: {
        name: {
          en: 'to be deleted',
          it: 'to be deleted',
        },
        description: {
          en: 'test bag for testing stuff',
          it: 'test bag for testing stuff',
        },
        variants: [
          {
            color: '#ffc20d',
            colorName: { en: 'yellow', it: 'giallo' },
            price: '69',
            stock: 420,
            images: [],
            stripeProductId: 'price_1Jrk3EKuBnFIZzDsDfflC3bH',
          },
          {
            color: '#00e676',
            colorName: { en: 'green', it: 'verde' },
            price: '420',
            stock: 69,
            images: [],
            stripeProductId: 'price_1Jrk3EKuBnFIZzDsDfflC3bH',
          },
        ],
        price: {
          amount: null,
          currency: 'EUR',
        },
        defaultImage: null,
      },
    }
  },
  computed: {
    currentStage() {
      return this.stage === 'Add new bag'
        ? 'create'
        : this.stage === 'Edit/Delete bag'
        ? 'edit'
        : ''
    },
    // lengthChecker() {
    //   return this.amountOfFiles ?
    // }
  },
  mounted() {
    // console.log(this.bags)
  },
  methods: {
    handleLogout() {
      this.$store.commit('eraseToken')
      this.$router.replace('/en')
    },
    setFiles(e) {
      this.amountOfFiles = e
      this.bag.defaultImage = e[0]
      this.bag.variants[0].images.push(e[1], e[2])
      this.bag.variants[1].images.push(e[3], e[4])
    },
    async createDummyBag() {
      this.isLoading = true
      try {
        if (!this.product) {
          this.cloudinaryFolderName = await uploadDefaultImage(this.bag)

          if (this.bag.variants.length > 0) {
            await uploadVariantImages(this.bag, this.cloudinaryFolderName)
          }
        }

        const response = await saveToDB(this.bag, this.product)
        this.bags.push(response)
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
        this.amountOfFiles = []
        // location.reload()
      }
    },
  },
}
</script>

<style></style>
