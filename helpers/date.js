const service_config = require('../config/service');
const error_config = require('../config/error_codes');

// add days to the system date
module.exports.add_days = (days_count) => {
  var result = new Date();
  result.setDate(result.getDate() + days_count);
  return result;
};

// compute diff in minutes from system date
module.exports.diff_minutes = (from_date) => {
  var diff = Math.abs(new Date() - from_date);
  return Math.floor(diff / 1000 / 60);
};
