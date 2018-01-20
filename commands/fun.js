const fs = require("fs");

function randint (low, high) {
	 return Math.floor(Math.random() * (high - low) + low);
}

exports.func = (client) => {
  commands.redpanda = {
    "help": "Sends a random red panda picture.",
    "helpcat": "Fun",
    "aliases": ["panpan"],
    "run": (message, args) => {
      message.channel.send({file: `panpans/${[randint(1, 37)]}.jpg`}); // This is terrible.
    }
  };
  exports.func = (client) => {
    commands.eightball = {
      "help": "Get your fortune told.",
      "helpcat": "Fun",
      "aliases": ["8ball", "8"],
      "run": (message, args) => {
        let responses = require("../assets/responses.json");
        message.channel.send(`:8ball: ${responses.eightball[randint(0, 20)]}`);
      }
    };
  };
  /* exports.func = (client) => {
    commands.hewwo = {
      "help": "h-hewwo??? is any1 dewe??? owo",
      "helpcat": "Fun",
      "aliases": ["owo"],
      "run": (message, args) => {
        // Coming Soon
      }
    };
  }; **/
  exports.func = (client) => {
    commands.excuse = {
      "help": "Need a quick BOFH-style excuse? This will do the trick.",
      "helpcat": "Fun",
      "aliases": ["bofh"],
      "run": (message, args) => {
        let responses = require("../assets/responses.json");
        message.channel.send(`Oops! The cause of the problem was... erm... ${responses.excuses[randint(0, 472)]}`);
		  }
	 };
  };
  exports.func = (client) => {
    commands.ordercorn = {
      "help": "/r/OldPeopleFacebook.",
      "helpcat": "Fun",
      "aliases": ["oldpeople"],
      "run": (message, args) => {
        let responses = require("../assets/responses.json");
        message.channel.send(responses.oldpeople[randint(0, 20)]);
		  }
	 };
  };
  exports.func = (client) => {
    commands.brmeme = {
      "help": "Memes brasileiros são memes melhores.",
      "helpcat": "Fun",
      "aliases": ["brazil", "brasil"],
      "run": (message, args) => {
        let responses = require("../assets/responses.json");
        message.channel.send(`:flag_br: ${responses.brmemes[randint(0, 20)]} :flag_br:`);
		  }
	 };
  };
};
