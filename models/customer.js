const mongoose = require("mongoose");

const service_config 	= require('../config/service')

const service_helper 	      = require('../helpers/service')
const validation_helper 		= require('../helpers/validation')
const LOGGER 	              = require('../helpers/logger');

/* The code is defining a Mongoose schema for a "Customer" model. The schema has one field called
"guid" which is of type String. The "guid" field is required, must be in lowercase, and must be
unique. The schema also includes a "timestamps" option, which automatically adds "createdAt" and
"updatedAt" fields to the documents created from this schema. */
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
