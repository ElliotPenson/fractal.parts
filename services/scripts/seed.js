#!/usr/bin/env node

const fs = require('fs');
const yaml = require('js-yaml');
const AWS = require('aws-sdk');

const TEMPLATE_PATH = './template.yaml';

const dynamoDB = new AWS.DynamoDB({
  endpoint: 'http://localhost:8000',
  region: 'us-east-1'
});

async function main() {
  for (const resource of loadResources()) {
    if (isTable(resource)) {
      await upsertTable(resource.Properties);
    }
  }
}

async function upsertTable(properties) {
  const { TableName } = properties;
  if (await tableExists(TableName)) {
    await dynamoDB.deleteTable({ TableName }).promise();
  }
  await dynamoDB.createTable(properties).promise();
}

async function tableExists(name) {
  const tables = await dynamoDB.listTables().promise();
  return tables.TableNames.includes(name);
}

function loadResources() {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const content = parseYAML(template);
  return Object.values(content.Resources);
}

function parseYAML(text) {
  const refType = new yaml.Type('!Ref', { kind: 'scalar' });
  const schema = yaml.Schema.create([refType]);
  return yaml.safeLoad(text, { schema });
}

function isTable(resource) {
  return resource.Type === 'AWS::DynamoDB::Table';
}

if (require.main === module) {
  main();
}
