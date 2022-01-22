'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

require('./routes/hello')(app);

let server = app.listen(8080, '0.0.0.0');

module.exports = server;
