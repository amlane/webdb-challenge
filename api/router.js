const router = require('express').Router();

const db = require('./model.js');

router.get('/projects', (req, res) => {
    db.getProjects()
    .then( project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.post('/projects', (req, res) => {
    db.addProject(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/actions', (req, res) => {
    db.getActions()
    .then( action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.post('/actions', (req, res) => {
    db.addAction(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/projects/:id', (req, res) => {
    db.getProjectById(req.params.id)
    .then(projects => {
        db.getActions()
          .where({ project_id: req.params.id})
          .then(actions => {
            projects.actions = actions;
            return res.status(200).json(projects);
          });
      })
      .catch(err => {
        res
          .status(500)
          .json(err);
      });
});



module.exports = router;