const express = require('express');
const { logger } = require('./middleware/middleware');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require('./actions/actions-router');
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router');
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(logger);
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.status(200).send(`<h2>Let's write some code! YAY!</h2>`);
});

server.use(function (req, res) {
  res.status(404).send(`Ain't nobody got time for dat! Give me a real page!`);
});

module.exports = server;
