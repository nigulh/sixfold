'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

require('./routes/hello')(app);

const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
