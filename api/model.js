const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    addProject,
    addAction, 
    getActionsByProjectId,
    getActions,
    getProjects, 
    editProject,
    deleteProject,
    getProjectById,
    getActionsById, 
    editAction,
    deleteAction
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


function getActionsByProjectId(id) {
    return db('actions')
      .where({ 'actions.project_id': id })
  };


// Action helpers

function getActions(){
    return db('actions')
}

function getActionsById(id){
    return db('actions')
    .where({ id })
    .first();
};

function addAction(action) {
    return db('actions')
    .insert(action)
};

function editAction(id, changes) {
    return db('actions')
    .where({ id })
    .update(changes)
};

function deleteAction(id) {
    return db('actions')
    .where({ id })
    .del();  //thanks for explaining why! :)
};
