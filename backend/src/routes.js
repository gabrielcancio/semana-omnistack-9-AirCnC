const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    response.json({
        name: 'Gabriel Cancio',
        message: 'Hello OmniStack!!',
        evento: 'Semana OmniStack',
        versao: 9
    });
});

module.exports = routes;

