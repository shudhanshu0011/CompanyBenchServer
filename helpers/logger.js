const service_config = require('./service');

module.exports.log = (tr_guid, ref_id, method_name, message) => {
  // if(service_config.log_level == 'DEBUG') {
  if (typeof message == 'object') {
    message = JSON.stringify(message, mask_info);
  }
  console.log('[' + ref_id + '][' + tr_guid + '-' + get_ist() + '][' + method_name + '] - ' + message);
  // }
};

module.exports.error = (tr_guid, ref_id, method_name, error_code, message) => {
  if (typeof message == 'object') {
    message = JSON.stringify(message, mask_info);
  }
  console.error('[ERROR][' + ref_id + '][' + tr_guid + '-' + get_ist() + '][' + method_name + '] - ' + message);
};

function get_ist() {
  var current_time = new Date();
  var current_offset = current_time.getTimezoneOffset();
  var ist_offset = 330; // IST offset UTC +5:30
  var ist_time = new Date(current_time.getTime() + (ist_offset + current_offset) * 60000);
  // ist_time now represents the time in IST coordinates
  return ist_time.getHours().toString() + ':' + ist_time.getMinutes().toString();
}

function mask_info(key, value) {
  var maskedValue = value;
  if (key == 'contact_no') {
    if (value && value.length > 5) {
      maskedValue = '*' + maskedValue.substring(value.length - 4, value.length);
    } else {
      maskedValue = '****';
    }
  }
  return maskedValue;
}
