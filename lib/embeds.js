const Discord = require("discord.js");
const error = "#e62222";
const invalid = "<:invalid:606192696566218773>";
const check = "<:check:606192696561762356>";
module.exports = class Embeds {
  constructor() {}

  static noPerms(message) {
    let missingPerms = new Discord.MessageEmbed()

      .setDescription(invaild + " You don't seem to have some vital perms ಠ_ಠ")
      .setColor(error);
    message.channel.send(missingPerms);
  }

  static invalid(message) {
    let invalidUsage = new Discord.MessageEmbed()

      .setDescription(invalid + " Invalid Usage of command ಠ_ಠ")
      .setColor(error);
    message.channel.send(invalidUsage);
  }

  static immortal(message) {
    let immortalUser = new Discord.MessageEmbed()

      .setDescription(
        invalid + " The user you're trying to wham is too superior ಠ_ಠ"
      )
      .setColor(error);
    message.channel.send(immortalUser);
  }

  static eliminated(message, whammed, member) {
    let wham = new Discord.MessageEmbed()
      .setDescription(
        check +
        " " +
        member.user.username +
        " has been " +
        whammed +
        " from the server (⌐■_■)"
      )
      .setColor("#008080");
    message.channel.send(wham);
  }

  static farAndWide(message) {
    let widelol = new Discord.MessageEmbed()
      .setDescription(
        invalid + " I looked far and wide, but couldn't find that ಠ_ಠ"
      )
      .setColor(error);
    message.channel.send(widelol);
  }

  static correctUsage(message, usage) {
    let correctUsage = new Discord.MessageEmbed()
      .addField(invalid + " Invalid Usage", usage)
      .setColor(error);
    message.channel.send(correctUsage);
  }

  static cooldown(message, timeLeft) {
    let cooldownEmbed = new Discord.MessageEmbed()
      .setDescription(
        invalid +
        " Chill, wait " +
        Math.round(timeLeft) +
        " seconds before doing that again ಠ_ಠ"
      )
      .setColor(error);
    message.channel.send(cooldownEmbed);
  }

  static min(message, action, amount) {
    let minEmbed = new Discord.MessageEmbed()
      .setDescription(invalid + " Minimum " + action + " is " + amount)
      .setColor(error);
    message.channel.send(minEmbed);
  }
};