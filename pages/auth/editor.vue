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
        <h1 class="text-right" @click="pageReload()">Admin panel:</h1>
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
          :loading="isLoading"
          @click="createDummyBag()"
          >Or create a test bag</v-btn
        >
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
import { saveToDB } from '../../composables/uploadHandlers.js'
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
            color: '#23ff00',
            colorName: { en: 'green', it: 'verde' },
            price: '69',
            stock: 420,
            images: [
              'https://res.cloudinary.com/bollockses/image/upload/v1636225842/bags/bag-to-be-deleted-i6cvl2my1kvo6lzwn/variants/green-i6cvl2my1kvo6mbn0.jpg',
              'https://res.cloudinary.com/bollockses/image/upload/v1636225840/bags/bag-to-be-deleted-i6cvl2my1kvo6lzwn/variants/green-i6cvl2my1kvo6m9tp.png',
              'https://res.cloudinary.com/bollockses/image/upload/v1636225838/bags/bag-to-be-deleted-i6cvl2my1kvo6lzwn/variants/green-i6cvl2my1kvo6m8a5.png',
            ],
            stripeProductId: 'price_1JsuHqKuBnFIZzDsPENqBqAd',
          },
          {
            color: '#f40303',
            colorName: { en: 'red', it: 'rojo' },
            price: '420',
            stock: 69,
            images: [
              'https://res.cloudinary.com/bollockses/image/upload/v1636225830/bags/bag-to-be-deleted-i6cvl2my1kvo6lzwn/variants/red-i6cvl2my1kvo6m237.png',
              'https://res.cloudinary.com/bollockses/image/upload/v1636225833/bags/bag-to-be-deleted-i6cvl2my1kvo6lzwn/variants/red-i6cvl2my1kvo6m4d9.png',
              'https://res.cloudinary.com/bollockses/image/upload/v1636225836/bags/bag-to-be-deleted-i6cvl2my1kvo6lzwn/variants/red-i6cvl2my1kvo6m5wz.png',
            ],
            stripeProductId: 'price_1JsuHoKuBnFIZzDsla5xM8Yu',
          },
        ],
        price: {
          amount: null,
          currency: 'EUR',
        },
        defaultImage:
          'https://res.cloudinary.com/bollockses/image/upload/v1636225828/bags/bag-to-be-deleted-i6cvl2my1kvo6lzwn/to-be-deleted-i6cvl2my1kvo6lzwm.jpg',
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
    async createDummyBag() {
      this.isLoading = true
      try {
        const response = await saveToDB(this.bag, this.product)
        this.bags.push(response)
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    },
    pageReload() {
      this.stage = ''
      window.location.reload()
    },
  },
}
</script>

<style></style>
