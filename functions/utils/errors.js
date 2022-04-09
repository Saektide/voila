const errors = {
  codes: {
    RESPONSE_NOT_AN_OBJECT: 1 << 0,
    UNHANDLED_SERVER_EXCEPTION: 1 << 1,
    UNHANDLED_UALA_EXCEPTION: 1 << 2,
    INVALID_REQ_BODY: 1 << 3,
    UALA_INVALID_CREDENTIALS: 1 << 4,
    UALA_AUTH_MFA_REQUIRED: 1 << 5
  },
  messages: {
    RESPONSE_NOT_AN_OBJECT: 'La respuesta en la función de Netlify debe ser un objeto JSON.',
    UNHANDLED_SERVER_EXCEPTION: 'Ha ocurrido una excepción no controlada en las funciones de Netlify.',
    UNHANDLED_UALA_EXCEPTION: 'Ha ocurrido una excepción no controlada en la API del servicio de Ualá.',
    INVALID_REQ_BODY: 'El body para esta solicitud es invalido.',
    UALA_INVALID_CREDENTIALS: 'Las credenciales en el servicio de Ualá no son correctas. Revisa tu usuario y contraseña.',
    UALA_AUTH_MFA_REQUIRED: 'Ualá ha solicitado que valides tu sesión a través de un código enviado por SMS.'
  }
}

exports.get = function (errorLabel) {
  const code = errors.codes[errorLabel] || -1
  const message = errors.messages[errorLabel] || 'Excepción no controlada'
  return { code, message }
}
