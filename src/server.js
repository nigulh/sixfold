'use strict';

const app = require('express')();
app.use(require('cors')());

require('./routes/hello')(app);

module.exports = app.listen(8080, '0.0.0.0');
