const express = require('express')
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Welcome to the AI project manager matey!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})