
module.exports = {

  /* The code block is defining an object called `customer` with four properties: `create_failed`,
  `update_failed`, `read_all_failed`, and `read_failed`. Each property is an object itself, with
  two properties: `code` and `message`. These properties store error codes and error messages
  related to customer operations in a system. */
  customer: {
    create_failed: { code: 'CB-Customer-001', message: 'Failed to Save New Customer' },
    update_failed: { code: 'CB-Customer-002', message: 'Failed to Update Customer' },
    read_all_failed: { code: 'CB-Customer-003', message: 'Failed fetch Customer(s)' },
    read_failed: { code: 'CB-Customer-004', message: 'Failed fetch Customer' },
  },

  /* The `user` property is defining an object within the module.exports object. This object
  contains four properties: `create_failed`, `update_failed`, `read_all_failed`, and
  `read_failed`. Each property is an object itself, with two properties: `code` and `message`.
  These properties store error codes and error messages related to user operations in a system. */
  user: {
    create_failed: { code: 'CB-user-001', message: 'Failed to Save New user' },
    update_failed: { code: 'CB-user-002', message: 'Failed to Update user' },
    read_all_failed: { code: 'CB-user-003', message: 'Failed fetch user(s)' },
    read_failed: { code: 'CB-user-004', message: 'Failed fetch user' },
    logout_failed: { code: 'CB-user-005', message: 'Failed to logout user' },
  },

  /* The `job` property is defining an object within the `module.exports` object. This object
  contains four properties: `create_failed`, `update_failed`, `read_all_failed`, and
  `read_failed`. Each property is an object itself, with two properties: `code` and `message`.
  These properties store error codes and error messages related to job operations in a system. */
  job: {
    create_failed: { code: 'CB-job-001', message: 'Failed to Save New job' },
    update_failed: { code: 'CB-job-002', message: 'Failed to Update job' },
    read_all_failed: { code: 'CB-job-003', message: 'Failed fetch job(s)' },
    read_failed: { code: 'CB-job-004', message: 'Failed fetch job' },
  },
  /* The `candidate: {` line is defining an object within the `module.exports` object. This object
  contains four properties: `create_failed`, `update_failed`, `read_all_failed`, and
  `read_failed`. Each property is an object itself, with two properties: `code` and `message`.
  These properties store error codes and error messages related to candidate operations in a
  system. */
  candidate: {
    create_failed: { code: 'CB-candidate-001', message: 'Failed to Save New candidate' },
    update_failed: { code: 'CB-candidate-002', message: 'Failed to Update candidate' },
    read_all_failed: { code: 'CB-candidate-003', message: 'Failed fetch candidate(s)' },
    read_failed: { code: 'CB-candidate-004', message: 'Failed fetch candidate' },
  },
  /* The `technology: {` line is defining an object within the `module.exports` object. This object
 contains four properties: `create_failed`, `update_failed`, `read_all_failed`, and
 `read_failed`. Each property is an object itself, with two properties: `code` and `message`.
 These properties store error codes and error messages related to candidate operations in a
 system. */
  technology: {
    create_failed: { code: 'CB-technology-001', message: 'Failed to Save New technology' },
    update_failed: { code: 'CB-technology-002', message: 'Failed to Update technology' },
    read_all_failed: { code: 'CB-technology-003', message: 'Failed fetch technology(s)' },
    read_failed: { code: 'CB-technology-004', message: 'Failed fetch technology' },
  },
  /* The `joblocation: {` line is defining an object within the `module.exports` object. This object
  contains four properties: `create_failed`, `update_failed`, `read_all_failed`, and
  `read_failed`. Each property is an object itself, with two properties: `code` and `message`.
  These properties store error codes and error messages related to candidate operations in a
  system. */
  joblocation: {
    create_failed: { code: 'CB-joblocation-001', message: 'Failed to Save New joblocation' },
    update_failed: { code: 'CB-joblocation-002', message: 'Failed to Update joblocation' },
    read_all_failed: { code: 'CB-joblocation-003', message: 'Failed fetch joblocation(s)' },
    read_failed: { code: 'CB-joblocation-004', message: 'Failed fetch joblocation' },
  },
  companylist: {
    create_failed: { code: 'TIQ-companyList-001', message: 'Failed to Save New companyList' },
    update_failed: { code: 'TIQ-companyList-002', message: 'Failed to Update companyList' },
    read_all_failed: { code: 'TIQ-companyList-003', message: 'Failed fetch companyList(s)' },
    read_failed: { code: 'TIQ-companyList-004', message: 'Failed fetch companyList' },
  },
  contactus: {
    create_failed: { code: 'TIQ-contactus-001', message: 'Failed to Save New contactus' },
    update_failed: { code: 'TIQ-contactus-002', message: 'Failed to Update contactus' },
    read_all_failed: { code: 'TIQ-contactus-003', message: 'Failed fetch contactus(s)' },
    read_failed: { code: 'TIQ-contactus-004', message: 'Failed fetch contactus' },
  },
};
