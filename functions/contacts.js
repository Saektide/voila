
const { ok, serverError } = require('./utils/replies')
const { ualaService } = require('./utils/api')
const err = require('./utils/errors').get

exports.handler = async function (event, _ctx, callback) {
  try {
    const accessToken = event.headers.authorization.split('Bearer ')[1]
    const res = await ualaService.get('2/contacts', {
      headers: {
        authorization: accessToken
      }
    })
    ok(callback, res.data)
  } catch (exception) {
    if (exception.response) {
      const { response } = exception
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), response })
    } else {
      serverError(callback, err('UNHANDLED_SERVER_EXCEPTION'))
    }
  }
}
