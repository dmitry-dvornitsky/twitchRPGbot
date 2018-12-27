const firebase = require('./services/firebase.js');
module.exports.playersRef = firebase.database().ref('players');
