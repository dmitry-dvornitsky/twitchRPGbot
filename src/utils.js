const { client, channel } = require('./services/tmi.js');

function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function randomObjectItem(object) {
  object = Object.keys(object);
  let min = 0;
  let max = object.length - 1;
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return object[rand];
}

/**
 * @param {string} message
 * @returns {Promise<any>} */
function sayMessage(message) {
  return client.say(channel, message).catch(console.log);
}

module.exports = {
  randomInt,
  sayMessage,
  randomObjectItem
};
