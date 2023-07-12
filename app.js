const express 		= require('express');
const path 				= require('path');
const bodyParser 	= require('body-parser');
const cors 				= require('cors');

const service_config 	= require('./config/service')

const logger_helper 	= require('./helpers/logger');
const db_connection 	= require('./helpers/db_connection');

const app 	= express();
// const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());

app.use(db_connection.connect)

// Static Folder
app.use(express.static(path.join(__dirname,'public')))

// Routes [Replace by entity name]
app.use('/v1/customer', require('./routes/customer'));

app.get('/', (req,res)=> {
	res.sendFile(path.join(__dirname,"public" + req.url));
});

// Redirect all other requests to index.html
app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname,'public/index.html'));
});

module.exports = app
