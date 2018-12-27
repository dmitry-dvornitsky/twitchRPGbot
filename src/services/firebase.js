const firebase = require("firebase/app");
require("firebase/database");

const config = {
  apiKey: "AIzaSyCLz4UPEFhfFL5zgm-FSo9_zA2JA4Gtaac",
  authDomain: "twitch-rpg-bot.firebaseapp.com",
  databaseURL: "https://twitch-rpg-bot.firebaseio.com",
  projectId: "twitch-rpg-bot",
  storageBucket: "",
  messagingSenderId: "930571059890"
};

module.exports = firebase.initializeApp(config);
