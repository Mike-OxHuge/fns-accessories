import axios from 'axios'

export const { token } = window.sessionStorage.token
  ? JSON.parse(window.sessionStorage.data)
  : {}

export const createProduct = async (product) => {
  const { description, defaultImage, name, price } = product
  try {
    const { data } = await axios.post(
      `${process.env.NUXT_APP_BACKEND_URL}/api/v1/purchase/create-product`,
      {
        description: description.en,
        images: [defaultImage],
        name: name.en,
        price: price.amount,
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
  // console.log(data)
  window.location = await data
}

// my data shape:
/*
const { name, description, images, price } = req.body;
      variant: {
        color: '',
        colorName: { en: '', it: '' },
        price: null,
        stock: 0,
        image: null,
        images: [],
        stripeProductId: '',
      },
*/

// stripe data shape:
/*
{
 "description": "An amazing test bag (pink)",
  "images": [
    "https://files.stripe.com/links/MDB8YWNjdF8xSjQwZjBLdUJuRklaekRzfGZsX3Rlc3RfTFJVdjZkSmJyTDV1UnppRk5KM0Y5ZDBQ00n0BT8KkD"
  ],
  "name": "Gold Special",
}
*/
