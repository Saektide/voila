export default {
  target: 'static',
  head: {
    title: 'Voila',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  ssr: false,
  loading: false,
  css: [
    '~/assets/css/inter.css',
    '~/assets/css/main.css'
  ],
  plugins: [
    '~/plugins/storePersist.client.js',
    '~/plugins/appSettings.client.js',
    '~/plugins/appModals.client.js'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxt-hero-icons/solid/nuxt',
    '@nuxt-hero-icons/outline/nuxt'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: process.env.NODE_ENV !== 'production' ? '/.netlify/functions/' : '/netlify/functions/'
  },
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'access_token' },
          user: { url: 'whoami', method: 'get', propertyName: 'user' },
          logout: false
        },
        token: {
          global: true,
          maxAge: 86400
        }
      }
    }
  },
  build: {
  },
  tailwindcss: {
    viewer: false
  }
}
