const express = require('express');
const router = express.Router();
const service_helper = require('../helpers/service');
const jobLocationResponse = require('../config/job_location')

const LOGGER = require('../helpers/logger');

router.get("/", async (req, res) => {
	const tr_guid = req.headers.transaction_guid;
	const ref_id = req.headers.service_ref;
	LOGGER.log(tr_guid, ref_id, '[jobStatus Controller] findAllJobLocationCode()', '_jobLocationCode_find_res :: ' + JSON.stringify(jobLocationResponse));
	res.send(service_helper.success_res(tr_guid, ref_id, { jobs: jobLocationResponse }));
});
module.exports = router;
