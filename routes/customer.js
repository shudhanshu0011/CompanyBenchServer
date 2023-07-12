const express 		= require('express');
const router 		= express.Router();
const axios       	= require('axios');

const service_config 	= require('../config/service');
const error_config 		= require('../config/error_codes');
const service_helper 	= require('../helpers/service');

const LOGGER 			= require('../helpers/logger');

const CustomerModel 		= require('../models/customer');

// -- Create new Customer
// Request JSON
// {
// 	customer:{
// 	}
// }
router.post("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	let _customer_json = new CustomerModel(req.body.customer) // TODO populate customer json
	_customer_json.guid = service_helper.generate_guid()

	LOGGER.log(tr_guid, ref_id,'[Customer Controller] create()','_customer_json :: ' + JSON.stringify(_customer_json))

	_customer_json.save().then(_customer_json_save_res=>{
		LOGGER.log(tr_guid, ref_id,'[Customer Controller] create()','_customer_json_save_res :: ' + JSON.stringify(_customer_json_save_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{customer: _customer_json_save_res}));
	}).catch(_customer_json_save_err=>{
		LOGGER.error(tr_guid,ref_id,'[Customer Controller] create()', error_config.customer.create_failed.code,_customer_json_save_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.customer.create_failed));
	})
});

// -- Update existing Customer by Guid
// Request JSON
// {
// 	customer:{
// 	}
// }
router.post("/:guid", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	const customer_guid = req.params.guid
	let customer_json = req.body.customer

	CustomerModel.updateOne(	{guid:customer_guid},
							customer_json // TODO populate customer json
                      	).then(_customer_update_res=>{
		CustomerModel.findOne({guid: customer_guid}).then(_customer_find_res=>{
			LOGGER.log(tr_guid, ref_id,'[Customer Controller] update()','_customer_find_res :: ' + JSON.stringify(_customer_find_res))
			res.send(service_helper.success_res(tr_guid, ref_id,{customer: _customer_find_res}));
		})
	}).catch(_customer_update_err=>{
		LOGGER.error(tr_guid,ref_id,'[Customer Controller] update()', error_config.customer.update_failed.code,_customer_update_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.customer.update_failed));
	})
});

// -- Fetch all existing Customer(s)
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "customers": [
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

	CustomerModel.find({}).then(_customer_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[Customer Controller] findAll()','_customer_find_res :: ' + JSON.stringify(_customer_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{customers: _customer_find_res}));
	}).catch(_customer_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[Customer Controller] findAll()', error_config.customer.read_all_failed.code,_customer_find_err)
    res.send(service_helper.error_res(tr_guid, ref_id, error_config.customer.read_all_failed));
	})
});

router.get("/status/:statuscd", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;

	CustomerModel.find({status:req.params.statuscd}).then(_customer_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[Customer Controller] findByStatus()','_customer_find_res :: ' + JSON.stringify(_customer_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{customers: _customer_find_res}));
	}).catch(_customer_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[Customer Controller] findByStatus()', error_config.customer.read_all_failed.code,_customer_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.customer.read_all_failed));
	})
});

// -- Fetch existing Customer by Guid
// JSON Response
// {
//     "success": true,
//     "transaction_guid": "c5268dce-ec9e-487b-93ef-776c470014b4",
//     "service_ref": "ac-970ce9a8",
//     "data": {
//         "customer": {
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

	CustomerModel.findOne({guid:req.params.guid}).then(_customer_find_res=>{
		LOGGER.log(tr_guid, ref_id,'[Customer Controller] findByGuid()','_customer_find_res :: ' + JSON.stringify(_customer_find_res))
		res.send(service_helper.success_res(tr_guid, ref_id,{customer: _customer_find_res}));
	}).catch(_customer_find_err=>{
		LOGGER.error(tr_guid,ref_id,'[Customer Controller] findByGuid()', error_config.customer.read_failed.code,_customer_find_err)
    	res.send(service_helper.error_res(tr_guid, ref_id, error_config.customer.read_failed));
	})
});

module.exports = router;
