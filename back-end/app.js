const express = require("express");
const cors = require("cors");
const app = express();

const morgan = require("morgan");

const ApiController = require("./controllers/ApiController");

app.use(cors());
app.use(morgan("combined"));
app.use("/api", ApiController);

module.exports = app;
