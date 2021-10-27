// import VuexPersist from 'vuex-persist'

// const vuexLocal = new VuexPersist({
//   storage: window.sessionStorage,
// })

// const store = {
//   state: {
//     token: '',
//   },
//   mutations: {
//     setToken(state, token) {
//       state.token = token
//     },
//     eraseToken(state) {
//       state.token = ''
//     },
//   },
//   actions: {
//     //
//   },
//   plugins: [vuexLocal.plugin],
// }

// export default store

const store = {
  state() {
    return {
      token: '',
    }
  },
  // state: {
  //   token: '',
  // },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    eraseToken(state) {
      state.token = ''
    },
  },
  actions: {
    //
  },
}

export default store
