const { getProjectAdvice } = require('../services/openaiService');

const fetchProjectAdvice = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const advice = await getProjectAdvice(prompt);
        res.json({ advice });
    } catch (error) {
        next(error);
    }
};

module.exports = { fetchProjectAdvice };