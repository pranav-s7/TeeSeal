const mongoose = require("mongoose");

const User = mongoose.Schema({
  userID: String,
  serverID: String,
  bal: Number,
  xp: Number,
  level: Number
});

module.exports = mongoose.model("Coins", User);