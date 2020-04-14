module.exports = {
  name: "edittag",
  description: "Made an error? Update the tag!",
  cooldown: 0,
  args: true,
  aliases: ["et"],
  type: "moderation",
  usage: "edittag {name} {new content}",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/embeds.js");
    const {
      Tags
    } = require("../lib/models.js");

    let tagName = args[0];
    let check = "<:check:606192696561762356>";
    let tagDescription = "";

    for (i = 1; i < args.length; i++) {
      tagDescription += args[i] + " ";
    }

    async function updateTag() {
      let updateEmbed = new Discord.MessageEmbed();

      let toUpd = {
        name: args[0]
      };

      const update = await Tags.updateOne(toUpd, {
        description: tagDescription
      }); // --> Changing the value of the tag description ^

      if (tagDescription < 1) return Embeds.invalid(message);

      if (!update) {
        Embeds.farAndWide(message)
      }

      try {
        updateEmbed.setDescription(check + ` ${tagName} Edited!`);
        updateEmbed.setColor('#fae719')
        return message.channel.send(updateEmbed);
      } catch (e) {
        console.log(e);
      }
    }

    updateTag();
  }
};