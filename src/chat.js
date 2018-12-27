const { client, options } = require('./services/tmi.js');
const { playerInfo } = require('./player.js');
const { pvp, pvpAccept, pvpDecline } = require('./pvp.js');
const { pve } = require('./pve.js');
const { signIn } = require('./signIn.js');
const { giveItem } = require('./items.js');
const { sayMessage } = require('./utils.js');

/**
 * Разделение сообщения на слова.
 * @param {string} message
 */
function splitMessage(message) {
  const [first, second, third] = message.split(' ');
  return { first, second, third };
}

function chatInit() {
  client.on('chat', async (channel, userstate, message) => {
    const words = splitMessage(message);
    /** @type {string} */
    const username = userstate.username;

    /** if bot gtfo */
    if (options.identity.username === username) return;

    /** !reg - Регистрация нового игрока */
    if (words.first === '!reg') {
      signIn(username);
      return;
    }

    const player = await playerInfo(username);
    console.log(typeof player.info);
    const { lastPvp } = player.info;

    /** !pve - PvE режим */
    if (words.first === '!pve') {
      pve(username);
    }

    /** !pvp [nickname] - вызов игрока на дуель */
    if (words.first === '!pvp') {
      if (words.second !== username) {
        pvp(username, words.second).catch(() => {
          sayMessage('Некорректное имя противника!');
        });
      } else {
        sayMessage('Действительно хочешь избить себя?');
      }
    }

    /** !playerInfo [nickname] - вызов игрока на дуель */
    if (words.first === '!playerInfo') {
      sayMessage(
        `${username}: Здоровье ${player.health}; Урон: ${player.damage}`
      );
    }

    /** !accept - принять PVP */
    if (words.first === '!accept') {
      if (lastPvp !== '') {
        pvpAccept(username, lastPvp);
      } else {
        sayMessage(`@${username} тебя никто не вызывал на дуэль!`);
      }
    }

    /** !decline - отказаться от PVP */
    if (words.first === '!decline') {
      if (lastPvp !== '') {
        pvpDecline(username, lastPvp);
      } else {
        sayMessage(`@${username} тебя никто не вызывал на дуэль!`);
      }
    }
    /** !item [itemSlug] [username] - дать предмет игроку */
    if (words.first == '!item') {
      giveItem(words.second, words.third);
    }
  });
}

module.exports = {
  sayMessage,
  splitMessage,
  chatInit
};
