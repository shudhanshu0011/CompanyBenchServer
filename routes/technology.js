const express 		= require('express');
const router 		= express.Router();
const axios       	= require('axios');

const service_config 	= require('../config/service');
const error_config 		= require('../config/error_codes');
const service_helper 	= require('../helpers/service');

const LOGGER 			= require('../helpers/logger');

const technologyModel 		= require('../models/technology');

// -- Create new technology
// Request JSON
// {
// 	technology:{
// 	}
// }
router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _technology_json = new technologyModel(req.body.technology) // TODO populate technology json
	_technology_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id,'[technology Controller] create()','_technology_json :: ' + JSON.stringify(_technology_json))

	_technology_json.save().then(_technology_json_save_res=>{
		LOGGER.log(tr_guid, ref_id,'[technology Controller] create()','_technology_json_save_res :: ' + JSON.stringify(_technology_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{technology: _technology_json_save_res}));
	}).catch(_technology_json_save_err=>{
		LOGGER.error(tr_guid,ref_id,'[technology Controller] create()', error_config.technology.create_failed.code,_technology_json_save_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.create_failed));
	})
});

// -- Update existing technology by Guid
// Request JSON
// {
// 	technology:{
// 	}
// }
router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const technology_guid = req.params.guid
	let technology_json = req.body.technology

	technologyModel.updateOne(	{guid:technology_guid},
							technology_json // TODO populate technology json
                      	).then(_technology_update_res=>{
		technologyModel.findOne({guid: technology_guid}).then(_technology_find_res=>{
			LOGGER.log(tr_guid, ref_id,'[technology Controller] update()','_technology_find_res :: ' + JSON.stringify(_technology_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id,{technology: _technology_find_res}));
		})
	}).catch(_technology_update_err=>{
		LOGGER.error(tr_guid,ref_id,'[technology Controller] update()', error_config.technology.update_failed.code,_technology_update_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.update_failed));
	})
});

// -- Fetch all existing technology(s)
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "technologys": [
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

	technologyModel.find({}).then(_technology_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[technology Controller] findAll()','_technology_find_res :: ' + JSON.stringify(_technology_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{technologys: _technology_find_res}));
	}).catch(_technology_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[technology Controller] findAll()', error_config.technology.read_all_failed.code,_technology_find_err)
    res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	technologyModel.find({status:req.params.statuscd}).then(_technology_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[technology Controller] findByStatus()','_technology_find_res :: ' + JSON.stringify(_technology_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{technologys: _technology_find_res}));
	}).catch(_technology_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[technology Controller] findByStatus()', error_config.technology.read_all_failed.code,_technology_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.read_all_failed));
	})
});

// -- Fetch existing technology by Guid
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "technology": {
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

	technologyModel.findOne({guid:req.params.guid}).then(_technology_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[technology Controller] findByGuid()','_technology_find_res :: ' + JSON.stringify(_technology_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{technology: _technology_find_res}));
	}).catch(_technology_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[technology Controller] findByGuid()', error_config.technology.read_failed.code,_technology_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.technology.read_failed));
	})
});

module.exports = router;
