const {
  AWS_SAM_LOCAL,
  DATABASE_URL,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD
} = process.env;

const Direction = Object.freeze({ ASC: 'asc', DESC: 'desc' });

const knex = require('knex')({ client: 'mysql2', connection: getConfig() });

async function get(key) {
  return await knex('fractals')
    .where({ key })
    .first();
}

async function exists(key) {
  return Boolean(
    await knex('fractals')
      .where({ key })
      .first()
  );
}

function put(fractal) {
  return knex('fractals').insert(fractal);
}

async function list(sort, limit, offset) {
  const [column, direction] = parseSort(sort);
  return knex('*')
    .from('fractals')
    .orderBy(column, direction)
    .limit(Number(limit))
    .offset(Number(offset));
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

function parseSort(sort) {
  return [findColumn(sort), findDirection(sort)];
}

function findColumn(sort) {
  if (sort.startsWith('+') || sort.startsWith('-')) {
    return sort.slice(1);
  } else {
    return sort;
  }
}

function findDirection(sort) {
  if (sort.startsWith('-')) {
    return Direction.DESC;
  } else {
    return Direction.ASC;
  }
}

function getConfig() {
  return {
    database: DATABASE_NAME,
    host: AWS_SAM_LOCAL ? 'host.docker.internal' : DATABASE_URL,
    user: DATABASE_USER || 'user',
    password: DATABASE_PASSWORD || 'password'
  };
}

module.exports = { get, exists, put, list, count, increment, parseSort };
