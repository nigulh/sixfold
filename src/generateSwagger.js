'use strict';

const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: '✈ Airways',
            description: 'Hendrik Nigul Sixfold API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3033'
            }
        ]
    },
    apis: ['./src/routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
fs.writeFile("./api/swagger.json", JSON.stringify(openapiSpecification, null, 2), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
