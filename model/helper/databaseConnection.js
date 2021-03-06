const Mongoose = require("mongoose");
const isDocker = require('is-docker');

var create = function ()
{
	var dbUrl;

	// Check if the process is running inside a Docker container
	if (isDocker())
	{
		console.log('Running inside a Docker container');
		dbUrl = 'mongodb://mongo:27017/unisport9';
	}
	else
	{
		console.log('NOT running inside a Docker container');
		dbUrl = 'mongodb://uniweb:uniweb@ds145275.mlab.com:45275/unisport9';
	}

	console.log("DB URL used: " + dbUrl);

	// How many times we tried to connect to the DB
	var attempts = 0;
	var mongoOptions =
	{
		useMongoClient: true,
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		reconnectInterval: 500 // Reconnect every 500ms
	};

	// The wait loop for the DB connection
	var createDbCallback = function(err)
	{
		if(!err)
		{
			console.log("Database connection established!");
			return;
		}
		console.log(err);
		attempts++;
		console.log("attempts: " + attempts);
		setTimeout(function()
		{
			Mongoose.connect(dbUrl, mongoOptions, function (error)
			{
				createDbCallback(error)
			});
		}, 2000);
	};

	// Try to make a connection
	createDbCallback("first");

	// The DB connection
	var db = Mongoose.connection;

	db.on('connected', function()
	{
		console.log('MongoDB connected!');
	});

	db.once('open', function()
	{
		console.log('MongoDB connection opened!');
	});

	// Hook if the DB loses connection (mongo container is not reachable)
	db.on('disconnected', function()
	{
		console.log('MongoDB disconnected!');
	});

	// Hook if we reconnect to the DB server
	db.on('reconnected', function ()
	{
		console.log('MongoDB reconnected!');
	});
};

module.exports = create();
