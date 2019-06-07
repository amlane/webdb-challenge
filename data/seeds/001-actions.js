
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        { 
          description: 'Learn to handmake a blanket',
          notes: 'need to buy yarn and crochet hooks',
          completed: false,
          project_id: 1
        },
        { 
          description: 'Idk just make the blanket',
          notes: 'Here is the pattern to make the blanket',
          completed: false,
          project_id: 1
        },
        { 
          description: 'clean',
          notes: 'sweep, dust, mop and tidy things up',
          completed: false,
          project_id: 2
        },
        { 
          description: 'organize',
          notes: 'put things away orderly',
          completed: false,
          project_id: 2
        },
        { 
          description: 'shopping list',
          notes: 'hammer, wood, nails, glue, a bird',
          completed: false,
          project_id: 3
        },
        { 
          description: 'list of steps',
          notes: 'cut out 7 squares of wood and make a house. Put a hole for the bird to get in',
          completed: false,
          project_id: 3
        },
      ]);
    });
};
