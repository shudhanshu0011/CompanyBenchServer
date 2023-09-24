const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const service_config = require("./config/service");
const db_connection = require("./helpers/db_connection");
const aws_connection = require("./helpers/awss3");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const mongoose = require("mongoose");

//  Express App setup
const app = express();
// TODO: Populate from service config
const whitelist = ['http://localhost:8080', 'http://example2.com'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

// AWS and MongoDB connection

app.use(db_connection.connect);
app.use(aws_connection.upload);

// Express session setup
// TODO: Remove this hardcoded connection
const service_ref = "123456";
const sessionStore = MongoStore.create({
  mongoUrl: `mongodb+srv://cgabhishek:A9mFYNBRtiFj5xKF@cgabhishekcluster.vnzb7o4.mongodb.net/cb-10000-${service_ref}`,
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  collectionName: "sessions",
});

app.use(
  session({
    secret: service_config.session_secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // Equals 30 days (30 days * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

// Passport Auth Setup
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("session", req.session);
  console.log("user", req.user);
  next();
});

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes

app.use("/v1/user", require("./routes/user"));

app.use("/v1/job", require("./routes/job"));

app.use("/v1/jobstatus", require("./routes/jobstatus"));

app.use("/v1/joblocation", require("./routes/joblocation"));

app.use("/v1/technology", require("./routes/technology"));

app.use("/v1/candidate", require("./routes/candidate"));

app.use("/v1/companies", require("./routes/companylist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public" + req.url));
});

// Redirect all other requests to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;
