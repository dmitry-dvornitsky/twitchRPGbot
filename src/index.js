const { connect } = require('./services/tmi.js');
const { chatInit } = require('./chat.js');
connect().then(() => {
  console.log('connected');
  chatInit();
});
