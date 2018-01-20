const fs = require("fs");
const nyConfig = require("../assets/defaultconfig.js");

exports.func = (client, oldGuild, newGuild) => {
  let servconf = require(`../servers/${newGuild.id}.json`);
  if (oldGuild.name !== newGuild.name) {
    console.log(`[GUILD] A guild has been updated. Its name has changed from "${oldGuild.name}" to "${newGuild.name}". (ID: ${newGuild.id}).`);
    servconf.name = newGuild.name;
    fs.writeFileSync(`./servers/${newGuild.id}.json`, JSON.stringify(servconf, null, 2));
  }

  if (oldGuild.region !== newGuild.region) {
    console.log(`[GUILD] A guild has been updated. Its region has changed from "${oldGuild.region}" to "${newGuild.region}". (ID: ${newGuild.id}).`);
    servconf.region = newGuild.region;
    fs.writeFileSync(`./servers/${newGuild.id}.json`, JSON.stringify(servconf, null, 2));
  }
};
