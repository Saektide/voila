/* eslint-disable camelcase */
const { ok, serverError } = require('./utils/replies')
const { ualaCognito } = require('./utils/api')
const err = require('./utils/errors').get

const Logger = require('./utils/logger')
const log = new Logger('refresh')

exports.handler = async function (event, _ctx, callback) {
  let body
  try {
    body = JSON.parse(event.body)
  } catch (exception) {
    serverError(callback, err('INVALID_REQ_BODY'))
  }

  log.debug('Refreshing Cognito token...')

  try {
    const res = await ualaCognito.post('/', {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      AuthParameters: {
        REFRESH_TOKEN: body.refresh_token
      },
      ClientId: '20508bkvholj81ful9pnf4hu4v'
    }, {
      headers: {
        'Content-Type': 'application/x-amz-json-1.1'
      }
    })
    ok(callback, { access_token: res.data.AuthenticationResult.IdToken })
  } catch (err) {
    return { error: err.response.data }
  }
}
