module.exports = {
  name: "shorten",
  description: "Shorten any URL's",
  cooldown: 5,
  args: true,
  aliases: [],
  type: "utility",
  usage: "shorten {URL} <Key Word>",

  execute(message, args) {
    const Discord = require("discord.js");
    const shorten = require("isgd");
    const Embeds = require("../lib/embeds.js");

    const sEmbed = new Discord.MessageEmbed();

    if (args.length > 2) return Embeds.invalid(message);

    if (args.length == 1) {
      shorten.shorten(args[0], function (res) {
        if (res.startsWith(`Error:`)) {
          sEmbed.setDescription("<:invalid:606192696566218773>" + " Not a well formed URL");
          sEmbed.setColor("e62222");
          return message.channel.send(sEmbed);
        }

        sEmbed.setDescription("Shortened URL " + res);
        sEmbed.setColor("RANDOM");

        return message.channel.send(sEmbed);
      });

      return;
    }

    shorten.custom(args[0], args[1], function (res) {
      if (res.startsWith(`Error:`)) {
        sEmbed.setDescription("<:invalid:606192696566218773>" + " " + res);
        sEmbed.setColor("e62222");
        return message.channel.send(sEmbed);
      }

      sEmbed.setDescription("Shortened URL " + res);
      sEmbed.setColor("RANDOM");

      return message.channel.send(sEmbed);
    });
  }
};