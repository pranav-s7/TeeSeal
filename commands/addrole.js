module.exports = {
  name: "addrole",
  description: "Give users roles as they level up",
  cooldown: 0,
  args: true,
  aliases: ["ar"],
  type: "roles",
  usage: "addrole {role} {level}",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/embeds.js");
    const roleshop = require("../lib/roleshopSchema.js");

    async function addRole() {
      let role = message.mentions.roles.first();
      if (args.length > 2 || !role || isNaN(args[1])) return Embeds.invalid(message);

      if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return Embeds.noPerms(message);

      let roleFound = await roleshop.findOne({
        serverID: message.guild.id,
        roleID: role.id
      });

      if (!roleFound) {
        await roleshop.create({
          serverID: message.guild.id,
          roleID: role.id,
          level: args[1],
          name: role.name
        });
      }

      let roleEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          `<:check:606192696561762356> role ${role.name} can be achieved at level ${args[1]}`
        );

      message.channel.send(roleEmbed);
    }

    addRole();
  }
};