const { ok, serverError } = require('./utils/replies')
const { ualaService } = require('./utils/api')
const err = require('./utils/errors').get

exports.handler = async function (event, _ctx, callback) {
  try {
    const accessToken = event.headers.authorization.split('Bearer ')[1]
    const res = await ualaService.get('1/accounts', {
      headers: {
        authorization: accessToken
      }
    })
    const user = res.data.accounts[0]
    ok(callback, { user })
  } catch (exception) {
    if (exception.response) {
      const { status, data: details } = exception.response
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), status, details })
    } else {
      serverError(callback, err('UNHANDLED_SERVER_EXCEPTION'))
    }
  }
}
