const HttpStatus = Object.freeze({
  CONFLICT: 409,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  OK: 200
});

function buildResponse(body, statusCode = HttpStatus.OK) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
}

function buildConflictResponse(key) {
  return buildResponse(
    { message: `A fractal with key '${key}' already exists.` },
    HttpStatus.CONFLICT
  );
}

module.exports = { HttpStatus, buildResponse, buildConflictResponse };
