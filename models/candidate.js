const mongoose = require("mongoose");

const service_config 	= require('../config/service')

const service_helper 	      = require('../helpers/service')
const validation_helper 		= require('../helpers/validation')
const LOGGER 	              = require('../helpers/logger');

const candidateSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  name: String,
  email: String,
  address:{
    street: String,
    city: String,
    state: String,
    country: String,
    pinCode: Number
  },
  mobile: Number
}, {timestamps: true});

const candidate = mongoose.model("candidate", candidateSchema);

module.exports = candidate;
