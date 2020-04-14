module.exports = {
  name: "kick",
  description: "Someone ignoring the rules too often?",
  cooldown: 0,
  args: true,
  aliases: ["boot"],
  type: "moderation",
  usage: "kick {user} <reason>",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/embeds.js");

    let kUser = message.mentions.members.first();
    if (!kUser) return Embeds.farAndWide(message);

    if (kUser.hasPermission("KICK_MEMBERS")) return Embeds.immortal(message); // --> Can't kick other mod's

    let kReason = args.join(" ").slice(22); // --> Remove useriD

    message.guild.member(kUser).kick(kReason);

    return Embeds.eliminated(message, "kicked", kUser);
  }
};