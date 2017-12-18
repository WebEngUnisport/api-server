const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Mongoose = require('mongoose');

var corsHeaders = require('hapi-cors-headers')

//create db connection
require('./model/helper/databaseConnection');

//create models
require('./model/createModel');

//---------------//
//STARTING SERVER//
//---------------//

const server = new Hapi.Server();
server.connection({
    host: '127.0.0.1',
    port: 8080,
    routes: {cors: true}
});

const swaggerOptions = {
    info: {
        'title': 'unisport9',
        'version': '1.0.0',
        'description': 'unisport9 api doc'
    }
};

server.register([
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: swaggerOptions
    }
]);

//-----------------------------
// PUBLIC API
//-----------------------------
require('./rounting/publicPaths')(server);

server.ext('onPreResponse', corsHeaders)

//-----------------------------
// START SERVER
//-----------------------------
server.start(function (err){
    console.log('Server running at:', server.info.uri);
});
