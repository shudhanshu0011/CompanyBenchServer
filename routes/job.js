const express 		= require('express');
const router 		= express.Router();
const axios       	= require('axios');

const service_config 	= require('../config/service');
const error_config 		= require('../config/error_codes');
const service_helper 	= require('../helpers/service');

const LOGGER 			= require('../helpers/logger');

const jobModel 		= require('../models/job');

// -- Create new job
// Request JSON
// {
// 	job:{
// 	}
// }
router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _job_json = new jobModel(req.body.job) // TODO populate job json
	_job_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id,'[job Controller] create()','_job_json :: ' + JSON.stringify(_job_json))

	_job_json.save().then(_job_json_save_res=>{
		LOGGER.log(tr_guid, ref_id,'[job Controller] create()','_job_json_save_res :: ' + JSON.stringify(_job_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{job: _job_json_save_res}));
	}).catch(_job_json_save_err=>{
		LOGGER.error(tr_guid,ref_id,'[job Controller] create()', error_config.job.create_failed.code,_job_json_save_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.create_failed));
	})
});

// -- Update existing job by Guid
// Request JSON
// {
// 	job:{
// 	}
// }
router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const job_guid = req.params.guid
	let job_json = req.body.job

	jobModel.updateOne(	{guid:job_guid},
							job_json // TODO populate job json
                      	).then(_job_update_res=>{
		jobModel.findOne({guid: job_guid}).then(_job_find_res=>{
			LOGGER.log(tr_guid, ref_id,'[job Controller] update()','_job_find_res :: ' + JSON.stringify(_job_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id,{job: _job_find_res}));
		})
	}).catch(_job_update_err=>{
		LOGGER.error(tr_guid,ref_id,'[job Controller] update()', error_config.job.update_failed.code,_job_update_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.update_failed));
	})
});

// -- Fetch all existing job(s)
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "jobs": [
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

	jobModel.find({}).then(_job_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[job Controller] findAll()','_job_find_res :: ' + JSON.stringify(_job_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{jobs: _job_find_res}));
	}).catch(_job_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[job Controller] findAll()', error_config.job.read_all_failed.code,_job_find_err)
    res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	jobModel.find({status:req.params.statuscd}).then(_job_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[job Controller] findByStatus()','_job_find_res :: ' + JSON.stringify(_job_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{jobs: _job_find_res}));
	}).catch(_job_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[job Controller] findByStatus()', error_config.job.read_all_failed.code,_job_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.read_all_failed));
	})
});

// -- Fetch existing job by Guid
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "job": {
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

	jobModel.findOne({guid:req.params.guid}).then(_job_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[job Controller] findByGuid()','_job_find_res :: ' + JSON.stringify(_job_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{job: _job_find_res}));
	}).catch(_job_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[job Controller] findByGuid()', error_config.job.read_failed.code,_job_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.job.read_failed));
	})
});

module.exports = router;
