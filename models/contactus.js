const mongoose = require("mongoose");

const service_config = require('../config/service')

const service_helper = require('../helpers/service')
const validation_helper = require('../helpers/validation')
const LOGGER = require('../helpers/logger');

const contactusSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  leadSourceDetail: String,
  captchaSettings: String,
  oid: String,
  retUrl: String,
  dataSitekey: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  leadSource: String

}, { timestamps: true });

contactusSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['_id']
    delete ret['__v']
    return ret
  }
})

const contactus = mongoose.model("contactus", contactusSchema);

module.exports = contactus;
