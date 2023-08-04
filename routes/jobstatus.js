const express = require('express');
const router = express.Router();
const axios = require('axios');

const service_config = require('../config/service');
const service_helper = require('../helpers/service');
const jobStatusResponse = require('../config/job_status')

const LOGGER = require('../helpers/logger');

router.get("/codes", async (req, res) => {
    const tr_guid = req.headers.transaction_guid;
    const ref_id = req.headers.service_ref;
    LOGGER.log(tr_guid, ref_id, '[jobStatus Controller] findAllJobStatusCode()', '_jobStatusCode_find_res :: ' + JSON.stringify(jobStatusResponse));
    res.send(service_helper.success_res(tr_guid, ref_id, { jobs: jobStatusResponse }));
});

module.exports = router;
