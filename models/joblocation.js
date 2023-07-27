const mongoose = require("mongoose");

const service_config 	= require('../config/service')

const service_helper 	      = require('../helpers/service')
const validation_helper 		= require('../helpers/validation')
const LOGGER 	              = require('../helpers/logger');

const joblocationSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
}, {timestamps: true});

const joblocation = mongoose.model("joblocation", joblocationSchema);

module.exports = joblocation;
