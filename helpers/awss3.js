const AWS = require('aws-sdk');
const fs = require('fs');
const request = require('request');

const service_config = require('../config/service');
const error_config = require('../config/error_codes');
const LOGGER = require('../helpers/logger');

const s3 = new AWS.S3({
  accessKeyId: service_config.s3_access_key_id,
  secretAccessKey: service_config.s3_secret_access_key,
  region: service_config.s3_region,
});

module.exports.upload = (tr_guid, ref_id, url, bucket, key, callback) => {
  LOGGER.log(tr_guid, ref_id, '[S3 Helper] upload()', 'url :: ' + url);
  request(
    {
      url: url,
      encoding: null,
    },
    function (err, res, body) {
      if (err) {
        LOGGER.error(tr_guid, ref_id, '[S3 Helper] upload()', '', '1 err :: ' + JSON.stringify(err));
        return callback(err, res);
      }
      s3.upload(
        {
          Bucket: bucket,
          Key: key,
          ContentType: res.headers['content-type'],
          ContentLength: res.headers['content-length'],
          Body: body, // buffer
        },
        (err, res) => {
          if (err) {
            LOGGER.error(tr_guid, ref_id, '[S3 Helper] upload()', '', '2 err :: ' + JSON.stringify(err));
          }
          LOGGER.log(tr_guid, ref_id, '[S3 Helper] upload()', 'res :: ' + JSON.stringify(res));
          callback(null, res);
        },
      );
    },
  );
};

// Upload file from local file-system
module.exports.uploadfile = (tr_guid, ref_id, file_name, bucket, key, callback) => {
  let file_content = fs.readFileSync(file_name);
  let params = {
    Bucket: bucket, // pass your bucket name
    Key: key, // file will be saved as testBucket/contacts.csv
    Body: file_content,
  };
  s3.upload(params, function (_s3_err, data) {
    if (_s3_err) {
      LOGGER.error(tr_guid, ref_id, '[S3 Helper] uploadfile()', '', '_s3_err :: ' + JSON.stringify(_s3_err));
      callback(_s3_err, null);
    } else {
      LOGGER.log(tr_guid, ref_id, '[S3 Helper] uploadfile()', 'data :: ' + JSON.stringify(data));
      callback(null, data);
    }
  });
};

module.exports.uploadjson = (tr_guid, ref_id, json_obj, bucket, key, callback) => {
  let buf_json = Buffer.from(JSON.stringify(json_obj));
  let params = {
    Bucket: bucket, // pass your bucket name
    Key: key, // file will be saved as testBucket/contacts.csv
    Body: buf_json,
    ContentEncoding: 'base64',
    ContentType: 'application/json',
  };
  s3.upload(params, function (_s3_err, data) {
    if (_s3_err) {
      LOGGER.error(tr_guid, ref_id, '[S3 Helper] uploadjson()', '', '_s3_err :: ' + JSON.stringify(_s3_err));
      callback(_s3_err, null);
    } else {
      LOGGER.log(tr_guid, ref_id, '[S3 Helper] uploadjson()', 'data :: ' + JSON.stringify(data));
      callback(null, data);
    }
  });
};

module.exports.uploadfilecontent = (tr_guid, ref_id, file_content, bucket, key, callback) => {
  let params = {
    Bucket: bucket, // pass your bucket name
    Key: key, // file will be saved as testBucket/contacts.csv
    Body: file_content,
  };
  s3.upload(params, function (_s3_err, data) {
    if (_s3_err) {
      LOGGER.error(tr_guid, ref_id, '[S3 Helper] uploadjson()', '', '_s3_err :: ' + JSON.stringify(_s3_err));
      callback(_s3_err, null);
    } else {
      LOGGER.log(tr_guid, ref_id, '[S3 Helper] uploadjson()', 'data :: ' + JSON.stringify(data));
      callback(null, data);
    }
  });
};

module.exports.uploadpngfilecontent = (tr_guid, ref_id, file_content, bucket, key, callback) => {
  let params = {
    Bucket: bucket, // pass your bucket name
    Key: key, // file will be saved as testBucket/contacts.csv
    Body: file_content,
    ContentEncoding: 'base64',
    ContentType: 'image/png',
  };
  s3.upload(params, function (_s3_err, data) {
    if (_s3_err) {
      LOGGER.error(tr_guid, ref_id, '[S3 Helper] uploadjson()', '', '_s3_err :: ' + JSON.stringify(_s3_err));
      callback(_s3_err, null);
    } else {
      LOGGER.log(tr_guid, ref_id, '[S3 Helper] uploadjson()', 'data :: ' + JSON.stringify(data));
      callback(null, data);
    }
  });
};
