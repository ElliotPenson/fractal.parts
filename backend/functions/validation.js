const Ajv = require('ajv');
const schema = require('./fractal.schema.json');

const ajv = new Ajv();

module.exports.validate = ajv.compile(schema);
