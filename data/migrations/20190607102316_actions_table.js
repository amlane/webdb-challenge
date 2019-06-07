
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', function(t){
        // primary key
        t.increments();
        // description
        t.string('description', 128)
        .notNullable();
        // notes
        t.string('notes', 355)
        .notNullable();
        // completed?
        t.boolean('completed')
        .notNullable();
        //foreign key
        t.integer('project_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
};
