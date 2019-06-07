const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    addProject,
    addAction, 
    getProjectWithActionsById,
    getActions,
    getProjects, 
    editProject,
    deleteProject,
    getProjectById
}

// Project Helpers

function getProjects(){
    return db('projects')
}

function getProjectById(id){
    return db('projects')
    .where({ id })
    .first();
};

function addProject(project) {
    return db('projects')
    .insert(project)
};

function editProject(id, changes) {
    return db('projects')
    .where({ id })
    .update(changes)
};

function deleteProject(id) {
    return db('projects')
    .where({ id })
    .del();  //thanks for explaining why! :)
};


function getProjectWithActionsById(id) {
    return db('actions')
      .where({ 'actions.project_id': id })
      .first()

      .join('projects', 'projects.id', 'actions.project_id')
      .select(
        'projects.id',
        'projects.name',
        'projects.description',
        'projects.completed'
      )
  };


// Action helpers

function getActions(){
    return db('actions')
}

function addAction(action) {
    return db('actions')
    .insert(action)
};

