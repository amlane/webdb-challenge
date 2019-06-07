const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    addProject,
    addAction, 
    getProjectById,
    getActions,
    getProjects
}


function getProjects(){
    return db('projects')
}

function addProject(project) {
    return db('projects')
    .insert(project)
};

function getActions(){
    return db('actions')
}

function addAction(action) {
    return db('actions')
    .insert(action)
};

function getProjectById(id) {
    return db('actions')
      .where({ 'actions.project_id': id })
      .first()

      .join('projects', 'projects.id', 'actions.project_id')
      .select(
        {id: 'projects.id'},
        {name: 'projects.name'},
        {projectDesc: 'projects.description'},
        {description: 'actions.description'},
        {notes: 'actions.notes'},
        {completed: 'actions.completed'}
      )
  };
