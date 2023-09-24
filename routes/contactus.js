const express = require('express');
const router = express.Router();
const axios = require('axios');

const service_config = require('../config/service');
const error_config = require('../config/error_codes');
const service_helper = require('../helpers/service');

const LOGGER = require('../helpers/logger');

const contactusModel = require('../models/contactus');

router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _contactus_json = new contactusModel(req.body)
	_contactus_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id, '[contactus Controller] create()', '_contactus_json :: ' + JSON.stringify(_contactus_json))

	_contactus_json.save().then(_contactus_json_save_res => {
		LOGGER.log(tr_guid, ref_id, '[contactus Controller] create()', '_contactus_json_save_res :: ' + JSON.stringify(_contactus_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { contactus: _contactus_json_save_res }));
	}).catch(_contactus_json_save_err => {
		LOGGER.error(tr_guid, ref_id, '[contactus Controller] create()', error_config.contactus.create_failed.code, _contactus_json_save_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.contactus.create_failed));
	})
});


router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const contactus_guid = req.params.guid
	let contactus_json = req.body.contactus

	contactusModel.updateOne({ guid: contactus_guid },
		contactus_json // TODO populate contactus json
	).then(_contactus_update_res => {
		contactusModel.findOne({ guid: contactus_guid }).then(_contactus_find_res => {
			LOGGER.log(tr_guid, ref_id, '[contactus Controller] update()', '_contactus_find_res :: ' + JSON.stringify(_contactus_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id, { contactus: _contactus_find_res }));
		})
	}).catch(_contactus_update_err => {
		LOGGER.error(tr_guid, ref_id, '[contactus Controller] update()', error_config.contactus.update_failed.code, _contactus_update_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.contactus.update_failed));
	})
});

router.get("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	contactusModel.find({}).then(_contactus_find_res => {
		LOGGER.log(tr_guid, ref_id, '[contactus Controller] findAll()', '_contactus_find_res :: ' + JSON.stringify(_contactus_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { contactuss: _contactus_find_res }));
	}).catch(_contactus_find_err => {
		LOGGER.error(tr_guid, ref_id, '[contactus Controller] findAll()', error_config.contactus.read_all_failed.code, _contactus_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.contactus.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	contactusModel.find({ status: req.params.statuscd }).then(_contactus_find_res => {
		LOGGER.log(tr_guid, ref_id, '[contactus Controller] findByStatus()', '_contactus_find_res :: ' + JSON.stringify(_contactus_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { contactuss: _contactus_find_res }));
	}).catch(_contactus_find_err => {
		LOGGER.error(tr_guid, ref_id, '[contactus Controller] findByStatus()', error_config.contactus.read_all_failed.code, _contactus_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.contactus.read_all_failed));
	})
});


router.get("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	contactusModel.findOne({ guid: req.params.guid }).then(_contactus_find_res => {
		LOGGER.log(tr_guid, ref_id, '[contactus Controller] findByGuid()', '_contactus_find_res :: ' + JSON.stringify(_contactus_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { contactus: _contactus_find_res }));
	}).catch(_contactus_find_err => {
		LOGGER.error(tr_guid, ref_id, '[contactus Controller] findByGuid()', error_config.contactus.read_failed.code, _contactus_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.contactus.read_failed));
	})
});

module.exports = router;
