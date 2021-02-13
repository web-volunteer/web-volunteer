const { Schema, model } = require("mongoose");

const ownerSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

const Owner = model("Owner", ownerSchema);

module.exports = Owner;