const { ok } = require('./utils/replies')

exports.handler = function (event, _ctx, callback) {
  const res = { event }
  ok(callback, res)
}
