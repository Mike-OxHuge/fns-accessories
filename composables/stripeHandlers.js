import axios from 'axios'

export const { token } = window.sessionStorage.data.includes('token')
  ? JSON.parse(window.sessionStorage.data)
  : {}
// export const { token } = JSON.parse(window.sessionStorage.data)
// console.log(window.sessionStorage.data.includes('token'))

export const createVariantProduct = async (variant, bag) => {
  const { images, price } = variant
  // const { name, description, images, price } = req.body; // sent to server

  try {
    const { data } = await axios.post(
      `${process.env.NUXT_APP_BACKEND_URL}/api/v1/purchase/create-product`,
      {
        images,
        price,
        name: `${bag.name.en} (${variant.colorName.en})`,
        description: bag.description.en,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data // the stripe-id of the product
  } catch (error) {
    alert(error)
  }
}

export const handlePurchase = async (payload, id) => {
  // await console.log(payload, id)
  const { data } = await axios.post(
    `${process.env.NUXT_APP_BACKEND_URL}/api/v1/purchase/create-checkout-session`,
    { variant: payload, bag_id: id }
  )
  window.location = await data
}
