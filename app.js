const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi');
const Mongoose = require('mongoose');

var dbUrl = 'mongodb://localhost:27017/unisport';
//check if we are in docker compose or not

console.log("db url used: " +dbUrl);

//how many times we tried to connect to the db
var attempts = 0;
var mongoOptions = {useMongoClient: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500 // Reconnect every 500ms
};

//the wait loop for the db connection
var createDbCallback = function(err) {
    if(!err){
        console.log("Database connection established!");
        return;
    }
    console.log(err);
    attempts++;
    console.log("attempts: " + attempts);
    setTimeout(function(){
        Mongoose.connect(dbUrl, mongoOptions, function (error) {
            createDbCallback(error)
        });
    }, 2000);
};

//try to make a connection
createDbCallback("first");

//the db connection
var db = Mongoose.connection;
//hook if the db loses connection (mongo container is not reachable)
db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
});
//hook if we reconnect to the db server
db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});

//---------------//
//STARTING SERVER//
//---------------//

const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
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

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply("Hello World!").code(200);
    },
    config: {
        tags: ['api'],
        description: 'hello world!',
        plugins: {
            'hapi-swagger': {
                responses: {
                    200: {
                        description: 'Success'
                    }
                }
            }
        }
    }
});

server.start(function (err){
    console.log('Server running at:', server.info.uri);
});
