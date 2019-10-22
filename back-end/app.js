const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const morgan = require("morgan");

const ApiController = require("./controllers/ApiController");

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", ApiController);

module.exports = app;
