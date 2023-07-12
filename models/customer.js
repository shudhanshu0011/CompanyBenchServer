const mongoose = require("mongoose");

const service_config 	= require('../config/service')

const service_helper 	      = require('../helpers/service')
const validation_helper 		= require('../helpers/validation')
const LOGGER 	              = require('../helpers/logger');

const CustomerSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
}, {timestamps: true});

const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;
