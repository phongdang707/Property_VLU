const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var cors = require("cors");

app.use(cors());

// DB
const db = require("./config/connectDB");

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token"
  );
  next();
});

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads/propertys", express.static("./uploads/propertys"));
// Route
app.use("/api/property", require("./router/api/property/index"));
app.use("/api/fullContract", require("./router/api/fullContract/index"));
app.use("/api/installementContract", require("./router/api/installementContract/index"));

// CROS

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app running port ${port}`);
});
app.use(function(err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});
