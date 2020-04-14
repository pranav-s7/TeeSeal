module.exports = {
  name: "roles",
  description: "List of available level roles",
  cooldown: 5,
  args: false,
  aliases: [],
  type: "roles",
  usage: "roles",

  execute(message, args) {
    const Discord = require("discord.js");
    const roleshop = require("../lib/roleshopSchema.js");

    async function findRoles() {
      let roles = await roleshop.find({
        serverID: message.guild.id
      });

      let mapped = roles.map(role => `\`${role.name}\``); // --> Appears in block format on Discord

      let rolesEmbed = new Discord.MessageEmbed().setTitle("Available level roles:");

      roles.sort(function (a, b) {
        return a.level - b.level;
      }); // --> Sorts the role levels in ascending order

      let desc = "";

      roles.forEach(role => {
        desc += `**${role.name}  -->**  lvl ${
          role.level
        }\n--------------------------\n`;
      }); // Adds a new line for each role with it's level

      rolesEmbed.setDescription(desc);
      rolesEmbed.setColor("RANDOM");
      rolesEmbed.setThumbnail(message.guild.iconURL);

      message.channel.send(rolesEmbed);
    }

    findRoles();
  }
};