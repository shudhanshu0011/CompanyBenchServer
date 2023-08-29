const express = require('express');
const router = express.Router();
const axios = require('axios');

const service_config = require('../config/service');
const error_config = require('../config/error_codes');
const service_helper = require('../helpers/service');

const LOGGER = require('../helpers/logger');

const technologyModel = require('../models/technology');


router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _technology_json = new technologyModel(req.body) // TODO populate technology json
	_technology_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id, '[technology Controller] create()', '_technology_json :: ' + JSON.stringify(_technology_json))

	_technology_json.save().then(_technology_json_save_res => {
		LOGGER.log(tr_guid, ref_id, '[technology Controller] create()', '_technology_json_save_res :: ' + JSON.stringify(_technology_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { technology: _technology_json_save_res }));
	}).catch(_technology_json_save_err => {
		LOGGER.error(tr_guid, ref_id, '[technology Controller] create()', error_config.technology.create_failed.code, _technology_json_save_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.create_failed));
	})
});


router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const technology_guid = req.params.guid
	let technology_json = req.body.technology

	technologyModel.updateOne({ guid: technology_guid },
		technology_json // TODO populate technology json
	).then(_technology_update_res => {
		technologyModel.findOne({ guid: technology_guid }).then(_technology_find_res => {
			LOGGER.log(tr_guid, ref_id, '[technology Controller] update()', '_technology_find_res :: ' + JSON.stringify(_technology_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id, { technology: _technology_find_res }));
		})
	}).catch(_technology_update_err => {
		LOGGER.error(tr_guid, ref_id, '[technology Controller] update()', error_config.technology.update_failed.code, _technology_update_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.update_failed));
	})
});


router.get("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	technologyModel.find({}).then(_technology_find_res => {
		LOGGER.log(tr_guid, ref_id, '[technology Controller] findAll()', '_technology_find_res :: ' + JSON.stringify(_technology_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { technologys: _technology_find_res }));
	}).catch(_technology_find_err => {
		LOGGER.error(tr_guid, ref_id, '[technology Controller] findAll()', error_config.technology.read_all_failed.code, _technology_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	technologyModel.find({ status: req.params.statuscd }).then(_technology_find_res => {
		LOGGER.log(tr_guid, ref_id, '[technology Controller] findByStatus()', '_technology_find_res :: ' + JSON.stringify(_technology_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { technologys: _technology_find_res }));
	}).catch(_technology_find_err => {
		LOGGER.error(tr_guid, ref_id, '[technology Controller] findByStatus()', error_config.technology.read_all_failed.code, _technology_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.read_all_failed));
	})
});


router.get("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	technologyModel.findOne({ guid: req.params.guid }).then(_technology_find_res => {
		LOGGER.log(tr_guid, ref_id, '[technology Controller] findByGuid()', '_technology_find_res :: ' + JSON.stringify(_technology_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { technology: _technology_find_res }));
	}).catch(_technology_find_err => {
		LOGGER.error(tr_guid, ref_id, '[technology Controller] findByGuid()', error_config.technology.read_failed.code, _technology_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.read_failed));
	})
});

module.exports = router;
