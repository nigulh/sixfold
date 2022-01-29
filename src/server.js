'use strict';

let app = require('express')();
app.use(require('cors')());
app.use(require('./routes/hello'));
app.use(require('./routes/airways'));
app.use(function (err, req, res, next) {
    res.status(500).json({error: err})
})

module.exports = app.listen(8080, '0.0.0.0');

