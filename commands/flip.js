module.exports = {
  name: "flip",
  description: "Momma said we shouldn't gamble :|",
  cooldown: 10,
  args: true,
  aliases: [],
  type: "economy",
  usage: "flip {heads / tails} {bet value}",

  execute(message, args) {
    async function flipCoin() {
      const Discord = require("discord.js");
      const Coins = require("../lib/coinsSchema.js");
      let flipEmbed = new Discord.MessageEmbed()
        .setTitle(message.author.username)
        .setThumbnail(message.author.avatarURL)
        .setFooter("Stay active to gain cash");
      const Embeds = require("../lib/embeds.js");

      if (args.length != 2) {
        return Embeds.invalid(message);
      }

      let arg = args[0].toLowerCase();

      if (arg === "heads" || arg === "tails") {
        let arr = ["heads", "tails"];
        let choice = arr[Math.floor(Math.random() * arr.length)]; // --> Chooses heads or tails
        let amount = args[1];

        if (isNaN(args[1])) {
          return Embeds.invalid(message);
        }

        if (amount < 20) {
          return Embeds.min(message, "amount", 20);
        }

        let value = await Coins.findOne({
          userID: message.author.id,
          serverID: message.guild.id
        });

        if (!value || amount > value.bal) {
          flipEmbed.setDescription("Error!\n\n Not enough credits");
          flipEmbed.setColor('#e62222')
        } else {
          if (choice === arg) {
            await value
              .updateOne({
                $inc: {
                  bal: amount
                }
              })
              .catch(err => console.log(err));

            flipEmbed.setDescription(
              `Luck has sided with you... \n\n You gained **${amount}** credits`
            );
            flipEmbed.setColor('#228B22')
          } else {
            await value
              .updateOne({
                $inc: { // --> To avoid miscalculations while working with numbers / strings
                  bal: -amount
                }
              })
              .catch(err => console.log(err));

            flipEmbed.setDescription(
              `Hah, luck isn't your friend \n\n You blew **${amount}** credits`
            );
            flipEmbed.setColor('#e62222')
          }
        }

        message.channel.send(flipEmbed);
      } else {
        return Embeds.invalid(message);
      }
    }

    flipCoin();
  }
};