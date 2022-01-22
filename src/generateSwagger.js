'use strict';

const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/hello.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
fs.writeFile("./api/demo.json", JSON.stringify(openapiSpecification, null, 2), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
