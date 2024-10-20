const { createNewProject } = require('../models/projects.model');
const { getProjectAdvice } = require('../services/openaiService');

exports.fetchProjectAdvice = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const advice = await getProjectAdvice(prompt);
        res.json({ advice });
    } catch (error) {
        next(error);
    }
};

exports.createProject = (req, res, next) => {
    const { user_id, name, description } = req.body;
    createNewProject(user_id, name, description)
        .then((newProject) => {
            res.status(201).json({ project: newProject });
        })
        .catch(next); 
};