const { buildResponse, HttpStatus } = require('./utilities');

exports.handle = async (event, context) => {
  return buildResponse('todo', HttpStatus.CREATED);
};
