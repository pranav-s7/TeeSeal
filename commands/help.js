module.exports = {
  name: "help",
  description: "Lists available commands",
  aliases: ["commands", "assistance"],
  usage: "help <Command Name>",
  cooldown: 10,
  type: "utility",

  execute(message, args) {
    const {
      prefix
    } = require("../lib/botconfig.json");
    const Embeds = require("../lib/embeds.js");
    const Discord = require("discord.js");
    let {
      commands
    } = message.client;

    if (!args.length) {

      commandsByType = commands.reduce((res, command) => {
        console.log(res);
        if (!res[command.type]) res[command.type] = [];
        res[command.type].push(command.name);
        return res;
      }, {});

      let helpEmbed = new Discord.MessageEmbed();

      for (let [key, value] of Object.entries(commandsByType)) {
        helpEmbed.addField(key, value.map(cmd => `\`${cmd}\``).join(" "));
      }

      helpEmbed.setTitle("List of Available Commands!");
      helpEmbed.setDescription(`${prefix}help [command name] for detailed info`);
      helpEmbed.setColor("#CFB53B");

      return message.channel.send(helpEmbed); // --> General help page
    }

    const helpCommand = args[0].toLowerCase();
    const command =
      commands.get(helpCommand) ||
      commands.find(c => c.aliases && c.aliases.includes(helpCommand)); // --> Gets command name and aliases

    if (!command) return Embeds.farAndWide(message);

    let helpSpecific = new Discord.MessageEmbed()
      .setTitle(`Command: ${command.name}`)
      .setColor("#CFB53B")
      .setDescription(command.description);

    if (command.aliases) {
      helpSpecific.setFooter(
        `Aliases: ${command.aliases.join(", ")}`,
        message.author.avatarURL
      );
    } else helpSpecific.setFooter("Aliases: None", message.author.avatarURL);

    if (command.usage) helpSpecific.addField("Usage", prefix + command.usage);

    message.channel.send(helpSpecific); // --> Help on a specific command 
  }
};