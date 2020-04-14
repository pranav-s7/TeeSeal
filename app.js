require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const {
    prefix,
    token
} = require("./lib/botconfig.json");
const fs = require("fs");
const Embeds = require("./lib/embeds.js");
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const mongoose = require("mongoose");
const Coins = require("./lib/coinsSchema.js");

////////////////////////////////////////////////////////////////////////////////////////////

// command handler [Start]

const commandFiles = fs
    .readdirSync("./commands")
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`${file} Scanned`);
}

mongoose.connect(
    "mongodb+srv://SweatySaturdays:Geronimo8!@cartoon-wetgx.mongodb.net/test?retryWrites=true&w=majority"
);

// command handler [End]

client.once("ready", async () => {
    console.log("TeeSeal is ready for use :)");
    client.user.setActivity(`${prefix}help to start`, {
        type: "PLAYING"
    });
});

////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;

    let xpCooldown = require("./lib/LvlSystem.js");

    let args = message.content.slice(prefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            cmd => cmd.aliases && cmd.aliases.includes(commandName)
        );

    try {
        xpCooldown(message);
    } catch (err) {
        console.log(err);
    }

    if (!message.content.startsWith(prefix)) {
        let chance = Math.floor(Math.random() * 100) + 1;

        if (chance < 21) {
            Coins.findOne({
                    userID: message.author.id,
                    serverID: message.guild.id
                },
                (err, res) => {
                    if (err) return console.log(err);

                    let randomCredits = Math.ceil(Math.random() * (15 - 5)) + 5; // (Max - Min) + Min

                    if (!res) {
                        const newUser = new Coins({
                            userID: message.author.id,
                            serverID: message.guild.id,
                            bal: randomCredits,
                            xp: 0,
                            level: 0
                        });
                        newUser.save().catch(err => console.log(err));
                    } else {
                        res.bal += randomCredits;
                        res.save();
                    }
                }
            );
        }
    }

    if (!command) return;

    // Calling Commands [Start]

    if (message.content.startsWith(prefix)) {
        if (command.args && !args.length && !command.usage) {
            return Embeds.invalid(message);
        } else if (command.usage && command.args && !args.length) {
            return Embeds.correctUsage(message, command.usage);
        } else if (
            command.type == "moderation" &&
            !message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")
        ) {
            return Embeds.noPerms(message);
        }
    }

    // Calling Commands [End]

    ////////////////////////////////////////////////////////////////////////////////////////////

    // Cooldown [Start]

    if (message.content.startsWith(prefix)) {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownTime = command.cooldown * 1000;

        if (timestamps.has(message.author.id)) {
            const expiredTime = timestamps.get(message.author.id) + cooldownTime;

            if (now < expiredTime) {
                const timeLeft = (expiredTime - now) / 1000;
                return Embeds.cooldown(message, timeLeft);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownTime);
    }

    // Cooldown [End]

    ////////////////////////////////////////////////////////////////////////////////////////////

    if (message.content.startsWith(prefix)) {
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
        }
    }
});

client.login(process.env.token);

////////////////////////////////////////////////////////////////////////////////////////////