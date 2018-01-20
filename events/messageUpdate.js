const fs = require("fs");

exports.func = (client, oldMessage, newMessage) => {
  let servconf = require(`../servers/${oldMessage.guild.id}.json`);
  if (servconf.preferences.logEditMessage === true && servconf.logchannel !== null) {
    client.logToGuild(oldMessage.guild, {embed: {
      color: 0x3341FF,
      author: {
        name: "\u270D Message Edited",
        icon_url: newMessage.member.user.avatarURL
      },
      description: `**${newMessage.member.user.tag}** has edited a message.`,
      fields: [{
        name: "Old message:",
        value: oldMessage.content
      },
      {
        name: "New message:",
        value: newMessage.content
      }
      ],
      timestamp: new Date()
    }
    });
  }
};
