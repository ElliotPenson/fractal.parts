const dynamo = require('./dynamo-db');
const {
  buildResponse,
  buildErrorResponse,
  HttpStatus
} = require('./utilities');

exports.handle = async (event, context, other) => {
  const { id } = event.pathParameters;
  const fractal = await dynamo.get({ id });
  if (!fractal) {
    return buildErrorResponse(
      `Fractal with ID '${id}' does not exist`,
      HttpStatus.NOT_FOUND
    );
  }
  return buildResponse(fractal, HttpStatus.CREATED);
};
