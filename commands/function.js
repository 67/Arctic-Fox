const fs = require("fs");
let config = require("../config.json");
const pushbullet = require("pushbullet");

exports.func = (client) => {
   commands.notetoself = {
    "help": "Sends a note to yourself.",
    "helpcat": "Function",
    "aliases": ["sendnote"],
    "run": (message, args) => {
      var offset = config.prefix.length + cmd.length + 1; // Får kommandolängden
      var note = message.content.substring(offset);

      if (message.content.length === offset || message.content.length === offset - 1) {
        message.channel.send(":no_entry: What's the point of noting something if you don't have anything to note?");
        return;
      }

      message.author.sendMessage(note).then(() => {
        message.channel.send(":pencil: Noted.");
      }).catch((e) => {
        console.error(e);
        message.channel.send(":no_entry: I couldn't send you the note. Either you've disabled PMs, or you've blocked me for some reason.");
        console.log(message.content.length);
      });
    }
  };
};
