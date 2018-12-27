const mobs = require('./mobsList.js');
const { randomObjectItem } = require('./utils.js');
//генерируем число небольше чем длина массива, после чего подставляем это число в номер.
/**
 * Генерация случайного монстра.
 */
function mobsRandom() {
  let rendomMob = mobs[randomObjectItem(mobs)];
  let mob = {
    name: rendomMob.name,
    description: rendomMob.description,
    health: rendomMob.health,
    damage: rendomMob.damage,
    exp: rendomMob.exp
  };
  return mob;
}

module.exports = {
  mobsRandom
};
