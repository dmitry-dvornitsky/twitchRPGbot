//Игрок и монстр по очереди наносят урон. Если монстр умирает, то игрок получает опыт и случайный предмет.
function battle(username) {
  let randomMob = createRandomMob();

  do {
    //сражение
    damageMob(randomMob, player.damage);
    damagePlayer(randomMob.damage);
  } while (
    //До момента гибели одного из участников
    randomMob.health > 0
  );
  if (randomMob.health <= 0) {
    sayMessage(
      username +
        " нанёс последний удар и прикончил монстра! " +
        "У игрока осталось: " +
        player.health
    );
  }
}
