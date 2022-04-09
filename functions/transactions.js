
const { ok, serverError } = require('./utils/replies')
const { ualaService } = require('./utils/api')
const err = require('./utils/errors').get

async function getTransactions (accessToken) {
  try {
    const res = await ualaService.get('2/transactions', {
      headers: {
        authorization: accessToken
      },
      params: {
        limit: 1000
      }
    })
    return { data: res.data.transactions }
  } catch (err) {
    return { error: err.response.data }
  }
}

async function getBalance (accessToken) {
  try {
    const res = await ualaService.get('1/balance', {
      headers: {
        authorization: accessToken
      }
    })
    return { data: res.data.balance }
  } catch (err) {
    return { error: err.response.data }
  }
}

exports.handler = async function (event, _ctx, callback) {
  try {
    const accessToken = event.headers.authorization.split('Bearer ')[1]
    const { data: transactions, error: transactionsError } = await getTransactions(accessToken)
    if (transactionsError) {
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), transactionsError })
      return
    }
    const { data: balance, error: balanceError } = await getBalance(accessToken)
    if (balanceError) {
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), balanceError })
      return
    }

    ok(callback, { transactions, balance })
  } catch (exception) {
    if (exception.response) {
      const { response } = exception
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), response })
    } else {
      serverError(callback, err('UNHANDLED_SERVER_EXCEPTION'))
    }
  }
}
