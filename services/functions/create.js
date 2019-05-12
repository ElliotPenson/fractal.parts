const { put, exists } = require('./database');
const { buildResponse, HttpStatus } = require('./utilities');
const { validate } = require('./validation');

exports.handle = async (event, context) => {
  const fractal = build(event);
  const valid = validate(fractal);
  if (!valid) {
    return buildResponse(validate.errors, HttpStatus.BAD_REQUEST);
  }
  if (await exists(fractal.key)) {
    return buildResponse(
      { message: `A fractal with key '${fractal.key}' already exists.` },
      HttpStatus.CONFLICT
    );
  }
  await put(fractal);
  return buildResponse(fractal);
};

function build(event) {
  const { title, body } = JSON.parse(event.body);
  const key = makeKey(title);
  return { key, title, body, views: 0 };
}

function makeKey(title) {
  if (title) {
    const alphanumeric = removeSymbols(title);
    const words = alphanumeric.split(' ');
    return words.join('-').toLowerCase();
  } else {
    return null;
  }
}

function removeSymbols(text) {
  return text.replace(/[^\w]/g, '');
}
