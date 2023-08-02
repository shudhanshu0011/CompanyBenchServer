const mongoose = require("mongoose");

const service_config = require('../config/service')

const service_helper = require('../helpers/service')
const validation_helper = require('../helpers/validation')
const LOGGER = require('../helpers/logger');

const technologySchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  technologyId: Number,
  technologyName: String,
  counter: Number
}, { timestamps: true });

const technology = mongoose.model("technology", technologySchema);

module.exports = technology;
