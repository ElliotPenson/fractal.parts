const { buildResponse, HttpStatus } = require('./utilities');
const AWS = require('aws-sdk');

const warmFlag = 'warming';

async function handle(event, context, other) {
  const lambdas = process.env.LAMBDAS.split(',');
  for (const lambda of lambdas) {
    await invokeLambda(lambda);
  }
  return buildResponse();
}

function invokeLambda(name) {
  const lambda = new AWS.Lambda();
  return lambda
    .invoke({
      FunctionName: name,
      InvocationType: 'Event',
      LogType: 'Tail',
      Payload: JSON.stringify({ [warmFlag]: true })
    })
    .promise();
}

function isWarming(event) {
  return event.hasOwnProperty(warmFlag) && event[warmFlag];
}

module.exports = { handle, isWarming };
