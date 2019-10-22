const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  id: Number,
  name: String,
  role: String
});

const DateValueSchema = new mongoose.Schema({
  personId: Number,
  data: {
    color: String,
    value: String
  }
});

const DateSchema = new mongoose.Schema({
  date: Date,
  values: [DateValueSchema]
});

const schema = mongoose.Schema({
  persons: [PersonSchema],
  dates: [DateSchema]
});

module.exports = mongoose.model("Table", schema);
