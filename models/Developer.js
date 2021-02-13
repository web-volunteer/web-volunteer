const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

const Developer = model("Developer", userSchema);

module.exports = Developer;