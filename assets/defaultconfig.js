const fs = require("fs");

var defaultConfig = {
  nyGuild: function (id, servername, createdAt, region, ownerID) {
    let info = {
      id: id,
      name: servername,
      createdAt: createdAt,
      region: region,
      owner: ownerID,
      logchannel: null,
      preferences: {
        logJoinLeave: true,
        logEditMessage: false,
        logDeleteMessage: false,
        logBan: true,
        logUnban: true,
        logEditTag: true,
        logEditNick: true
      }

    };

    let data = JSON.stringify(info, null, 2);
    fs.existsSync(`./servers/${id}.json`);
    fs.writeFileSync(`./servers/${id}.json`, data);
  }
};

module.exports = defaultConfig;
