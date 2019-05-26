exports.up = knex => {
  return knex.schema.createTable('fractals', table => {
    table.increments();
    table.string('key');
    table.string('title');
    table.text('body');
    table.integer('views');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique('key');
    table.index('key');
    table.index('views');
    table.index('created_at');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('fractals');
};
