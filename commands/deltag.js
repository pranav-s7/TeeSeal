module.exports = {
  name: "deltag",
  description: "Fetch a tag from the list",
  cooldown: 0,
  args: true,
  aliases: [`dt`],
  type: "moderation",
  usage: "deltag <name>",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/Embeds.js");
    const {
      Tags
    } = require("../lib/models.js");

    if (args.length !== 1) return Embeds.invalid(message)

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return Embeds.noPerms(message);


    let check = "<:check:606192696561762356>";

    let delEmbed = new Discord.MessageEmbed().setColor("#fae719");

    async function tagDel() {

      const tagDelArea = await Tags.deleteOne({
        name: args[0]
      });

      if (tagDelArea) {
        delEmbed.setDescription(check + " Tag deleted!");

        return message.channel.send(delEmbed);
      }

      return Embeds.farAndWide(message); // --> If the tag is not found
    }

    tagDel();
  }
};