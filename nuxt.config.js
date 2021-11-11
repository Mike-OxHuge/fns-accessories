import colors from 'vuetify/es5/util/colors'
import dotenv from 'dotenv'
import i18n from './config/i18n'
dotenv.config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s F&S shop',
    title: '',
    head: {
      //
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Nice cool fresh and awesome bags. Get one and be the happiest person in the room.',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon/favicon_io/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon_io/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon_io/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/favicon/favicon_io/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/favicon/favicon_io/android-chrome-512x512.png',
      },
      //       <!-- Open Graph / Facebook -->
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://fns-accessories.web.app/en/' },
      { property: 'og:title', content: 'F&S Store' },
      {
        property: 'og:description',
        content:
          'Nice cool fresh and awesome bags. Get one and be the happiest person in the room.',
      },
      { property: 'og:image', content: '/images/multiple-bags.png' },

      //        {!-- Twitter --},
      { property: 'twitter:card', content: 'summary_large_image' },
      {
        property: 'twitter:url',
        content: 'https://fns-accessories.web.app/en/',
      },
      { property: 'twitter:title', content: 'F&S Store' },
      {
        property: 'twitter:description',
        content:
          'Nice cool fresh and awesome bags. Get one and be the happiest person in the room.',
      },
      { property: 'twitter:image', content: 'multiple-bags.png' },

      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/favicon_io/apple-touch-icon.png',
      },

      // { rel: 'manifest', href: './favicon/favicon_io/site.webmanifest' },
      {
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        rel: 'stylesheet',
      },
    ],
  },
  router: { linkExactActiveClass: 'active-link' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vuex-persisten', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // dot env
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@neneos/nuxt-animate.css',
    'nuxt-i18n',
    // {
    //   /* module options */
    // },
  ],
  i18n: {
    vueI18nLoader: true,
    defaultLocale: 'it',
    strategy: 'prefix',
    locales: [
      { code: 'en', iso: 'en-UK', file: 'en.js', dir: 'ltr', name: 'English' },
      { code: 'it', iso: 'it-IT', file: 'it.js', dir: 'ltr', name: 'Italiano' },
    ],
    vueI18n: i18n,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NUXT_APP_BACKEND_URL || 'http://localhost:3001',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#08b1ba',
          accent: colors.grey.lighten3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost
  }, // other configs
  env: {
    NUXT_APP_BACKEND_URL: process.env.NUXT_APP_BACKEND_URL,
    NUXT_APP_STRIPE_PK: process.env.NUXT_APP_STRIPE_PK,
  },
}
