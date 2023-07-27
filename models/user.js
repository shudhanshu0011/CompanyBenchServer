const mongoose = require("mongoose");

const service_config = require('../config/service')

const service_helper = require('../helpers/service')
const validation_helper = require('../helpers/validation')
const LOGGER = require('../helpers/logger');

/* The code is defining a Mongoose schema for a user object. The schema specifies that a user object
should have a `guid` property of type String. The `guid` property is required, must be in lowercase,
and must be unique. The `{timestamps: true}` option adds `createdAt` and `updatedAt` fields to the
user object, automatically tracking the creation and modification timestamps. */

const userSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  userId: Number,
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: String,
  userType: String,
  firstName: String,
  lastName: String,
  isEmailVerified: Boolean,
  isActive: Boolean,
  userSource: String,
  createdAt: Date,
  availability: Boolean,
  mobile: Number,
  company: String
}, { timestamps: true });

const user = mongoose.model("user", userSchema);

module.exports = user;
