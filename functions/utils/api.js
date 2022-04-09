require('dotenv').config()
const axios = require('axios').default

exports.ualaService = axios.create({
  baseURL: 'https://services.uala.com.ar/prod/bancar/api/',
  headers: {
    'User-Agent': 'okhttp/2.7.5'
  }
})

exports.ualaAuth = axios.create({
  baseURL: 'https://uala-arg-app-prod.us.auth0.com/',
  headers: {
    'User-Agent': 'okhttp/2.7.5',
    'Auth0-Client': 'eyJuYW1lIjoiQXV0aDAuQW5kcm9pZCIsImVudiI6eyJhbmRyb2lkIjoiMjkifSwidmVyc2lvbiI6IjEuMjMuMCJ9'
  }
})
