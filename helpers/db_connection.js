const mongoose = require('mongoose');

const service_config = require('../config/service');
const error_config = require('../config/error_codes');
const logger_helper = require('../helpers/logger');

module.exports.connect = (req, res, next) => {
  let tr_guid = req.headers.transaction_guid || '';
  let ref_id = req.headers.service_ref || req.query.service_ref || '';
  logger_helper.log(tr_guid, ref_id, '[DB Helper] switch_acc_db', 'ref_id :: ' + ref_id);
  logger_helper.log(tr_guid, ref_id, '[DB Helper] switch_acc_db', 'req.path :: ' + req.path);
  logger_helper.log(tr_guid, ref_id, '[DB Helper] switch_acc_db', 'req.headers :: ' + JSON.stringify(req.headers));
  logger_helper.log(tr_guid, ref_id, '[DB Helper] switch_acc_db', 'req.body :: ' + JSON.stringify(req.body));

  if (ref_id.length > 0) {
    if (ref_id.split('-')[1] == 'ind') {
      // individual account
      mongoose
        .connect(service_config.public_database_uri + '?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          next();
        })
        .catch((err) => {
          logger_helper.error(tr_guid, ref_id, '[DB Helper] switch_acc_db', '', 'err :: ' + err.message);
          mongoose.connection.close();

          logger_helper.log(tr_guid, ref_id, '[DB Helper] switch_acc_db', '>> [IND] Connection retrying');
          mongoose
            .connect(service_config.public_database_uri + '?retryWrites=true&w=majority', {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            })
            .then(() => {
              next();
            })
            .catch((err) => {
              logger_helper.error(tr_guid, ref_id, '[DB Helper] switch_acc_db', '', 'err :: ' + err.message);
              logger_helper.log(tr_guid, ref_id, '[DB Helper] switch_acc_db', '>> [IND] Connection retrying failed');
              mongoose.connection.close();
            })
            .finally(() => {});
        })
        .finally(() => {});
    } else {
      // enterprise account
      mongoose
        .connect(service_config.account_database_uri + '-' + ref_id.split('-')[0] + '?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          next();
        })
        .catch((err) => {
          logger_helper.error(tr_guid, ref_id, '[DB Helper] switch_acc_db', '', 'err :: ' + err.message);
          mongoose.connection.close();

          logger_helper.log(tr_guid, ref_id, '[DB Helper] switch_acc_db', '>> [ENT] Connection retrying');
          mongoose
            .connect(service_config.account_database_uri + '-' + ref_id.split('-')[0] + '?retryWrites=true&w=majority', {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            })
            .then(() => {
              next();
            })
            .catch((err) => {
              logger_helper.error(tr_guid, ref_id, '[DB Helper] switch_acc_db', '', 'err :: ' + err.message);
              logger_helper.log(tr_guid, ref_id, '[DB Helper] switch_acc_db', '>> [ENT] Connection retrying failed');
              mongoose.connections.close();
            })
            .finally(() => {});
        })
        .finally(() => {});
    }
  } else {
    next();
  }
};
