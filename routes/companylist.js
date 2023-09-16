const express = require('express');
const router = express.Router();

const error_config = require('../config/error_codes');
const service_helper = require('../helpers/service');

const LOGGER = require('../helpers/logger');

const companyListModel = require('../models/companylist');

router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _companylist_json = new companyListModel(req.body.companylist) // TODO populate companylist json
	_companylist_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id, '[companyList Controller] create()', '_companylist_json :: ' + JSON.stringify(_companylist_json))
	// need to be used for bulk insert, uncomment the code and use the same
	//companyListModel.insertMany(req.body).then(_companylist_json_save_res => {
	_companylist_json.save().then(_companylist_json_save_res => {
		LOGGER.log(tr_guid, ref_id, '[companyList Controller] create()', '_companylist_json_save_res :: ' + JSON.stringify(_companylist_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { companylist: _companylist_json_save_res }));
	}).catch(_companylist_json_save_err => {
		LOGGER.error(tr_guid, ref_id, '[companyList Controller] create()', error_config.companylist.create_failed.code, _companylist_json_save_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.companylist.create_failed));
	})
});

router.get("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	companyListModel.find({}).then(_companylist_find_res => {
		LOGGER.log(tr_guid, ref_id, '[companyList Controller] findAll()', '_companylist_find_res :: ' + JSON.stringify(_companylist_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { companylists: _companylist_find_res }));
	}).catch(_companylist_find_err => {
		LOGGER.error(tr_guid, ref_id, '[companyList Controller] findAll()', error_config.companylist.read_all_failed.code, _companylist_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.companylist.read_all_failed));
	})
});


module.exports = router;
