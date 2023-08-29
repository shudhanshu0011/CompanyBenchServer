const service_config = require('../config/service');
const error_config = require('../config/error_codes');
const logger_helper = require('../helpers/logger');
const { result } = require('lodash');

// generate guid
module.exports.generate_guid = () => {
  return service_config.guid_format.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

module.exports.generate_short_guid = () => {
  return service_config.uid_format.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

module.exports.generate_hash_code = (_str) => {
  var hash = 0,
    i,
    chr;
  if (_str.length === 0) return hash;
  for (i = 0; i < _str.length; i++) {
    chr = _str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Fetch unique values from list
module.exports.unique = (arr) => {
  var u = {},
    a = [];
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (!u.hasOwnProperty(arr[i])) {
      a.push(arr[i]);
      u[arr[i]] = 1;
    }
  }
  return a;
};

// Success Response JSON
module.exports.success_res = (tr_guid, ref_id, res_data_obj, result) => {
  // del_keys(res_data_obj)
  return {
    success: true,
    transaction_guid: tr_guid,
    service_ref: ref_id,
    data: res_data_obj,
    total: result.total,
    limit: result.limit,
    page: result.offset,
  };
};

module.exports.success_res = (tr_guid, ref_id, res_data_obj) => {
  // del_keys(res_data_obj)
  return {
    success: true,
    transaction_guid: tr_guid,
    service_ref: ref_id,
    data: res_data_obj
  };
};

// Error Response JSON
module.exports.error_res = (tr_guid, ref_id, error_obj) => {
  logger_helper.error(tr_guid, ref_id, '[Service Helper] error_res()', error_obj.code, error_obj.message);
  // del_keys(error_obj)
  return {
    success: false,
    transaction_guid: tr_guid,
    service_ref: ref_id,
    error: error_obj,
  };
};

// Remove unwanted & or sensitive keys
module.exports.del_keys = (json_obj) => {
  for (var key in json_obj) {
    if (json_obj[key] !== null && typeof json_obj[key] === 'object') {
      del_keys(json_obj[key]);

      if (is_empty(json_obj[key])) {
        delete json_obj[key];
      }
    }
    if (key == '__v' || key == '_id') {
      delete json_obj[key];
    }
  }
};
is_empty = (obj) => {
  for (var key in obj) return false;
  return true;
};

module.exports.csv_to_json = (csv) => {
  var lines = csv.split('\n');
  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers = lines[0].split(',');
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(',');
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result; //JSON
};

module.exports.csv_to_json_with_delimit = (csv, delimiter) => {
  var lines = csv.split('\n');
  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers = lines[0].split(delimiter);
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(delimiter);
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result; //JSON
};
