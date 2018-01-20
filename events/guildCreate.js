const nyConfig = require("../assets/defaultconfig.js");

exports.func = (client, guild) => {
  console.log(`[GUILD] Joined a new guild: ${guild.name} (ID: ${guild.id}). It has ${guild.memberCount} members.`);

  client.user.setPresence({game: {name: `on ${client.guilds.size} servers.`, type: 3}});

  nyConfig.nyGuild(guild.id, guild.name, guild.createdAt.toString(), guild.region, guild.ownerID);

  guild.owner.send(`Hey, ${guild.owner.user.username}! I'm Arctic Fox. Thanks for adding me to ${guild.name}!\n\n
    Now before you start using me, let me brief you on some things you may want to get set up.\n\n
    By default, I have the ability to log user joins/leaves, bans, and tag edits. However, by default, I have no logging
    channel set up. You should set this by using "vl-logset #channel", replacing #channel with whatever channel you wish
    to use for logging.\n\n
    Then, to change *what* you log, use "vl-options help" to display your options. You can go from there.\n\n
    Thanks for using me! :slight_smile:`);
};
