const { exists, get, increment } = require('./database');
const { buildResponse, HttpStatus } = require('./utilities');

exports.handle = async (event, context, other) => {
  const { key } = event.pathParameters;
  if (!(await exists(key))) {
    return buildResponse(
      { message: `Fractal with key '${key}' does not exist` },
      HttpStatus.NOT_FOUND
    );
  }
  await increment(key);
  const fractal = await get(key);
  return buildResponse(fractal);
};
