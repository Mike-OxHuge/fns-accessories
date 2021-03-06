import axios from 'axios'

export default async function isLoggedIn(context) {
  const { token } = context.store.state
  // console.log('isLoggedInMiddleware', token) // available

  try {
    const validator = await axios.post(
      `${process.env.NUXT_APP_BACKEND_URL}/api/admin/auth`,

      {
        foo: 'bar',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (validator.status === 200) {
      try {
        await context.redirect('/en/auth/editor')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  } catch (error) {
    if (error.response.status === 401) {
      context.store.commit('eraseToken')
    } else {
      alert(
        error.response
          ? error.response.status +
              ' || ' +
              error.response.statusText +
              ' || ' +
              error.response.data.message
          : 'Something went wrong.'
      )
    }
  }

  // axios({
  //   method: 'post', // you can set what request you want to be
  //   url: `${process.env.NUXT_APP_BACKEND_URL}/api/admin/auth`,
  //   data: { foo: 'bar' },
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
}
