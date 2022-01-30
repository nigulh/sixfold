'use strict';
let app = require('express')();
let bodyParser = require('body-parser');
app.use(require('cors')());
app.use(bodyParser.json());
app.use(require('./routes/hello'));
app.use(require('./routes/airways'));
app.use(require('./routes/shortestPath'));
app.use(function (err, req, res, next) {
    res.status(500).json({error: err})
})

module.exports = app.listen(8080, '0.0.0.0');

