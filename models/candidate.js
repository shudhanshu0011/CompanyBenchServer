const mongoose = require("mongoose");

const service_config = require('../config/service')

const service_helper = require('../helpers/service')
const validation_helper = require('../helpers/validation')
const LOGGER = require('../helpers/logger');


/* The code is defining a Mongoose schema for a "candidate" object. The schema specifies the structure
and data types of the candidate object. */
const candidateSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  clientId: Number,
  jobId: Number,
  candidateId: Number,
  vendorId: Number,
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pinCode: Number
  },
  mobile: Number,
  location: String,
  locationName: String,
  skill: [String],
  skillNames: String,
  totalExp: Number,
  summary: String,
  imageUrl: String,
  resumeUrl: String,
  technologyName: Number,
  hourlyPrice: Number,
  certifications: Array,
  projects: Array,
  designation: String,
  status: String,
  inviteStatus: String,
  createdAt: Date,
  uploadPhoto: Boolean,
  uplaodPhoto: Boolean

}, { timestamps: true });

const candidate = mongoose.model("candidate", candidateSchema);

module.exports = candidate;
