const mongoose = require("mongoose");

const service_config 	= require('../config/service')

const service_helper 	      = require('../helpers/service')
const validation_helper 		= require('../helpers/validation')
const LOGGER 	              = require('../helpers/logger');


/* The code is defining a Mongoose schema for a "candidate" object. The schema specifies the structure
and data types of the candidate object. */
const candidateSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  candidateId: Number,
  firstName: String,
  lastName: String,
  email: String,
  address:{
    street: String,
    city: String,
    state: String,
    country: String,
    pinCode: Number
  },
  mobile: Number,
  skill: Array,
  totalExp: Number,
  summary: String,
  hourlyPrice: Number,
  certifications: Array,
  projects: Array,
  designation: String,
  status: String,
  createdAt: Date,
  uploadPhoto: Boolean,
  uplaodPhoto: Boolean

}, {timestamps: true});

const candidate = mongoose.model("candidate", candidateSchema);

module.exports = candidate;
