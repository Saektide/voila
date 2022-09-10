const axios = require('axios').default

exports.ualaService = axios.create({
  baseURL: 'https://services.uala.com.ar/prod/bancar/api/',
  headers: {
    'User-Agent': 'okhttp/4.2.1'
  }
})

exports.ualaAuth = axios.create({
  baseURL: 'https://uala-arg-app-prod.us.auth0.com/',
  headers: {
    'User-Agent': 'okhttp/4.2.1',
    'Auth0-Client': 'eyJuYW1lIjoiQXV0aDAuQW5kcm9pZCIsImVudiI6eyJhbmRyb2lkIjoiMjkifSwidmVyc2lvbiI6IjEuMjMuMCJ9'
  }
})

exports.ualaCognito = axios.create({
  baseURL: 'https://cognito-idp.us-east-1.amazonaws.com/',
  headers: {
    'User-Agent': 'voila/0.0.1',
    'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
  }
})

exports.ualaVirtualCard = axios.create({
  baseURL: 'https://services.api.prod.virtualcard.ar.ua.la/',
  headers: {
    'User-Agent': 'okhttp/4.2.1'
  }
})
