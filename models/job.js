const mongoose = require("mongoose");

const service_config 	= require('../config/service')

const service_helper 	      = require('../helpers/service')
const validation_helper 		= require('../helpers/validation')
const LOGGER 	              = require('../helpers/logger');


/* The code `const jobSchema = new mongoose.Schema({ ... }, {timestamps: true});` is defining a schema
for the "job" collection in MongoDB using the Mongoose library in JavaScript. */
const jobSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
}, {timestamps: true});

const job = mongoose.model("job", jobSchema);

module.exports = job;
