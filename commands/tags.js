module.exports = {
  name: "tags",
  description: "A list of all tags available",
  cooldown: 5,
  args: false,
  aliases: ["displaytags"],
  type: "utility",
  usage: "tags",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/Embeds.js");
    const {
      Tags
    } = require("../lib/models.js");

    async function tagsList() {
      let tags = await Tags.find({}, "name"); // --> Gets the name pproperty of all tags

      let tagsEmbed = new Discord.MessageEmbed()
        .setTitle("List of Available Tags")
        .setColor("#fae719");

      let tagsMap = tags.map(tag => `\`${tag.name}\``).join(" "); // --> Appears in a block format on Discord

      if (tagsMap.length > 0) {
        tagsEmbed.setDescription(tagsMap);
        return message.channel.send(tagsEmbed);
      }

      tagsEmbed.setDescription("none"); // --> No tags have been created
      return message.channel.send(tagsEmbed);
    }

    tagsList();
  }
};