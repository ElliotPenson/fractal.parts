const dynamo = require('./dynamo-db');
const {
  buildResponse,
  buildErrorResponse,
  HttpStatus
} = require('./utilities');
const { validate } = require('./validation');

exports.handle = async (event, context) => {
  const fractal = build(event);
  const valid = validate(fractal);
  if (!valid) {
    return buildErrorResponse(validate.errors, HttpStatus.BAD_REQUEST);
  }
  if (await dynamo.exists({ id: fractal.id })) {
    return buildErrorResponse('Title already exists.', HttpStatus.CONFLICT);
  }
  await dynamo.put(fractal);
  return buildResponse(fractal);
};

function build(event) {
  const { title, body } = JSON.parse(event.body);
  const id = makeId(title);
  return { id, title, body, views: 0, createdOn: getTimestamp() };
}

function makeId(title) {
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

function getTimestamp() {
  const date = new Date();
  return date.toISOString();
}
