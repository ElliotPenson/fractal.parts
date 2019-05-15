const { put, exists } = require('./database');
const {
  buildResponse,
  buildConflictResponse,
  HttpStatus
} = require('./utilities');
const { validate } = require('./validation');

async function handle(event, context) {
  const { title, body } = JSON.parse(event.body);
  const valid = validate({ title, body });
  if (!valid) {
    return buildResponse(validate.errors, HttpStatus.BAD_REQUEST);
  }
  const fractal = { key: makeKey(title), title, body, views: 0 };
  if (await exists(fractal.key)) {
    return buildConflictResponse(fractal.key);
  }
  await put(fractal);
  return buildResponse(fractal);
}

function makeKey(title) {
  const alphanumeric = removeSymbols(title);
  const words = alphanumeric.trim().split(' ');
  return words.join('-').toLowerCase();
}

function removeSymbols(text) {
  return text.replace(/[^\w ]/g, '');
}

module.exports = { handle, makeKey };
