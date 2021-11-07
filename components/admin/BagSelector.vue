<template>
  <v-container>
    <h1 v-if="!chosenBag" class="text-center">Select a bag:</h1>
    <v-row v-if="!chosenBag">
      <v-col v-for="bag in bags" :key="bag._id" cols="4">
        <SingleBag
          :bag="bag"
          :is-admin="true"
          @bagSelected="(payload) => bagIsChosen(payload)"
          @bagDeleted="(payload) => deleteTheBag(payload)"
        />
      </v-col>
    </v-row>
    <CreateEditForm v-else :product="chosenBag" :edit="true" />
  </v-container>
</template>

<script>
import SingleBag from '~/components/CatalogComponents/SingleBag.vue'
import CreateEditForm from '~/components/admin/CreateEditForm.vue'

export default {
  components: { SingleBag, CreateEditForm },
  props: {
    bags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chosenBag: null,
    }
  },
  methods: {
    bagIsChosen(payload) {
      this.chosenBag = payload
    },
    async deleteTheBag(payload) {
      try {
        if (!payload.name.en.includes('deleted')) {
          // here the code the delete cloudinary images
          // TODO: handle stripe product deletion
          const imagesIDs = []
          const mainImageId = payload.defaultImage.split('/')
          imagesIDs.push(
            (
              mainImageId[7] +
              '/' +
              mainImageId[8] +
              '/' +
              mainImageId[9]
            ).split('.')[0]
          )
          const { variants } = payload
          for (let i = 0; i < variants.length; i++) {
            for (let j = 0; j < variants[i].images.length; j++) {
              const imageId = variants[i].images[j].split('/')
              imagesIDs.push(
                imageId[7] +
                  '/' +
                  imageId[8] +
                  '/' +
                  imageId[9] +
                  '/' +
                  imageId[10].split('.')[0]
              )
            }
          }
          const foldersToDelete = []
          const subFolder = variants[0].images[0].split('/')
          foldersToDelete.push(
            subFolder[7] + '/' + subFolder[8] + '/' + subFolder[9]
          )
          const mainFolder = variants[0].images[0].split('/')
          foldersToDelete.push(mainFolder[7] + '/' + mainFolder[8])
          imagesIDs.forEach(async (el) => {
            await this.$axios.post(
              '/api/files/delete-image',
              {
                public_id: el,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
          })
          foldersToDelete.forEach(async (el) => {
            await this.$axios.post(
              '/api/files/delete-folder',
              {
                folderName: el,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
          })

          // delete from DB
          await this.$axios.delete(`/api/v1/bags/${payload._id}`, {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          })
        } else {
          // delete from DB
          await this.$axios.delete(`/api/v1/bags/${payload._id}`, {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          })
          alert('This is a test bag, hence cloudinary images were not deleted.')
        }
      } catch (error) {
        alert(error)
      } finally {
        this.$emit('bagDeleted', payload)
      }
    },
  },
}
</script>

<style></style>
