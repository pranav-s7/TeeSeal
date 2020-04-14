module.exports = {
  name: "delrole",
  description: "Pinch a role out of the list",
  cooldown: 5,
  args: true,
  aliases: [],
  type: "roles",
  usage: "delrole {role}",

  execute(message, args) {
    const Discord = require("discord.js");
    const Embeds = require("../lib/embeds.js");
    const roleshop = require("../lib/roleshopSchema.js")

    let roleToDel = message.mentions.roles.first()


    if (args.length !== 1 || !roleToDel) return Embeds.invalid(message); // --> Invalid or role not mentioned
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return Embeds.noPerms(message);

    // ^ Non mods can't delete roles


    async function delRole() {

      let deleteRole = await roleshop.deleteOne({
        serverID: message.guild.id,
        roleID: roleToDel.id
      }).catch(err => console.log(err))

      let delEmbed = new Discord.MessageEmbed()
      if (!deleteRole) return Embeds.farAndWide(message)

      delEmbed.setDescription(`<:check:606192696561762356> role removed`)
      delEmbed.setColor("#fae719")

      message.channel.send(delEmbed)


    }

    delRole()


  }
};