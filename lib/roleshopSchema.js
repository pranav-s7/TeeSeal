const mongoose = require("mongoose");

const Roleshop = mongoose.Schema({
  serverID: String,
  roleID: String,
  name: String,
  level: Number
});

module.exports = mongoose.model("Roleshop", Roleshop);
