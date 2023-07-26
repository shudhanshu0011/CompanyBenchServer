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
  company: String,
  duration: Number,
  skill: [String],
  jobHeading: String,
  location: [String],
  openPosition: Number,
  experienceLevel: Number,
  startdate: Date,
  hourlyPrice: Number,
  description: String,
  jobStatus: String,
  clientId: Number,
  userSfId: String
}, {timestamps: true});

const job = mongoose.model("job", jobSchema);

module.exports = job;
