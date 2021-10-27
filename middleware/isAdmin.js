import axios from 'axios'

export default async function isAdmin(context) {
  const { token } =
    window.sessionStorage.length > 0
      ? JSON.parse(window.sessionStorage.data)
      : {}
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
