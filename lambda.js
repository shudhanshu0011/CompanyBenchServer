'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')
const binaryMimeTypes = [
	'application/octet-stream',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml'
]
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
exports.handler = (event, context) =>  {
	//the following line is critical for performance reasons to allow re-use of database connections
	// across calls to this Lambda function and avoid closing the database connection.
	// The first call to this lambda function takes about 5 seconds to complete, while subsequent,
	// close calls will only take a few hundred milliseconds.
	context.callbackWaitsForEmptyEventLoop = false;
	awsServerlessExpress.proxy(server, event, context)
}
