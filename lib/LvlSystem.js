const User = require("../lib/coinsSchema.js");
const cooldownHelper = require("./cooldowns.js");
const Discord = require("discord.js");
const roleshop = require("../lib/roleshopSchema.js");

async function xpCooldown(message) {
  if (await cooldownHelper(message.author.id, "level", 300000)) {
    const user = await User.findOne({
      userID: message.author.id
    });

    if (!user) {
      await User.create({
        userID: message.author.id,
        serverID: message.guild.id,
        bal: 0,
        xp: 3,
        level: 0
      });
      return;
    } else {
      let totalXP = 0;

      if (user.level > 0) {
        for (i = 0; i < user.level; i++) {
          totalXP += i * 9 + 27;
        }
      } else {
        totalXP += user.level * 9 + 27;
      }

      if (user.xp + 3 >= totalXP) {
        let levelUp = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(message.author.username)
          .setDescription("LEVEL UP 🎉\n\n Current Level: " + user.level)
          .setFooter("Stay active to gain XP")
          .setThumbnail(message.author.avatarURL);

        user.level++;
        user.xp = 0;

        let mapped = roleshop.map(role => role.level)


        message.channel.send(levelUp);
      }

      user.xp += 3;
      user.save();
    }
  } else {
    return;
  }
}

module.exports = xpCooldown;