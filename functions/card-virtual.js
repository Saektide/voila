
const { ok, serverError } = require('./utils/replies')
const { ualaVirtualCard } = require('./utils/api')
const err = require('./utils/errors').get

exports.handler = async function (event, _ctx, callback) {
  try {
    const accessToken = event.headers.authorization.split('Bearer ')[1]
    const pin = event.headers.pin
    const res = await ualaVirtualCard.get('1/virtual_cards', {
      headers: {
        authorization: accessToken,
        pin
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
