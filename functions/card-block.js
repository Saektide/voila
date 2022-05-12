
const { ok, serverError } = require('./utils/replies')
const { ualaService } = require('./utils/api')
const err = require('./utils/errors').get

exports.handler = async function (event, _ctx, callback) {
  if (event.httpMethod !== 'POST') {
    serverError(callback, err('INVALID_HTTP_METHOD'))
  }
  try {
    const accessToken = event.headers.authorization.split('Bearer ')[1]
    const res = await ualaService.put('1/cards/block', JSON.parse(event.body), {
      headers: {
        authorization: accessToken
      }
    })
    ok(callback, res.data)
  } catch (exception) {
    if (exception.response) {
      const { response } = exception
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), details: response.data })
    } else {
      serverError(callback, err('UNHANDLED_SERVER_EXCEPTION'))
    }
  }
}
