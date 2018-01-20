const fs = require("fs");

exports.func = (client, member) => {
  let servconf = require(`../servers/${member.guild.id}.json`);
  if (servconf.preferences.logJoinLeave === true && servconf.logchannel !== null) {
    client.logToGuild(member.guild, {embed: {
      color: 0xDE0000,
      author: {
        name: "\u{1F4E4} Member Left",
        icon_url: member.user.avatarURL
      },
      description: `**${member.user.tag}** has left the server. (ID: ${member.id})`,
      timestamp: new Date()
    }
    });
  }
};
