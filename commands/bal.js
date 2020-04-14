module.exports = {
  name: "bal",
  description: "Forgot how rich you were?",
  cooldown: 10,
  args: false,
  aliases: ["balance", "credits"],
  type: "stats",
  usage: "bal <user>",

  execute(message, args) {
    const Discord = require("discord.js");
    const Coins = require("../lib/coinsSchema.js");
    let Embeds = require("../lib/Embeds.js");

    let balEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setFooter("Stay active to gain cash", message.client.avatarURL);

    if (args.length === 0) { // Get your own balance
      var findID = message.author.id;

      balEmbed.setThumbnail(message.author.avatarURL);
      balEmbed.setTitle(message.author.username);

    } else if (args.length === 1) { // Get another members balance
      let balUser = message.mentions.users.first();
      if (!balUser) return Embeds.invalid(message);

      balEmbed.setThumbnail(balUser.avatarURL);
      balEmbed.setTitle(balUser.username);

      findID = balUser.id;
    }

    let bal = async function () {
      if (args.length < 2) {
        await Coins.findOne({
            userID: findID,
            serverID: message.guild.id
          },
          (err, res) => {
            if (err) return console.log(err);

            if (!res) {
              balEmbed.setDescription(
                "Couldn't find anything here \n\n **Emptiness**" //  --> Member hasn't sent a  message (0 credits)
              );
            } else {
              balEmbed.setDescription(
                " Total Credits: " + `\n\n**${res.bal}**` + " credits"
              );
            }
            message.channel.send(balEmbed);
          }
        );
      }
    };

    bal();
  }
};