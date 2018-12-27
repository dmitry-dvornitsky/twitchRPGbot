const tmi = require('tmi.js');

const channel = 'dinozav';

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: 'dinozav1',
    password: 'oauth:dqpn36841dw08l8lpzpmrc04jstphl'
  },
  channels: [channel]
};

const client = new tmi.client(options);

async function connect() {
  return client.connect();
}

module.exports = { client, channel, connect, options };
