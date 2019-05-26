const {
  AWS_SAM_LOCAL,
  DATABASE_URL,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD
} = process.env;

const knex = require('knex')({ client: 'mysql2', connection: getConfig() });

async function get(key) {
  const fractal = await knex('fractals')
    .where({ key })
    .first();
  return deserialize(fractal);
}

async function exists(key) {
  return Boolean(
    await knex('fractals')
      .where({ key })
      .first()
  );
}

function put(fractal) {
  return knex('fractals').insert(serialize(fractal));
}

async function list(sort, limit, offset) {
  const fractals = knex('*')
    .from('fractals')
    .orderBy(sort)
    .limit(Number(limit))
    .offset(Number(offset));
  return fractals.map(deserialize);
}

async function count() {
  const row = await knex('fractals')
    .count({ count: 'id' })
    .first();
  return row.count;
}

function increment(key, column = 'views') {
  return knex('fractals')
    .where({ key })
    .increment(column, 1);
}

function serialize(fractal) {
  return { ...fractal, body: JSON.stringify(fractal.body) };
}

function deserialize(fractal) {
  return { ...fractal, body: JSON.parse(fractal.body) };
}

function getConfig() {
  return {
    database: DATABASE_NAME,
    host: AWS_SAM_LOCAL ? 'host.docker.internal' : DATABASE_URL,
    user: DATABASE_USER || 'user',
    password: DATABASE_PASSWORD || 'password'
  };
}

module.exports = { get, exists, put, list, count, increment };
