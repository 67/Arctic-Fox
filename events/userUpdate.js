const fs = require("fs");

exports.func = (client, oldUser, newUser) => {
  if (oldUser.tag !== newUser.tag) {
    client.guilds.reduce((list, guild) => {
      guild.fetchMember(newUser).then((user) => {
        let servconf = require(`../servers/${guild.id}.json`);

        if (servconf.preferences.logEditTag === true && servconf.logchannel !== null) {
          if (!guild.channels.get(servconf.logchannel)) return;

          guild.channels.get(servconf.logchannel).send({embed: {
            color: 0x6D6D6D,
            author: {
              name: "\u1F4DD Name Change",
              icon_url: newUser.avatarURL
            },
            description: `**${oldUser.tag}** has changed their name to **${newUser.tag}**. (ID: ${newUser.id}).`,
            timestamp: new Date()
          }
          });
        }
      }).catch((err) => {
        // Who cares?
      });
    }, []); // I'll fix this later when I can be bothered to use proper spacing. Right now it's a mess but it works so I don't care.
  }
};
