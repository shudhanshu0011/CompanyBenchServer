const service_config = require('../config/service');
const error_config = require('../config/error_codes');
const logger_helper = require('../helpers/logger');

// generate guid
module.exports.email = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
