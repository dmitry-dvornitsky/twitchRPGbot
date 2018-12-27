const { playersRef } = require('./firebaseRefs.js');
const { sayMessage } = require('./utils.js');
const { playerInfo, playerDamage } = require('./player.js');

/**
 *
 * @param {string} attackingPlayer Ник атакующего
 * @param {string} defendingPlayer Ник защищающегося
 */
async function pvp(attackingPlayer, defendingPlayer) {
  //Получаем информацию о атакующем персонаже по никнейму.
  const attackingPlayerRef = await playerInfo(attackingPlayer);
  const defendingPlayerRef = await playerInfo(defendingPlayer);

  if (!attackingPlayerRef) {
    sayMessage(
      `@${attackingPlayer} только зарегистрированные игроки могут участвовать в дуелях! Для регистрации напиши !reg`
    );
  } else {
    playersRef.child(attackingPlayer).update({ chatState: 'pvp' });
    if (!defendingPlayerRef) {
      sayMessage(
        `@${attackingPlayer} ты не можешь вызвать ${defendingPlayer} на дуель, так как он не зарегистрирован.`
      );
    } else {
      playersRef.child(defendingPlayer).update({ lastPvp: attackingPlayer });
      sayMessage(
        `@${defendingPlayer}, что бы принять вызов напиши !accept или отменить !decline`
      );
    }
  }
}

async function pvpAccept(defendingPlayer, attackingPlayer) {
  const attackingPlayerRef = await playerInfo(attackingPlayer);
  const defendingPlayerRef = await playerInfo(defendingPlayer);

  // eslint-disable-next-line
  while (true) {
    if (attackingPlayerRef.health <= 0) break;
    defendingPlayerRef.health -= playerDamage(
      attackingPlayerRef.critChance,
      attackingPlayerRef.damage
    );

    if (defendingPlayerRef.health <= 0) break;
    attackingPlayerRef.health -= playerDamage(
      defendingPlayerRef.critChance,
      defendingPlayerRef.damage
    );
  }

  if (attackingPlayerRef.health <= 0) {
    sayMessage(defendingPlayer + ' победил');
  } else {
    sayMessage(attackingPlayer + ' победил');
  }

  playersRef.child(defendingPlayer).update({ chatState: 'idle' });
  playersRef.child(defendingPlayer).update({ lastPvp: '' });

  playersRef.child(attackingPlayer).update({ chatState: 'idle' });
  playersRef.child(attackingPlayer).update({ lastPvp: '' });
}

function pvpDecline(defendingPlayer, attackingPlayer) {
  playersRef.child(defendingPlayer).update({ chatState: 'idle' });
  playersRef.child(defendingPlayer).update({ lastPvp: '' });

  playersRef.child(attackingPlayer).update({ chatState: 'idle' });
  playersRef.child(attackingPlayer).update({ lastPvp: '' });

  sayMessage(defendingPlayer + ' отказывается от дуели!');
}

module.exports = {
  pvp,
  pvpAccept,
  pvpDecline
};
