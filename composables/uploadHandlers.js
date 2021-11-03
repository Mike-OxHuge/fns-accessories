import axios from 'axios'
// import { token } from './stripeHandlers.js'
const { token } = window.sessionStorage.data?.includes('token')
  ? JSON.parse(window.sessionStorage.data)
  : {}

export const uploadDefaultImage = async (bag) => {
  try {
    // eslint-disable-next-line prefer-const
    let image = new FormData()
    image.append('name', bag.name.en.replaceAll(' ', '-'))
    image.append('bag-cover', bag.defaultImage)
    const { data } = await axios.post(
      `${process.env.NUXT_APP_BACKEND_URL}/api/files/upload-bag-cover`,
      image,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    bag.defaultImage = await data
    let cloudinaryFolderName = await data.split('/')
    cloudinaryFolderName = await cloudinaryFolderName[
      cloudinaryFolderName.length - 2
    ]
    return cloudinaryFolderName
  } catch (error) {
    alert(error)
  }
}

export const uploadVariantImages = async (bag, cloudinaryFolderName) => {
  const { variants } = bag
  cloudinaryFolderName.replaceAll(' ', '-')
  try {
    for (let i = 0; i < variants.length; i++) {
      // eslint-disable-next-line prefer-const
      let images = new FormData()
      images.append('name', cloudinaryFolderName)
      images.append('color', variants[i].colorName.en.replaceAll(' ', '-'))
      images.append('variant-image', variants[i].images[0])
      for (let j = 0; j < variants[i].images.length; j++) {
        images.set('variant-image', variants[i].images[j])
        const { data } = await axios.post(
          `${process.env.NUXT_APP_BACKEND_URL}/api/files/upload-variant-image`,
          images,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        variants[i].images[j] = data
      }
    }
  } catch (error) {
    alert(error)
  }
}

export const saveToDB = async (bag) => {
  try {
    const { data } = await axios.post(
      `${process.env.NUXT_APP_BACKEND_URL}/api/v1/bags`,
      bag,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    alert(
      data.name.en +
        ' has been created successfully, navigate to catalog to see your newly created bag'
    )
    return data
  } catch (error) {
    alert(error)
  }
}
