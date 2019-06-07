const express = require('express');
const helmet = require('helmet');

const Router = require('./api/router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api', Router)

server.get('/', (req, res) => {
    res.send('Hello')
})

const port = 7248;  //lol 

server.listen(port, function() {
    console.log(`\n *** Server is running on http://localhost:${port} *** \n`)
})