const fs = require("fs");
let config = require("../config.json");
const util = require("util");

exports.func = (client) => {
  commands.logset = {
    "help": "Sets the bot logging channel.",
    "helpcat": "Server Management",
    "aliases": ["logchannel"],
    "run": (message, args) => {
      let servconf = require(`../servers/${message.guild.id}.json`);
      if (message.member.hasPermission("MANAGE_CHANNELS")) {
        var chID = args[0].slice(2, -1);
        var logchannel = message.guild.channels.find("id", chID);
        if (!logchannel) {
          message.channel.send(":no_entry: That channel doesn't exist.");
        } else {
          servconf.logchannel = chID;
          logchannel.send("Now logging in this channel!\nTo see what logging options are available, use vl-options.").then(() => {
            message.channel.send(":white_check_mark: Set the logging channel!");
            fs.writeFileSync(`./servers/${message.guild.id}.json`, JSON.stringify(servconf, null, 2));
          }).catch((e) => {
            message.channel.send(":no_entry: I couldn't log to that channel. I may not have permission.");
          });
        }
      } else {
        message.channel.send(":no_entry: You don't have permission to do that.");
      }
		  }
  };
  commands.eval = {
    "aliases": ["exec", "debug"],
    "run": (message, args) => {
      if (!message.author.id === config.ownerid) return;
      try {
        const code = args.join(" ");
        result = eval(code);
        if (typeof result !== "string") result = util.inspect(result);
        message.channel.send(result, {code: "xl", split: true, disableEveryone: true});
      } catch (e) {
        message.channel.send(e, {code: "xl", split: true, disableEveryone: true});
      }
    }
  };
  commands.options = {
    "help": "Set logging options.",
    "helpcat": "Server Management",
    "aliases": ["options."],
    "run": (message, args) => {
      const ops = {
        "joinleave": ["logJoinLeave"], "edits": ["logEditMessage"], "deletes": ["logDeleteMessage"], "bans": ["logBan"], "unbans": ["logUnban"], "tagedits": ["logEditTag"], "nickedits": ["logEditNick"]
      };
      let servconf = require(`../servers/${message.guild.id}.json`);
      if (message.member.hasPermission("MANAGE_CHANNELS")) {
        switch (args[0]) {
          case ("help"):
            message.channel.send({embed: {
              color: 0x3341FF,
              author: {
                name: "\u1F4CB Logging Help",
                icon_url: client.user.avatarURL
              },
              description: `Attach any of these after ${config.prefix}options to toggle them (e.g. ${config.prefix}options joinleave).`,
              fields: [{
                name: "joinleave",
                value: "Logs when users join and leave the server. Enabled by default.",
                inline: true
              },
              {
                name: "edits",
                value: "Logs when users edit their messages. Includes both the old message and new message.",
                inline: true
              },
              {
                name: "deletes",
                value: "Logs when users delete a message. The message prior to deletion is included.",
                inline: true
              },
              {
                name: "bans",
                value: "Logs when a user is banned from the server. Enabled by default.",
                inline: true
              },
              {
                name: "unbans",
                value: "Logs when a user is unbanned from the server. Enabled by default.",
                inline: true
              },
              {
                name: "tagedits",
                value: "Logs when a user changes their \"tag\" (as in their Discord username or discrim). Enabled by default.",
                inline: true
              },
              {
                name: "nickedits",
                value: "Logs when a user edits their nickname. Enabled by default.",
                inline: true
              }
              ],
              timestamp: new Date()
            }
            });
            break;
            
          default:
            Object.keys(ops[args[0]]).forEach(perm => {
              let op = ops[args[0]];
              if (op) servconf.preferences[op] = !servconf.preferences[op];
              {
                message.channel.send(`Set to \`${servconf.preferences[op]}\`. :+1:`);
                fs.writeFileSync(`./servers/${message.guild.id}.json`, JSON.stringify(servconf, null, 2));
              }
            });
            break;
        }
      } else {
        message.channel.send(":no_entry: You don't have permission to do that.");
      }
		  }
  };
};
