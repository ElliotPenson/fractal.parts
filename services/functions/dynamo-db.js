const AWS = require('aws-sdk');

const { AWS_SAM_LOCAL } = process.env;
const TABLE_NAME = process.env.TABLE_NAME || 'FractalTable';

/**
 * Add an item to the table.
 * @param {object} body - Map from attribute name to value.
 */
async function put(body) {
  const client = buildClient();
  await client.put({ Item: body, TableName: TABLE_NAME }).promise();
}

/**
 * Retrieve an entry via a primary key.
 * @param {object} key - A primary key defined as { name: value }.
 * @return {object} - Content from the table (if found).
 */
async function get(key) {
  const client = buildClient();
  const response = await client
    .get({ Key: key, TableName: TABLE_NAME })
    .promise();
  return response.Item;
}

/**
 * Check if an entry has a given primary key.
 * @param {object} key - A primary key defined as { name: value }.
 * @return {boolean}
 */
async function exists(key) {
  return !!(await get(key));
}

function buildClient() {
  let options = {};
  if (AWS_SAM_LOCAL) {
    options = {
      endpoint: 'http://host.docker.internal:8000',
      region: 'us-east-1'
    };
  }
  return new AWS.DynamoDB.DocumentClient(options);
}

module.exports = { put, get, exists };
