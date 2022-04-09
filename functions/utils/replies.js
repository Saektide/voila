const err = require('./errors').get

function handleRequest (netlifyCallbackHandler, jsonResponse, statusCode = 200) {
  if (typeof jsonResponse !== 'object') {
    netlifyCallbackHandler(null, {
      statusCode: 500,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(err('RESPONSE_NOT_AN_OBJECT'))
    })
  }
  netlifyCallbackHandler(null, {
    statusCode,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonResponse)
  })
}

exports.ok = (callbackHandler, jsonObj) => handleRequest(callbackHandler, jsonObj)
exports.badRequest = (callbackHandler, jsonObj) => handleRequest(callbackHandler, jsonObj, 400)
exports.unauthorized = (callbackHandler, jsonObj) => handleRequest(callbackHandler, jsonObj, 401)
exports.forbidden = (callbackHandler, jsonObj) => handleRequest(callbackHandler, jsonObj, 403)
exports.serverError = (callbackHandler, jsonObj) => handleRequest(callbackHandler, jsonObj, 500)
