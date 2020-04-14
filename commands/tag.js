module.exports = {
  name: "tag",
  description: "Fetch a tag from the list",
  cooldown: 5,
  args: true,
  aliases: ["fetch"],
  type: "moderation",
  usage: "tag <name>",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/Embeds.js");
    const {
      Tags
    } = require("../lib/models.js");

    let tagEmbed = new Discord.MessageEmbed().setColor("#fae719");

    async function tagFetch() {
      const tag = await Tags.findOne({
        name: args[0]
      }).catch(err =>
        console.log(err)
      );

      if (tag) {
        tagEmbed.setDescription(`**${tag.get("name")}** ` + ": " + `${tag.get("description")}`);

        return message.channel.send(tagEmbed);
      }

      return Embeds.farAndWide(message);
    }

    tagFetch();
  }
};