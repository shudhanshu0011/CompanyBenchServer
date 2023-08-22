const mongoose = require("mongoose");

const service_config = require('../config/service')

const service_helper = require('../helpers/service')
const validation_helper = require('../helpers/validation')
const LOGGER = require('../helpers/logger');

const joblocationSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  cityId: Number,
  cityName: String,
  cityState: String,
  countryName: String,
  language: String,
  symbol: String,
  currencyCode: String
}, { timestamps: true });

joblocationSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['_id']
    return ret
  }
})

const joblocation = mongoose.model("joblocation", joblocationSchema);

module.exports = joblocation;
