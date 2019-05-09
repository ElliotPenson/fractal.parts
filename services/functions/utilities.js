const HttpStatus = Object.freeze({
  CONFLICT: 409,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  OK: 200
});

function buildErrorResponse(message, statusCode) {
  return buildResponse({ message }, statusCode);
}

function buildResponse(body, statusCode = HttpStatus.OK) {
  return { statusCode, body: JSON.stringify(body) };
}

module.exports = { HttpStatus, buildErrorResponse, buildResponse };
