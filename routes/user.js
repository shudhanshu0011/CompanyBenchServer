const express 		= require('express');
const router 		= express.Router();
const axios       	= require('axios');

const service_config 	= require('../config/service');
const error_config 		= require('../config/error_codes');
const service_helper 	= require('../helpers/service');

const LOGGER 			= require('../helpers/logger');

const userModel 		= require('../models/user');

// -- Create new user
// Request JSON
// {
// 	user:{
// 	}
// }
router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _user_json = new userModel(req.body) // TODO populate user json
	_user_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id,'[user Controller] create()','_user_json :: ' + JSON.stringify(_user_json))

	_user_json.save().then(_user_json_save_res=>{
		LOGGER.log(tr_guid, ref_id,'[user Controller] create()','_user_json_save_res :: ' + JSON.stringify(_user_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{user: _user_json_save_res}));
	}).catch(_user_json_save_err=>{
		LOGGER.error(tr_guid,ref_id,'[user Controller] create()', error_config.user.create_failed.code,_user_json_save_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.user.create_failed));
	})
});

// -- Update existing user by Guid
// Request JSON
// {
// 	user:{
// 	}
// }
router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const user_guid = req.params.guid
	let user_json = req.body.user
	userModel.updateOne(	{guid:user_guid},
							user_json // TODO populate user json
                      	).then(_user_update_res=>{
		userModel.findOne({guid: user_guid}).then(_user_find_res=>{
			LOGGER.log(tr_guid, ref_id,'[user Controller] update()','_user_find_res :: ' + JSON.stringify(_user_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id,{user: _user_find_res}));
		})
	}).catch(_user_update_err=>{
		LOGGER.error(tr_guid,ref_id,'[user Controller] update()', error_config.user.update_failed.code,_user_update_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.user.update_failed));
	})
});

// -- Fetch all existing user(s)
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "users": [
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

	userModel.find({}).then(_user_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[user Controller] findAll()','_user_find_res :: ' + JSON.stringify(_user_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{users: _user_find_res}));
	}).catch(_user_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[user Controller] findAll()', error_config.user.read_all_failed.code,_user_find_err)
    res.send(service_helper.error_res(tr_guid, ref_id, error_config.user.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	userModel.find({status:req.params.statuscd}).then(_user_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[user Controller] findByStatus()','_user_find_res :: ' + JSON.stringify(_user_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{users: _user_find_res}));
	}).catch(_user_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[user Controller] findByStatus()', error_config.user.read_all_failed.code,_user_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.user.read_all_failed));
	})
});

// -- Fetch existing user by Guid
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "user": {
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

	userModel.findOne({guid:req.params.guid}).then(_user_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[user Controller] findByGuid()','_user_find_res :: ' + JSON.stringify(_user_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{user: _user_find_res}));
	}).catch(_user_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[user Controller] findByGuid()', error_config.user.read_failed.code,_user_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.user.read_failed));
	})
});

module.exports = router;
