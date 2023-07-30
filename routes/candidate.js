const express = require('express');
const router = express.Router();
const axios = require('axios');

const service_config = require('../config/service');
const error_config = require('../config/error_codes');
const service_helper = require('../helpers/service');

const LOGGER = require('../helpers/logger');

const candidateModel = require('../models/candidate');

// -- Create new candidate
// Request JSON
// {
// 	candidate:{
// 	}
// }
router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _candidate_json = new candidateModel(req.body) // TODO populate candidate json
	_candidate_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id, '[candidate Controller] create()', '_candidate_json :: ' + JSON.stringify(_candidate_json))

	_candidate_json.save().then(_candidate_json_save_res => {
		LOGGER.log(tr_guid, ref_id, '[candidate Controller] create()', '_candidate_json_save_res :: ' + JSON.stringify(_candidate_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { candidate: _candidate_json_save_res }));
	}).catch(_candidate_json_save_err => {
		LOGGER.error(tr_guid, ref_id, '[candidate Controller] create()', error_config.candidate.create_failed.code, _candidate_json_save_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.candidate.create_failed));
	})
});

// -- Update existing candidate by Guid
// Request JSON
// {
// 	candidate:{
// 	}
// }
router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const candidate_guid = req.params.guid
	let candidate_json = req.body.candidate

	candidateModel.updateOne({ guid: candidate_guid },
		candidate_json // TODO populate candidate json
	).then(_candidate_update_res => {
		candidateModel.findOne({ guid: candidate_guid }).then(_candidate_find_res => {
			LOGGER.log(tr_guid, ref_id, '[candidate Controller] update()', '_candidate_find_res :: ' + JSON.stringify(_candidate_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id, { candidate: _candidate_find_res }));
		})
	}).catch(_candidate_update_err => {
		LOGGER.error(tr_guid, ref_id, '[candidate Controller] update()', error_config.candidate.update_failed.code, _candidate_update_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.candidate.update_failed));
	})
});

// -- Fetch all existing candidate(s)
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "candidates": [
//             {
//                 "_id": "638051314e60f00e020c5e45",
//                 "guid": "1d39b4d0-0446-4f9d-a905-8de9363a2f01",
//                 "createdAt": "2022-11-25T05:22:57.694Z",
//                 "updatedAt": "2022-11-25T05:22:57.694Z",
//                 "__v": 0
//             },
// 						...
//         ]
//     }
// }
router.get("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	candidateModel.find({}).then(_candidate_find_res => {
		LOGGER.log(tr_guid, ref_id, '[candidate Controller] findAll()', '_candidate_find_res :: ' + JSON.stringify(_candidate_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { candidates: _candidate_find_res }));
	}).catch(_candidate_find_err => {
		LOGGER.error(tr_guid, ref_id, '[candidate Controller] findAll()', error_config.candidate.read_all_failed.code, _candidate_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.candidate.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	candidateModel.find({ status: req.params.statuscd }).then(_candidate_find_res => {
		LOGGER.log(tr_guid, ref_id, '[candidate Controller] findByStatus()', '_candidate_find_res :: ' + JSON.stringify(_candidate_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { candidates: _candidate_find_res }));
	}).catch(_candidate_find_err => {
		LOGGER.error(tr_guid, ref_id, '[candidate Controller] findByStatus()', error_config.candidate.read_all_failed.code, _candidate_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.candidate.read_all_failed));
	})
});

// -- Fetch existing candidate by Guid
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "candidate": {
//             "_id": "638051314e60f00e020c5e45",
//             "guid": "1d39b4d0-0446-4f9d-a905-8de9363a2f01",
//             "createdAt": "2022-11-25T05:22:57.694Z",
//             "updatedAt": "2022-11-25T05:22:57.694Z",
//             "__v": 0
//         }
//     }
// }
router.get("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	candidateModel.findOne({ guid: req.params.guid }).then(_candidate_find_res => {
		LOGGER.log(tr_guid, ref_id, '[candidate Controller] findByGuid()', '_candidate_find_res :: ' + JSON.stringify(_candidate_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { candidate: _candidate_find_res }));
	}).catch(_candidate_find_err => {
		LOGGER.error(tr_guid, ref_id, '[candidate Controller] findByGuid()', error_config.candidate.read_failed.code, _candidate_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.candidate.read_failed));
	})
});

router.get("/vendor/:vendorId", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	candidateModel.findOne({ vendorId: req.params.vendorId }).then(_candidate_find_res => {
		LOGGER.log(tr_guid, ref_id, '[candidate Controller] findByGuid()', '_candidate_find_res :: ' + JSON.stringify(_candidate_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id, { candidate: _candidate_find_res }));
	}).catch(_candidate_find_err => {
		LOGGER.error(tr_guid, ref_id, '[candidate Controller] findByGuid()', error_config.candidate.read_failed.code, _candidate_find_err)
		res.send(service_helper.error_res(tr_guid, ref_id, error_config.candidate.read_failed));
	})
});

module.exports = router;
