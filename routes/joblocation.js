const express 		= require('express');
const router 		= express.Router();
const axios       	= require('axios');

const service_config 	= require('../config/service');
const error_config 		= require('../config/error_codes');
const service_helper 	= require('../helpers/service');

const LOGGER 			= require('../helpers/logger');

const joblocationModel 		= require('../models/joblocation');

// -- Create new joblocation
// Request JSON
// {
// 	joblocation:{
// 	}
// }
router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _joblocation_json = new joblocationModel(req.body.joblocation) // TODO populate joblocation json
	_joblocation_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id,'[joblocation Controller] create()','_joblocation_json :: ' + JSON.stringify(_joblocation_json))

	_joblocation_json.save().then(_joblocation_json_save_res=>{
		LOGGER.log(tr_guid, ref_id,'[joblocation Controller] create()','_joblocation_json_save_res :: ' + JSON.stringify(_joblocation_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{joblocation: _joblocation_json_save_res}));
	}).catch(_joblocation_json_save_err=>{
		LOGGER.error(tr_guid,ref_id,'[joblocation Controller] create()', error_config.joblocation.create_failed.code,_joblocation_json_save_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.create_failed));
	})
});

// -- Update existing joblocation by Guid
// Request JSON
// {
// 	joblocation:{
// 	}
// }
router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const joblocation_guid = req.params.guid
	let joblocation_json = req.body.joblocation

	joblocationModel.updateOne(	{guid:joblocation_guid},
							joblocation_json // TODO populate joblocation json
                      	).then(_joblocation_update_res=>{
		joblocationModel.findOne({guid: joblocation_guid}).then(_joblocation_find_res=>{
			LOGGER.log(tr_guid, ref_id,'[joblocation Controller] update()','_joblocation_find_res :: ' + JSON.stringify(_joblocation_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id,{joblocation: _joblocation_find_res}));
		})
	}).catch(_joblocation_update_err=>{
		LOGGER.error(tr_guid,ref_id,'[joblocation Controller] update()', error_config.joblocation.update_failed.code,_joblocation_update_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.update_failed));
	})
});

// -- Fetch all existing joblocation(s)
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "joblocations": [
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

	joblocationModel.find({}).then(_joblocation_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[joblocation Controller] findAll()','_joblocation_find_res :: ' + JSON.stringify(_joblocation_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{joblocations: _joblocation_find_res}));
	}).catch(_joblocation_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[joblocation Controller] findAll()', error_config.joblocation.read_all_failed.code,_joblocation_find_err)
    res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	joblocationModel.find({status:req.params.statuscd}).then(_joblocation_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[joblocation Controller] findByStatus()','_joblocation_find_res :: ' + JSON.stringify(_joblocation_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{joblocations: _joblocation_find_res}));
	}).catch(_joblocation_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[joblocation Controller] findByStatus()', error_config.joblocation.read_all_failed.code,_joblocation_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.read_all_failed));
	})
});

// -- Fetch existing joblocation by Guid
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "joblocation": {
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

	joblocationModel.findOne({guid:req.params.guid}).then(_joblocation_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[joblocation Controller] findByGuid()','_joblocation_find_res :: ' + JSON.stringify(_joblocation_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{joblocation: _joblocation_find_res}));
	}).catch(_joblocation_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[joblocation Controller] findByGuid()', error_config.joblocation.read_failed.code,_joblocation_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.joblocation.read_failed));
	})
});

module.exports = router;
