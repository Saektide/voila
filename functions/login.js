/* eslint-disable camelcase */
const jwtDecode = require('jwt-decode')
const { ok, serverError, unauthorized } = require('./utils/replies')
const { ualaAuth } = require('./utils/api')
const err = require('./utils/errors').get
const { auth0_client_id } = require('./utils/defaultTokens').default

const Logger = require('./utils/logger')
const log = new Logger('login')

/**
 * Descifra los tokens del proxy cognito de Ualá el cual brinda acceso
 * a las APIs del mismo servicio.
 * @param {String} accessToken Auth0 access token
 */
function getCognitoTokens (accessToken) {
  const decodedToken = jwtDecode(accessToken)
  const access_token = decodedToken['http://cognito-proxy.ua.la/cognito_token']
  const refresh_token = decodedToken['http://cognito-proxy.ua.la/cognito_refresh_token']
  return { access_token, refresh_token }
}

/**
 * Consigue el código OOB (Out-Of-Band), solicita un código SMS.
 * El token MFA se lo puede obtener después de que el usuario intentara
 * autenticarse con su contraseña y usuario.
 * @param {String} mfa_token
 */
async function getChallenge (mfa_token) {
  try {
    const res = await ualaAuth.post('mfa/challenge', {
      challenge_type: 'oob',
      client_id: auth0_client_id,
      mfa_token
    })
    return {
      oob_code: res.data.oob_code
    }
  } catch (err) {
    return {
      error: err.response.data.error
    }
  }
}

/**
 * Intenta abrir una sesión usando el challenge de MFA
 * si es que dicha verificación fue pedida explicitamente
 * por Ualá al momento de iniciar sesión por contraseña.
 * @param {String} mfa_token
 * @param {String} oob_code
 * @param {String} binding_code
 */
async function loginWithChallenge (mfa_token, oob_code, binding_code) {
  try {
    const res = await ualaAuth.post('oauth/token', {
      audience: 'https://uala-arg-app-prod',
      grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
      scope: 'openid profile offline_access',
      client_id: auth0_client_id,
      mfa_token,
      oob_code,
      binding_code
    })
    const { access_token, refresh_token } = getCognitoTokens(res.data.access_token)
    return { access_token, refresh_token }
  } catch (err) {
    return { error: err.response.data }
  }
}

/**
 * Intenta abrir una sesión con nombre de usuario y contraseña,
 * automaticamente va a descifrar los tokens de cognito.
 * @param {String} username
 * @param {String} password
 */
async function loginWithPassword (username, password) {
  try {
    const res = await ualaAuth.post('oauth/token', {
      audience: 'https://uala-arg-app-prod',
      grant_type: 'password',
      realm: 'cognito-proxy-custom-db',
      scope: 'openid profile offline_access',
      client_id: auth0_client_id,
      password,
      username
    })
    const auth0Token = res.data.access_token
    const { access_token, refresh_token } = getCognitoTokens(auth0Token)
    return { access_token, refresh_token, auth0_token: auth0Token }
  } catch (err) {
    log.error(err.response.data)
    return { error: err.response.data }
  }
}

exports.handler = async function (event, _ctx, callback) {
  let body
  try {
    body = JSON.parse(event.body)
  } catch (exception) {
    serverError(callback, err('INVALID_REQ_BODY'))
  }

  /**
   * Antes de iniciar una sesión con contraseña, verificar
   * si el login portenece a un intento de MFA.
   */
  if (body.oob_code) {
    const { mfa_token, oob_code, binding_code } = body
    const {
      access_token,
      refresh_token,
      error: challengeLoginError
    } = await loginWithChallenge(mfa_token, oob_code, binding_code)
    if (challengeLoginError) {
      serverError(callback, { ...err('UNHANDLED_SERVER_EXCEPTION'), details: challengeLoginError })
    }
    ok(callback, { access_token, refresh_token })
    return
  }
  const { password, username } = body
  const {
    access_token,
    refresh_token,
    auth0_token,
    error: passwordLoginError
  } = await loginWithPassword(username, password)
  if (passwordLoginError) {
    const errorFallbacks = {
      // eslint-disable-next-line require-await
      invalid_grant: async () => {
        unauthorized(callback, err('UALA_INVALID_CREDENTIALS'))
      },
      mfa_required: async () => {
        const { oob_code, error: challengeError } = await getChallenge(passwordLoginError.mfa_token)
        if (challengeError) {
          serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), challengeError })
        }
        unauthorized(callback, {
          ...err('UALA_AUTH_MFA_REQUIRED'),
          details: {
            oob_code,
            mfa_token: passwordLoginError.mfa_token
          }
        })
      }
    }
    if (!errorFallbacks[passwordLoginError.error]) {
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), passwordLoginError })
    }
    await errorFallbacks[passwordLoginError.error]()
  }
  ok(callback, { access_token, refresh_token, auth0_token })
}
