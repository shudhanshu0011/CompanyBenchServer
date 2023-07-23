
module.exports = {

    /* The code block is defining an object called `customer` with four properties: `create_failed`,
    `update_failed`, `read_all_failed`, and `read_failed`. Each property is an object itself, with
    two properties: `code` and `message`. These properties store error codes and error messages
    related to customer operations in a system. */
    customer: {
        create_failed: {code: 'CB-Customer-001', message: 'Failed to Save New Customer'},
        update_failed: {code: 'CB-Customer-002', message: 'Failed to Update Customer'},
        read_all_failed: {code: 'CB-Customer-003', message: 'Failed fetch Customer(s)'},
        read_failed: {code: 'CB-Customer-004', message: 'Failed fetch Customer'},
      },

      /* The `user` property is defining an object within the module.exports object. This object
      contains four properties: `create_failed`, `update_failed`, `read_all_failed`, and
      `read_failed`. Each property is an object itself, with two properties: `code` and `message`.
      These properties store error codes and error messages related to user operations in a system. */
      user: {
        create_failed: {code: 'CB-user-001', message: 'Failed to Save New user'},
        update_failed: {code: 'CB-user-002', message: 'Failed to Update user'},
        read_all_failed: {code: 'CB-user-003', message: 'Failed fetch user(s)'},
        read_failed: {code: 'CB-user-004', message: 'Failed fetch user'},
      },
      job: {
        create_failed: {code: 'CB-job-001', message: 'Failed to Save New job'},
        update_failed: {code: 'CB-job-002', message: 'Failed to Update job'},
        read_all_failed: {code: 'CB-job-003', message: 'Failed fetch job(s)'},
        read_failed: {code: 'CB-job-004', message: 'Failed fetch job'},
      },
      candidate: {
        create_failed: {code: 'CB-candidate-001', message: 'Failed to Save New candidate'},
        update_failed: {code: 'CB-candidate-002', message: 'Failed to Update candidate'},
        read_all_failed: {code: 'CB-candidate-003', message: 'Failed fetch candidate(s)'},
        read_failed: {code: 'CB-candidate-004', message: 'Failed fetch candidate'},
      }
};
