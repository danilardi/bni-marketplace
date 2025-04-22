const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Example API',
            version: '1.0.0',
            description: 'API documentation for Example application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['.routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);
module.exports = swaggerSpec;