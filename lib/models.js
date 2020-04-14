const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  Tags: mongoose.model("tags", {
    name: {
      type: String,
      unique: true
    },
    description: {
      type: String
    }
  }),

  Cooldown: mongoose.model("xpCooldown", {
    expires: {
      type: Date,
      default: Date.now()
    },
    userID: String,
    action: String
  })
};