'use strict';

let app = require('express')();
app.use(require('cors')());
app.use(require('./routes/hello'));

module.exports = app.listen(8080, '0.0.0.0');

