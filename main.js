const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const rightPad = require("right-pad");
let config = require("./config.json");
const guildConfig = require("./assets/defaultconfig.js");

client.on("ready", () => {
  commands = {};
  version = "0.6.5";
  fs.readdir("./commands/", (err, files) => {
    // Thanks to Pierce01 and IanMurray for this code here.
    var indexed = [];
    files.forEach(file => {
      indexed.push(file.slice(0, -3));
    });
    indexed.forEach(set => {
      require(`./commands/${set}`).func(client);
    });
    fs.readdir("./events/", (err, files) => {
      var indexed = [];

      files.forEach(file => {
        indexed.push(file.slice(0, -3));
      });

      indexed.forEach(event => {
        client.on(event, (...args) => require(`./events/${event}`).func(client, ...args));
      });
    });
    commands.help = {
      "help": "Messages you a list of commands.",
      "helpcat": "Core",
      "run": (message, args) => {
        catbuilder = {};
        Object.keys(commands).sort().forEach(cmd => {
          helpcat = commands[cmd].helpcat || "No Category";
          if (!catbuilder[helpcat]) {
            catbuilder[helpcat] = [];
          }
          catbuilder[helpcat].push(cmd);
        });

        textbuilder = [];
        Object.keys(catbuilder).sort().forEach(cat => {
          textbuilder.push(`[${cat}]`);
          catbuilder[cat].sort().forEach(cmd => {
            if (commands[cmd].help) {
              textbuilder.push(`${rightPad(cmd, 8, " ")} = ${commands[cmd].help}`);
            }
          });
        });

        message.author.send(textbuilder.join("\n"), {
          code: "ini",
          split: true
        }).then(() => {
          message.reply(":white_check_mark: I've DM'ed you a command list.");
        }).catch(() => {
          message.reply(":negative_squared_cross_mark: I couldn't send the message. You've either disabled PMs or blocked me.");
        });
      }
    };
  });
  console.log(`We're online, with ${client.guilds.size} guilds.`);
  client.user.setPresence({game: {name: `on ${client.guilds.size} servers.`, type: 3}});
});

client.getServerConf = function (guild) {
  if (!guild) return false;
  if (!fs.existsSync(`./servers/${guild.id}.json`)) {
    guildConfig.nyGuild(guild.id, guild.name, guild.createdAt.toString(), guild.region, guild.ownerID);
  }
  var servconf = require(`./servers/${guild.id}.json`);
  return servconf;
};

client.logToGuild = function (guild, message) {
  if (!guild) return false;
  try {
    let servconf = client.getServerConf(guild);
    if (!guild.channels.get(servconf.logchannel)) return;
    guild.channels.get(servconf.logchannel).send(message);
  } catch (e) {
    console.warn(e);
  }
};

const flagShortcodes = {
  brazil: "br", "eu-central": "eu", hongkong: "hk", japan: "jp", russia: "ru", singapore: "sg", sydney: "au", "us-central": "us", "us-east": "us", "us-south": "us", "us-west": "us", "eu-west": "eu"
};
const pretty = {
  brazil: "Brazil", "eu-central": "Central Europe", hongkong: "Hong Kong", japan: "Japan", russia: "Russia", singapore: "Singapore", sydney: "Sydney", "us-central": "Central US", "us-east": "Eastern US", "us-south": "Southern US", "us-west": "Western US", "eu-west": "Western EU"
};

client.friendlyRegionName = region => {
  const flag = `:flag_${flagShortcodes[region]}:`;
  const prettyName = pretty[region] || region.substr(0, 1).toUpperCase() + region.substr(1);
  if (flagShortcodes[region] === undefined) return prettyName;
  return `${flag} ${prettyName}`;
};

// "then is not a property"
client.invertBool = perm => {
  perm = !perm;
  return perm;
};

/* client.tagToPerm = shortcut => {
  const permName = ops[shortcut];
  return permName;
}; **/

client.on("debug", console.log);
client.on("error", console.error);
client.on("warn", console.warn);
client.on("disconnect", console.warn);

function clean (text) { // För rd-eval
  if (typeof (text) === "string") { return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)); } else { return text; }
}

client.on("message", (message) => {
  if (message.channel.type === "dm") return;

  if (!fs.existsSync(`./servers/${message.guild.id}.json`)) {
    guildConfig.nyGuild(message.guild.id, message.guild.name, message.guild.createdAt.toString(), message.guild.region, message.guild.ownerID);
  }
  if (!message.content.startsWith(config.prefix)) return;

  if (message.author.bot) return;

  args = message.content.toLowerCase().split(" ");

  cmd = args.shift().slice(config.prefix.length);

  try {
    cmdobj = null;

    if (commands[cmd]) {
      cmdobj = commands[cmd];
    } else {
      Object.keys(commands).sort().forEach(co => {
        if (commands[co].aliases) {
          if (commands[co].aliases.includes(cmd)) {
            cmdobj = commands[co];
          }
        }
      });
      if (!cmdobj) return;
    }
    cmdobj.run(message, args);
  } catch (e) {
    console.warn(e);
  }
});

client.login(config.token);
