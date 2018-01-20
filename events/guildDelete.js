exports.func = (client, guild) => {
  console.info(`[GUILD] Removed from guild: ${guild.name} (ID: ${guild.id})`);
  client.user.setPresence({game: {name: `on ${client.guilds.size} servers.`, type: 3}});
};
