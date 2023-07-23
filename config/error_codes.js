module.exports = {
    customer: {
        create_failed: {code: 'CB-Customer-001', message: 'Failed to Save New Customer'},
        update_failed: {code: 'CB-Customer-002', message: 'Failed to Update Customer'},
        read_all_failed: {code: 'CB-Customer-003', message: 'Failed fetch Customer(s)'},
        read_failed: {code: 'CB-Customer-004', message: 'Failed fetch Customer'},
      },
      user: {
        create_failed: {code: 'CB-user-001', message: 'Failed to Save New user'},
        update_failed: {code: 'CB-user-002', message: 'Failed to Update user'},
        read_all_failed: {code: 'CB-user-003', message: 'Failed fetch user(s)'},
        read_failed: {code: 'CB-user-004', message: 'Failed fetch user'},
      }
};
