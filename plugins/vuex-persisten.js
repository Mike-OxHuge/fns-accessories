import VuexPersist from 'vuex-persist'

export default ({ store }) => {
  new VuexPersist({
    key: 'data', // The key to store the state on in the storage provider.
    storage: window.sessionStorage, // or window.localStorage or localForage or window.sessionStorage
  }).plugin(store)
}
