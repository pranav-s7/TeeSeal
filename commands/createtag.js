module.exports = {
  name: "createtag",
  description: "Mod lives made easy",
  cooldown: 0,
  args: true,
  aliases: ["ct", "addtag"],
  type: "moderation",
  usage: "createtag {name} {content}",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/embeds.js");
    const {
      Tags
    } = require("../lib/models.js");

    let tagName = args[0];
    let tagDescription = "";

    for (i = 1; i < args.length; i++) {
      console.log(i);
      tagDescription += args[i] + " ";
    } // --> Adds all the args to the description

    if (!tagDescription) return Embeds.invalid(message);

    async function tagCreate() {
      try {
        const tag = await Tags.create({
          name: tagName,
          description: tagDescription
        });

        let tcEmbed = new Discord.MessageEmbed()
          .setDescription(`<:check:606192696561762356> ${tag.name} created!`)
          .setColor("#fae719");
        message.channel.send(tcEmbed);
      } catch (e) {
        console.log(e);
      }
    }

    tagCreate();
  }
};