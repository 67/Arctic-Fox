const fs = require("fs");

exports.func = (client) => {
  commands.about = {
    "help": "About the bot.",
    "helpcat": "Information",
    "run": (message) => {
      message.channel.send({embed: {
        color: 0x6D6D6D,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "About Arctic Fox",
        description: "This bot was created by [Printendo#0447](https://github.com/Printendo).",
        fields: [{
          name: "Special thanks",
          value: "Many thanks to [Lyrus#5251](https://github.com/IanMurray) and [Pierce#7555](https://github.com/Pierce01) for loads of help with code."
        },
        {
          name: "Invite Link",
          value: "Coming Soon:tm:"
        }
        ],
        timestamp: new Date(),
        footer: {
          text: `Version ${version}`
        }
      }
      });
		  }
  };
};
  commands.serverinfo = {
    "help": "Get basic information about the server.",
    "helpcat": "Information",
    "run": (message) => {
      message.channel.send({embed: {
        color: 0x00AEE0,
        author: {
          name: message.guild.name,
          icon_url: message.guild.iconURL || `https://cdn.discordapp.com/embed/avatars/${[randint(0, 4)]}.png`
        },
        fields: [
          {
            name: "ID",
            value: message.guild.id,
            inline: true
          },
          {
            name: "Region",
            value: client.friendlyRegionName(message.guild.region),
            inline: true
          },
          {
            name: "Members",
            value: message.guild.memberCount,
            inline: true
          },
          {
            name: "Owner",
            value: `${message.guild.owner.user.tag} (${message.guild.owner.id})`
          },
          {
            name: "Created at",
            value: message.guild.createdAt.toString()
          }
        ],
        timestamp: new Date()
      }
      });
    }
  };
