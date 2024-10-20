const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const { createProject, fetchProjectAdvice } = require('./controllers/projects.controller');

const app = express();

app.use(express.json());

app.post('/api/projects', createProject);

app.post('/api/project-advice', fetchProjectAdvice);

app.use(errorHandler);

module.exports = app;