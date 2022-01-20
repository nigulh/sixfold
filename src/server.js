'use strict';

const express = require('express');
const cors = require('cors');

const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/ping/:message', (req, res) => {
    let message = req.params.message;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({echo: message + message}));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
