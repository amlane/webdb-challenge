
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { name: 'Crochet a blanket', 
          description: 'use a hook and yarn to make a comfy blankey',
          completed: false
        },
        { name: 'Reorganize storage room', 
          description: 'Find the joy in your junk',
          completed: false
        },
        { name: 'Build a bird house', 
          description: 'Give them birds a place to live, ok.',
          completed: false
        },
      ]);
    });
};
