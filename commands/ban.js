module.exports = {
  name: "ban",
  description: "Someone REALLY ",
  cooldown: 0,
  args: true,
  aliases: ["wham"],
  type: "moderation",
  usage: "ban {user} <reason>",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/embeds.js");

    let bUser = message.mentions.members.first();
    if (!bUser) return Embeds.farAndWide(message);

    if (bUser.hasPermission("BAN_MEMBERS")) return Embeds.immortal(message); // --> You can't kick other mods

    let bReason = args.join(" ").slice(22); // --> slices userID

    message.guild.member(bUser).ban(bReason);

    return Embeds.eliminated(message, "banned", bUser);
  }
};