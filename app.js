require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getProjectAdvice(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        return 'Sorry, something went wrong while fetching project advice.';
    }
}

app.get('/', (req, res) => {
    res.send('Welcome to the AI project manager matey!');
});

app.get('/project-advice', async (req, res) => {
    const prompt = "Give me a project plan for building an API using Node.js.";
    const advice = await getProjectAdvice(prompt);
    res.json({ advice });
});

module.exports = app;
