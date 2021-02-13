const { Schema, model } = require("mongoose");

const developerSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

const Developer = model("Developer", developerSchema);

module.exports = Developer;