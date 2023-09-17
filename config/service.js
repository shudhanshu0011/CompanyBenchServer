/* In this JavaScript code, `module.exports` is used to export an object that contains various
configuration settings. These settings include: */
module.exports = {
  account_database_uri:
    "mongodb+srv://cgabhishek:A9mFYNBRtiFj5xKF@cgabhishekcluster.vnzb7o4.mongodb.net/cb-10000",
  master_database_uri:
    "mongodb+srv://cgabhishek:A9mFYNBRtiFj5xKF@cgabhishekcluster.vnzb7o4.mongodb.net/cb-master-10000",
  event_database_uri:
    "mongodb+srv://<username>:<password>@<mongo-cluster-url>/tiq-event-<instance-id>",
  public_database_uri:
    "mongodb+srv://cgabhishek:A9mFYNBRtiFj5xKF@cgabhishekcluster.vnzb7o4.mongodb.net/",

  secret: "Talent1Q$ecret",
  guid_format: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
  uid_format: "xxxxxxxx",

  log_level: "DEBUG",

  // AWS account details
  s3_access_key_id: "AKIA4F4LQOLC7DPK5A7K",
  s3_secret_access_key: "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",
  s3_region: "ap-south-1",

  // session secrets
  session_secret: "kjabdkfbkdbeudcbdq352twrt56435235r2543fr",
};
