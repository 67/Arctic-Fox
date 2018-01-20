const fs = require("fs");

exports.func = (client, member) => {
  let servconf = require(`../servers/${member.guild.id}.json`);
  if (servconf.preferences.logJoinLeave === true && servconf.logchannel !== null) {
    client.logToGuild(member.guild, {embed: {
      color: 0x0A8F00,
      author: {
        name: "\u1F4E5 New Member",
        icon_url: member.user.avatarURL
      },
      description: `**${member.user.tag}** has joined the server. (ID: ${member.id})`,
      timestamp: new Date()
    }
    });
  }
};
