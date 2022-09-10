
const { ok, serverError } = require('./utils/replies')
const { ualaService } = require('./utils/api')
const err = require('./utils/errors').get

const Logger = require('./utils/logger')
const log = new Logger('transfer-local')

async function getTransferTicket (accessToken) {
  try {
    const res = await ualaService.get('1/transactions/ticket', {
      headers: {
        authorization: accessToken
      }
    })
    log.debug('Got ticket')
    return { data: res.data.ticket }
  } catch (err) {
    log.error('TicketError', err.response.data)
    return { error: err.response.data }
  }
}

async function doTransfer (accessToken, ticket, amount, pin, usernameTo) {
  try {
    const res = await ualaService.post('1/transactions/transfer', {
      amount,
      category: 'Sin categoría',
      pin,
      ticket,
      transferDescription: '',
      usernameTo
    }, {
      headers: {
        authorization: accessToken
      }
    })
    return { data: res.data }
  } catch (err) {
    log.error('UalaTransferError', err.response.data)
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
  const { amount, pin, usernameTo } = body
  try {
    const accessToken = event.headers.authorization.split('Bearer ')[1]
    const { data: ticket, error: ticketError } = await getTransferTicket(accessToken)
    if (ticketError) {
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), ticketError })
      return
    }
    const { data: transfer, error: transferError } = await doTransfer(accessToken, ticket, amount, pin, usernameTo)
    if (transferError) {
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), transferError })
      return
    }

    ok(callback, transfer)
  } catch (exception) {
    if (exception.response) {
      const { response } = exception
      serverError(callback, { ...err('UNHANDLED_UALA_EXCEPTION'), response })
    } else {
      serverError(callback, err('UNHANDLED_SERVER_EXCEPTION'))
    }
  }
}
