import axios from 'axios'

const { token } = window.sessionStorage.data?.includes('token')
  ? JSON.parse(window.sessionStorage.data)
  : {}

// const getToken = () => {
//   const getter = () => {
//     if (window.$nuxt.$store.state.token) {
//       clearInterval(timer)
//       console.log(window.$nuxt.$store.state.token)
//       return window.$nuxt.$store.state.token
//     } else {
//       return ''
//     }
//   }
//   const timer = setInterval(getter, 5000)
// }
// const token = getToken() ? getToken() : ''
// console.log(token)

export const uploadDefaultImage = async (bag, isNew) => {
  try {
    // eslint-disable-next-line prefer-const
    let image = new FormData()
    if (!isNew) {
      image.append('isCreating', false)
      const { data } = await axios.get(
        `${process.env.NUXT_APP_BACKEND_URL}/api/v1/bags/${bag._id}`
      )
      const folder = await data.defaultImage.split('/')[8]
      // console.log(folder)
      image.append('folder', folder) // existing folder name
    } else {
      image.append('isCreating', true)
    }
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
      for (let j = 0; j < variants[i].images.length; j++) {
        // if (!variants[i].images[j].includes('https')) {
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
        // }
      }
    }
  } catch (error) {
    alert(error)
  }
}

export const saveToDB = async (bag, status) => {
  // status is either a null or a bag object (coming from prop with default value of null)
  try {
    if (!status) {
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
    } else {
      const { data } = await axios.put(
        `${process.env.NUXT_APP_BACKEND_URL}/api/v1/bags/${bag._id}`,
        bag,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert(
        data.name.en +
          ' has been edited successfully, navigate to catalog to see your newly created bag'
      )
      return data
    }
  } catch (error) {
    alert(error)
  }
}
