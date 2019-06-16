const { makeKey } = require('../functions/create');
const fractals = require('./fractals.json');

const tableName = 'fractals';

exports.seed = knex => {
  const rows = fractals.map(serialize);
  return knex(tableName)
    .del()
    .then(() => knex(tableName).insert(rows));
};

function serialize(fractal) {
  const { title, body, views } = fractal;
  return { key: makeKey(title), title, body: JSON.stringify(body), views };
}
