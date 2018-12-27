const { playersRef } = require('./firebaseRefs.js');
const { randomInt } = require('./utils.js');

class Player {
  constructor(username) {
    /** chatState: idle-бездействие, pvp-сражение с игроком, adventure-приключение */
    this.chatState = 'idle';
    this.lastPvp = '';
    this.username = username;
    this.level = 1;
    this.exp = 0;
    this.health = 100;
    this.damage = 10;
    this.critChance = 0;
    this.inventory = {
      weapon: {
        name: '',
        damage: 0,
        critChance: 0,
        slug: ''
      },
      helmet: {
        name: '',
        health: 0,
        slug: ''
      },
      plate: {
        name: '',
        health: 0,
        slug: ''
      },
      greaves: {
        name: '',
        health: 0,
        slug: ''
      }
    };
  }
}

async function playerInfo(username) {
  const snapshot = await playersRef.child(username).once('value');
  /** @type {Player} */
  const info = snapshot.val();
  const { health, inventory, damage, critChance } = info || new Player();

  return {
    health:
      health +
      inventory.helmet.health +
      inventory.greaves.health +
      inventory.plate.health,
    damage: damage + inventory.weapon.damage,
    critChance: critChance + inventory.weapon.critChance,
    info
  };
}

function playerDamage(critChance, damage) {
  const critDamage = damage;
  const isCrit = randomInt(0, 100);
  return isCrit < critChance ? damage * 2 : critDamage;
}

module.exports = {
  playerInfo,
  playerDamage,
  Player
};
