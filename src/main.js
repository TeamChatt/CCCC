'use strict';

var Bacon = require('baconjs');

var stage         = require('./stage');
var resize        = require('./resize');
var gameEvents    = require('./sources/game-events');
var appController = require('./controllers/app-controller');
var appView       = require('./sinks/app-view');
var autosave      = require('./sinks/autosave');

//Saved game
localStorage.progress = JSON.stringify({
  chapter: 8,
  player_info: {
    name:     'Matt',
    pronoun:  'm',
    interest: 'n'
  }
});

//Make the game resize to fit the screen
var container  = document.querySelector('.game-container');
resize(container, 960, 640);

//Start the game
var controller = appController(gameEvents(stage));
appView(stage, controller);
autosave(controller);


window.Bacon = Bacon;
