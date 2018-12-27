const { playersRef } = require('./firebaseRefs.js');
const { sayMessage } = require('./utils.js');
const { levels } = require('./levelsList.js');

/**
 * Получение опыта персонажем.
 * @param {int} amount Количество опыта
 * @param {object} player Объект игрока полученный через playerInfo()
 */
function levelGetExp(player, amount) {
  playersRef
    .child(player.info.username)
    .update({ exp: player.info.exp + amount });

  for (var level in levels) {
    if (player.info.exp >= levels[level] && player.info.level < level) {
      playersRef.child(player.info.username).update({ level: level });
      sayMessage(`@${player.info.username} ты получил новый уровень!`);
    }
  }
}

module.exports = {
  levelGetExp
};
