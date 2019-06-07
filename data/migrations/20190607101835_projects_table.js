
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function(t){
        // primary key
        t.increments();
        // name
        t.string('name', 128)
        .notNullable();
        // description
        t.string('description', 355)
        .notNullable();
        // completed?
        t.boolean('completed')
        .notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects');
};
