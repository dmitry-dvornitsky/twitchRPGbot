const { Player } = require('./player.js');
const { client } = require('./services/tmi.js');
const { playersRef } = require('./firebaseRefs.js');
const { sayMessage } = require('./utils.js');

async function signIn(username) {
  const ref = playersRef.child(username);
  const snapshot = await ref.once('value');
  if (snapshot && snapshot.val()) {
    return sayMessage('Вы уже зарегистрированы');
  }
  await ref.set(new Player(username));
  const msg =
    'Поздравляю с регистрацией! Теперь Вы можете отправиться в приключение, написав !adventure';
  client.whisper(username, msg);
}

module.exports = {
  signIn
};
