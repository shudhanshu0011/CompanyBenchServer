const express = require('express');
const router = express.Router();

const service_config = require('../config/service');
const error_config = require('../config/error_codes');
const service_helper = require('../helpers/service');

const LOGGER = require('../helpers/logger');

const jobModel = require('../models/job');

// -- Create new job
// Request JSON
// {
// 	job:{
// 	}
// }
router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _job_json = new jobModel(req.body) // TODO populate job json
	_job_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id, '[job Controller] create()', '_job_json :: ' + JSON.stringify(_job_json))

	_job_json.save().then(_job_json_save_res => {
		LOGGER.log(tr_guid, ref_id, '[job Controller] create()', '_job_json_save_res :: ' + JSON.stringify(_job_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { job: _job_json_save_res }));
	}).catch(_job_json_save_err => {
		LOGGER.error(tr_guid, ref_id, '[job Controller] create()', error_config.job.create_failed.code, _job_json_save_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.create_failed));
	})
});

router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const job_guid = req.params.guid
	let job_json = req.body.job

	jobModel.updateOne({ guid: job_guid },
		job_json // TODO populate job json
	).then(_job_update_res => {
		jobModel.findOne({ guid: job_guid }).then(_job_find_res => {
			LOGGER.log(tr_guid, ref_id, '[job Controller] update()', '_job_find_res :: ' + JSON.stringify(_job_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id, { job: _job_find_res }));
		})
	}).catch(_job_update_err => {
		LOGGER.error(tr_guid, ref_id, '[job Controller] update()', error_config.job.update_failed.code, _job_update_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.update_failed));
	})
});


router.get("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const { offset = 0, limit = 10 } = req.query;
	console.log("offset and limits are ", offset, limit);
	jobModel.paginate({}, { offset: offset * limit, limit: limit }).then(_job_find_res => {
		LOGGER.log(tr_guid, ref_id, '[job Controller] findAll()', '_job_find_res :: ' + JSON.stringify(_job_find_res))
		res.send(service_helper.success_res_page(tr_guid, ref_id, { jobs: _job_find_res.docs }, _job_find_res));
	}).catch(_job_find_err => {
		LOGGER.error(tr_guid, ref_id, '[job Controller] findAll() error', error_config.job.read_all_failed.code, _job_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	jobModel.find({ status: req.params.statuscd }).then(_job_find_res => {
		LOGGER.log(tr_guid, ref_id, '[job Controller] findByStatus()', '_job_find_res :: ' + JSON.stringify(_job_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { jobs: _job_find_res }));
	}).catch(_job_find_err => {
		LOGGER.error(tr_guid, ref_id, '[job Controller] findByStatus()', error_config.job.read_all_failed.code, _job_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.read_all_failed));
	})
});


router.get("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	jobModel.findOne({ guid: req.params.guid }).then(_job_find_res => {
		LOGGER.log(tr_guid, ref_id, '[job Controller] findByGuid()', '_job_find_res :: ' + JSON.stringify(_job_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { job: _job_find_res }));
	}).catch(_job_find_err => {
		LOGGER.error(tr_guid, ref_id, '[job Controller] findByGuid()', error_config.job.read_failed.code, _job_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.read_failed));
	})
});

module.exports = router;
