const { playerInfo } = require('./player.js');
const { sayMessage } = require('./utils.js');
const { mobsRandom } = require('./mobs.js');
const { levelGetExp } = require('./level.js');
/**
 * PvE сражение с случайным монстром.
 * @param {string} player Никнейм игрока
 */
async function pve(username) {
  const player = await playerInfo(username);
  pveLevelMob(player);
}
//Генерируем полосу препятствий(мобы, игроки, события). И сразу же проходим её, потом вешаем таймер на 5 минут. И возвращаем игроку его добычу и результат по истечению времени.

/**
 * PvE сражение с случайным монстром.
 * @param {object} player Объект игрока полученный через playerInfo()
 */
async function pveLevelMob(player) {
  const mob = await mobsRandom();
  // eslint-disable-next-line
  while (true) {
    if (player.health <= 0) {
      sayMessage('Персонаж умер');
      break;
    }
    player.health -= mob.damage;
    if (mob.health <= 0) {
      sayMessage(`${mob.name} убит. Вы получили ${mob.exp} опыта`);
      levelGetExp(player, mob.exp);
      break;
    }
    mob.health -= player.damage;
  }
}

/**
 * PvE сражение против случайного игрока.
 * @param {object} player
 */
async function pveLevelPlayer(player) {}

/**
 * PvE событие с взаимодействием пользователя Twitch.
 * @param {object} player
 */
async function pveLevelEvent(player) {}

module.exports = {
  pve
};
