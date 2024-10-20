// routes/projectRoutes.js
const express = require('express');
const { fetchProjectAdvice } = require('../controllers/projects.controller');


const projectRoutes = express.Router();

projectRoutes.post('/project-advice', fetchProjectAdvice);

module.exports = projectRoutes;
