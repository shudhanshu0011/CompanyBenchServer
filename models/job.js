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
  skill: {
    type: [String],
    required: true,
  }
  jobHeading:{
    type: String,
    required: true,
  },
  location: [String],
  openPosition: Number,
  experienceLevel:{
    type: Number,
    required: true
  },
  startdate:{
    type:Date,
    default: new Date(),
    required: true 
  },
  hourlyPrice:{
    type: Number,
    required: true
  },
  jobStatus: String,
  clientId: Number,
  userSfId: String,
  description:{
    type: String,
    required: true
  }
}, {timestamps: true});

const job = mongoose.model("job", jobSchema);

module.exports = job;
