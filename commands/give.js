module.exports = {
  name: "give",
  description: "Feeling Generous? Min 50 credits",
  cooldown: 5,
  args: true,
  aliases: ["pay"],
  type: "economy",
  usage: "give {user} {amount}",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/Embeds.js");
    const Coins = require("../lib/coinsSchema.js");

    let target = message.mentions.users.first();

    if (args.length !== 2 || isNaN(args[1]) || !target) {
      return Embeds.invalid(message);
    } // Invalid usage, amount to give isn't a valid number or no member mentioned

    let amount = parseInt(args[1]);

    let giveEmbed = new Discord.MessageEmbed();

    let give = async function () {
      await Coins.findOne({
          userID: message.author.id,
          serverID: message.guild.id
        },
        (err, res) => {
          if (err) return console.log(err);

          if (!res || amount > res.bal) {

            giveEmbed.setColor("#e62222");
            giveEmbed.setDescription("<:invalid:606192696566218773> You don't have enough coins");
            return message.channel.send(giveEmbed);

          } else if (amount < 50) {

            giveEmbed.setColor("#e62222");
            giveEmbed.setDescription("<:invalid:606192696566218773> Minimum amount is 50 credits");
            return message.channel.send(giveEmbed);

          }

          Coins.findOne({
              userID: target.id,
              serverID: message.guild.id
            },

            (err, toGive) => {
              if (err) return console.log(err);

              res.bal -= amount; // --> Subtracts amount from giver
              res.save().catch(err => console.log(err));

              if (!toGive) {
                let newUser = new Coins({
                  userID: target.id,
                  serverID: message.guild.id,
                  bal: amount,
                  xp: 0,
                  level: 0
                });

                newUser.save().catch(err => console.log(err));
              } else {
                toGive.bal += amount; // --> Adds amount to reciever 
                toGive.save().catch(err => console.log(err));
              }

              giveEmbed.setTitle( // User1 --> 76 --> User2
                `${message.author.username} --> ${amount} --> ${
                  target.username
                }`
              );
              giveEmbed.setColor("RANDOM");
              giveEmbed.setDescription(
                `Transfer Successful!\n\n${
                  message.author.username
                } has given **${amount}** to ${target.username}`
              );
              giveEmbed.setThumbnail(message.author.avatarURL);
              giveEmbed.setFooter("Stay active to gain cash", target.avatarURL);

              message.channel.send(giveEmbed);
            }
          );
        }
      );
    };

    give();
  }
};