const OpenAI = require("openai");
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

module.exports = { getProjectAdvice };
