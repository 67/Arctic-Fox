const fs = require("fs");
const nyConfig = require("../assets/defaultconfig.js");

exports.func = (client, message) => {
  let servconf = require(`../servers/${message.guild.id}.json`);
  if (servconf.preferences.logEditMessage === true && servconf.logchannel !== null) {
    client.logToGuild({embed: {
      color: 0xFF0036,
      author: {
        name: "\u274C Message Deleted",
        icon_url: message.member.user.avatarURL
      },
      description: `**${message.member.user.tag}** has deleted a message.`,
      fields: [{
        name: "Deleted message:",
        value: message.content
      }
      ],
      timestamp: new Date()
    }
    });
  }
};
