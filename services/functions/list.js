const { list, count } = require('./database');
const { buildResponse, HttpStatus } = require('./utilities');

exports.handle = async (event, context) => {
  const { sort = 'views', limit = 10, offset = 0 } =
    event.queryStringParameters || {};
  const response = {
    limit,
    offset,
    total: await count(),
    items: await list(sort, limit, offset)
  };
  return buildResponse(response);
};
