import axios from 'axios'

export default async function isAdmin(context) {
  const { token } = context.store.state
  // console.log('isAdminMiddleware', token) // available
  try {
    await axios.post(
      `${process.env.NUXT_APP_BACKEND_URL}/api/admin/validator`,

      {
        foo: 'bar',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    context.redirect('/en')
    // console.log(error)
  }
}
