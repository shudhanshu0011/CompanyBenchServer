const express = require('express');
const router = express.Router();
const axios = require('axios');

const service_config = require('../config/service');
const error_config = require('../config/error_codes');
const service_helper = require('../helpers/service');

const LOGGER = require('../helpers/logger');

const joblocationModel = require('../models/joblocation');

router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _joblocation_json = new joblocationModel(req.body) // TODO populate joblocation json
	_joblocation_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id, '[joblocation Controller] create()', '_joblocation_json :: ' + JSON.stringify(_joblocation_json))

	_joblocation_json.save().then(_joblocation_json_save_res => {
		LOGGER.log(tr_guid, ref_id, '[joblocation Controller] create()', '_joblocation_json_save_res :: ' + JSON.stringify(_joblocation_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { joblocation: _joblocation_json_save_res }));
	}).catch(_joblocation_json_save_err => {
		LOGGER.error(tr_guid, ref_id, '[joblocation Controller] create()', error_config.joblocation.create_failed.code, _joblocation_json_save_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.create_failed));
	})
});


router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const joblocation_guid = req.params.guid
	let joblocation_json = req.body.joblocation

	joblocationModel.updateOne({ guid: joblocation_guid },
		joblocation_json // TODO populate joblocation json
	).then(_joblocation_update_res => {
		joblocationModel.findOne({ guid: joblocation_guid }).then(_joblocation_find_res => {
			LOGGER.log(tr_guid, ref_id, '[joblocation Controller] update()', '_joblocation_find_res :: ' + JSON.stringify(_joblocation_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id, { joblocation: _joblocation_find_res }));
		})
	}).catch(_joblocation_update_err => {
		LOGGER.error(tr_guid, ref_id, '[joblocation Controller] update()', error_config.joblocation.update_failed.code, _joblocation_update_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.update_failed));
	})
});


router.get("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	joblocationModel.find({}).then(_joblocation_find_res => {
		LOGGER.log(tr_guid, ref_id, '[joblocation Controller] findAll()', '_joblocation_find_res :: ' + JSON.stringify(_joblocation_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { joblocations: _joblocation_find_res }));
	}).catch(_joblocation_find_err => {
		LOGGER.error(tr_guid, ref_id, '[joblocation Controller] findAll()', error_config.joblocation.read_all_failed.code, _joblocation_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	joblocationModel.find({ status: req.params.statuscd }).then(_joblocation_find_res => {
		LOGGER.log(tr_guid, ref_id, '[joblocation Controller] findByStatus()', '_joblocation_find_res :: ' + JSON.stringify(_joblocation_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { joblocations: _joblocation_find_res }));
	}).catch(_joblocation_find_err => {
		LOGGER.error(tr_guid, ref_id, '[joblocation Controller] findByStatus()', error_config.joblocation.read_all_failed.code, _joblocation_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.read_all_failed));
	})
});

router.get("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	joblocationModel.findOne({ guid: req.params.guid }).then(_joblocation_find_res => {
		LOGGER.log(tr_guid, ref_id, '[joblocation Controller] findByGuid()', '_joblocation_find_res :: ' + JSON.stringify(_joblocation_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { joblocation: _joblocation_find_res }));
	}).catch(_joblocation_find_err => {
		LOGGER.error(tr_guid, ref_id, '[joblocation Controller] findByGuid()', error_config.joblocation.read_failed.code, _joblocation_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.read_failed));
	})
});

module.exports = router;
