const { get, increment } = require('./database');
const { buildResponse, HttpStatus } = require('./utilities');

exports.handle = async (event, context, other) => {
  const { key } = event.pathParameters;
  await increment(key);
  const fractal = await get(key);
  if (!fractal) {
    return buildResponse(
      { message: `Fractal with key '${key}' does not exist` },
      HttpStatus.NOT_FOUND
    );
  }
  return buildResponse(fractal);
};
