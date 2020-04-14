module.exports = {
  name: "level",
  description: "Check your level for this server",
  cooldown: 5,
  args: false,
  aliases: ["experience"],
  type: "stats",
  usage: "level <user>",

  execute(message, args) {
    async function findLevel() {
      const Discord = require("discord.js");
      const Coins = require("../lib/coinsSchema.js");
      const Embeds = require("../lib/embeds.js");
      const levelEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter("Stay active to gain xp");

      // formulae || xp req = cur level * 9 + 27 || const getXP = Math.floor(args[0] * 9 + 27)

      // formulae || cur level = (xp req / 9) - 27 || const getXP = Math.floor(args[0] / 9 - 3)

      if (args.length > 1) {
        return Embeds.invalid(message);
      }

      let target = message.mentions.users.first() || message.author;

      let getXP = await Coins.findOne({
        userID: target.id,
        serverID: message.guild.id
      }).catch(err => {
        console.log(err);
      });

      if (target.bot) { // --> Unfortunately bots are excluded
        botEmbed = new Discord.RichEmbed()
          .setColor("#e62222")
          .setDescription(
            `<:invalid:606192696566218773> ${target.username} is not a user`
          );

        return message.channel.send(botEmbed);
      }

      if (!getXP) {
        await Coins.create({
          userID: message.author.id,
          serverID: message.guild.id,
          bal: 0,
          level: 0,
          xp: 0
        });
      }

      let totalXP = 0;

      if (getXP.level > 0) {
        for (i = 0; i < getXP.level; i++) {
          totalXP += i * 9 + 27;
        }
      } else {
        totalXP += getXP.level * 9 + 27;
      }

      let nextXP = totalXP;

      levelEmbed.setTitle(target.username);
      levelEmbed.setDescription(`Current Status:\n\n Level **${getXP.level}**`);
      levelEmbed.setFooter(`Next Level: ${getXP.xp}/${totalXP}`);
      levelEmbed.setThumbnail(target.avatarURL());

      return message.channel.send(levelEmbed);
    }

    findLevel();
  }
};