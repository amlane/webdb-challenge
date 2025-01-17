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

router.get('/projects/:id', verifyProjectId, (req, res) => {
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
    const { name, description } = req.body;
    if( !name || !description ) {
        res.status(400).json({ message: 'New projects require a name and description.' })
    } else {
        db.addProject(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    }
});

router.put('/projects/:id', verifyProjectId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const { name, description } = req.body;
    if( !name || !description ) {
        res.status(400).json({ message: 'Projects require a name and description.' })
    } else {
    db.editProject(id, changes)
    .then(updatedProject => {
        res.status(201).json(updatedProject)
    })
    .catch(err => {
        res.status(500).json(err)
    })
  }
});

router.delete('/projects/:id', verifyProjectId, (req, res) => {
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

router.get('/project/:id', verifyProjectId, (req, res) => {
    const id = req.params.id;

    db.getProjectById(id)
    .then( project => {
        db.getActionsByProjectId(id)
        .then(actions => {
            res.status(200).json({ ...project, actions })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
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

router.get('/actions/:id', verifyActionId, (req, res) => {
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
    const { description, notes, project_id } = req.body;
    if( !notes || !description || !project_id) {
        res.status(400).json({ message: 'Actions require a description, note and project id.' })
    } else {
    db.addAction(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
  }
});

router.put('/actions/:id', verifyActionId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const { description, notes, project_id } = req.body;
    if( !notes || !description || !project_id) {
        res.status(400).json({ message: 'Actions require a description, note and project id.' })
    } else {
    db.editAction(id, changes)
    .then(updatedProject => {
        res.status(201).json(updatedProject)
    })
    .catch(err => {
        res.status(500).json(err)
    })
  }
});

router.delete('/actions/:id', verifyActionId, (req, res) => {
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

function verifyProjectId(req, res, next){
    const id = req.params.id;

    db.getProjectById(id)
    .then(item => {
        if(item){
            req.item = item;
            next();
        } else {
            res.status(404).json({ message: "Project Not Found." })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
};

function verifyActionId(req, res, next){
    const id = req.params.id;

    db.getActionsById(id)
    .then(item => {
        if(item){
            req.item = item;
            next();
        } else {
            res.status(404).json({ message: "Action Not Found." })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
};



module.exports = router;