const AWS = require('aws-sdk');

// Helpers
const service_helper = require('../helpers/service');
const LOGGER = require('../helpers/logger');

// config
const service_config = require('../config/service');
const error_config = require('../config/error_codes');

// SQS User
const sqs = new AWS.SQS({
  accessKeyId: service_config.sa_dev_key_id,
  secretAccessKey: service_config.sa_dev_secret_access_key,
  region: service_config.s3_region,
  apiVersion: '2012-11-05',
});

module.exports.send_company_message = (tr_guid, ref_id, _event_data, callback) => {
  _event_data.transaction_guid = tr_guid;
  _event_data.service_ref = ref_id;
  let params = {MessageBody: JSON.stringify(_event_data)};
  params.QueueUrl = service_config.sqs_company_queue;

  LOGGER.log(tr_guid, ref_id, '[AWS SQS Helper] send_crm_event_message()', '_event_data :: ' + JSON.stringify(_event_data) + ' params.QueueUrl :: ' + params.QueueUrl);
  sqs.sendMessage(params, (err, _sqs_res_data) => {
    if (err) {
      LOGGER.error(tr_guid, ref_id, 'SQS Helper send_crm_event_message()', error_config.crmevent.register_failed, 'Error :: ' + JSON.stringify(err));
      callback(err, null);
    } else {
      LOGGER.log(tr_guid, ref_id, 'SQS Helper send_crm_event_message()', 'Successfully added message :: ' + _sqs_res_data.MessageId);
      callback(null, _sqs_res_data);
    }
  });
};

module.exports.send_job_listing_message = (tr_guid, ref_id, _event_data, callback) => {
  _event_data.transaction_guid = tr_guid;
  _event_data.service_ref = ref_id;
  let params = {MessageBody: JSON.stringify(_event_data)};
  params.QueueUrl = service_config.sqs_job_listing_queue;

  LOGGER.log(tr_guid, ref_id, '[AWS SQS Helper] send_crm_event_message()', '_event_data :: ' + JSON.stringify(_event_data) + ' params.QueueUrl :: ' + params.QueueUrl);
  sqs.sendMessage(params, (err, _sqs_res_data) => {
    if (err) {
      LOGGER.error(tr_guid, ref_id, 'SQS Helper send_crm_event_message()', error_config.crmevent.register_failed, 'Error :: ' + JSON.stringify(err));
      callback(err, null);
    } else {
      LOGGER.log(tr_guid, ref_id, 'SQS Helper send_crm_event_message()', 'Successfully added message :: ' + _sqs_res_data.MessageId);
      callback(null, _sqs_res_data);
    }
  });
};

module.exports.send_contact_message = (tr_guid, ref_id, _event_data, callback) => {
  _event_data.transaction_guid = tr_guid;
  _event_data.service_ref = ref_id;
  let params = {MessageBody: JSON.stringify(_event_data)};
  params.QueueUrl = service_config.sqs_contact_queue;

  LOGGER.log(tr_guid, ref_id, '[AWS SQS Helper] send_contact_message()', '_event_data :: ' + JSON.stringify(_event_data) + ' params.QueueUrl :: ' + params.QueueUrl);
  sqs.sendMessage(params, (err, _sqs_res_data) => {
    if (err) {
      LOGGER.error(tr_guid, ref_id, 'SQS Helper send_contact_message()', error_config.crmevent.register_failed, 'Error :: ' + JSON.stringify(err));
      callback(err, null);
    } else {
      LOGGER.log(tr_guid, ref_id, 'SQS Helper send_contact_message()', 'Successfully added message :: ' + _sqs_res_data.MessageId);
      callback(null, _sqs_res_data);
    }
  });
};
