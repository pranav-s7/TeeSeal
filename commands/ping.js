module.exports = {
  name: "ping",
  description: "Test those reflexes",
  cooldown: 5,
  args: false,
  aliases: [],
  type: "utility",
  usage: "ping",

  execute(message, args) {
    const Discord = require("discord.js");

    let ping = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `**${message.author.username}**  🏓  ${Date.now() -
          message.createdTimestamp}ms`
      );

    message.channel.send(ping);
  }
};