const router = require('express').Router();

const db = require('./model.js');

// '/api/projects' endpoints

router.get('/projects', (req, res) => {
    db.getProjects()
    .then( project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/projects/:id', (req, res) => {
    const id = req.params.id;

    db.getProjectById(id)
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

router.put('/projects/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db.editProject(id, changes)
    .then(updatedProject => {
        res.status(201).json(updatedProject)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.delete('/projects/:id', (req, res) => {
    const id = req.params.id;

    db.deleteProject(id)
    .then(deleted => {
        res.status(200).json({ message: `${deleted} project deleted.` });
    })
    .catch(err => {
        res.status(500).json(err)
    })
});


// '/api/project/:id' endpoint

router.get('/project/:id', (req, res) => {
    const id = req.params.id;

    db.getProjectWithActionsById(id)
    .then(projects => {
        db.getActions()
          .where({ project_id: id })
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


// '/api/actions' endpoints

router.get('/actions', (req, res) => {
    db.getActions()
    .then( action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/actions/:id', (req, res) => {
    const id = req.params.id;

    db.getActionsById(id)
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

router.put('/actions/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db.editAction(id, changes)
    .then(updatedProject => {
        res.status(201).json(updatedProject)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.delete('/actions/:id', (req, res) => {
    const id = req.params.id;

    db.deleteAction(id)
    .then(deleted => {
        res.status(200).json({ message: `${deleted} action deleted.` });
    })
    .catch(err => {
        res.status(500).json(err)
    })
});


// Custom middleware

// function verifyProjectId(req, res, next){
//     const id = req.params.id;

//     db.findById(id)
//     .then(item => {
//         if(item){
//             req.item = item;
//             next();
//         } else {
//             res.status(404).json({ message: "User Not Found." })
//         }
//     })
//     .catch(err => {
//         res.status(500).json(err)
//     })
// };



module.exports = router;