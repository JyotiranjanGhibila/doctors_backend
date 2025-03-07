const { Schema, model } = require("mongoose");

const personSchema = new Schema(
  {
    name: String,
    age: Number,
    gender: String,
    mobileNumber: String
  },
  {
    versionKey: false,
  }
);

const personModel = model("Person", personSchema);
module.exports = { personModel };