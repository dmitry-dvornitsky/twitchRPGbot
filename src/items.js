const items = require('./itemsList.js');
const { playersRef } = require('./firebaseRefs.js');

/**
 * give item to user
 * @param {string} itemSlug item key
 * @param {string} username username
 */
async function giveItem(itemSlug, username) {
  const item = items[itemSlug];
  console.log(item);
  if (item.type === 'weapon') {
    return playersRef.child(username + '/inventory/' + item.type).update({
      name: item.name,
      slug: item.slug,
      damage: item.damage,
      critChance: item.critChance
    });
  } else {
    return playersRef.child(username + '/inventory/' + item.type).update({
      name: item.name,
      slug: item.slug,
      health: item.health
    });
  }
}
module.exports = {
  giveItem
};
