const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

const Owner = model("Owner", userSchema);

module.exports = Owner;