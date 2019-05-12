const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'host.docker.internal',
    user: 'user',
    password: 'password',
    database: 'database'
  }
});

const tableName = 'fractals';

async function get(key) {
  const fractal = await knex(tableName)
    .where({ key })
    .first();
  return deserialize(fractal);
}

async function exists(key) {
  return Boolean(
    await knex(tableName)
      .where({ key })
      .first()
  );
}

function put(fractal) {
  return knex(tableName).insert(serialize(fractal));
}

async function list(sort, limit, offset) {
  const fractals = knex('*')
    .from(tableName)
    .orderBy(sort)
    .limit(limit)
    .offset(offset);
  return fractals.map(deserialize);
}

async function count() {
  const row = await knex(tableName)
    .count({ count: 'id' })
    .first();
  return row.count;
}

function increment(key, column = 'views') {
  return knex(tableName)
    .where({ key })
    .increment(column, 1);
}

function serialize(fractal) {
  return { ...fractal, body: JSON.stringify(fractal.body) };
}

function deserialize(fractal) {
  return { ...fractal, body: JSON.parse(fractal.body) };
}

module.exports = { get, exists, put, list, count, increment };
